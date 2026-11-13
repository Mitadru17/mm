"""Build a small local XYZ texture pyramid from open Sentinel-2 true-colour data.

Run with uv --with rasterio --with pillow --with numpy python this_file.py.
Only a cropped COG window is read; no full satellite scene is downloaded.
"""

import json
import math
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image
from rasterio.enums import Resampling
from rasterio.transform import from_bounds
from rasterio.warp import reproject, transform_bounds
from rasterio.windows import from_bounds as window_from_bounds

ROOT = Path(__file__).resolve().parents[1]
SCENE = json.loads((ROOT / "docs/ui-libraries/kausani-sentinel-scene.json").read_text())
BOUNDS = [79.48, 29.76, 79.74, 29.99]
OUT = ROOT / "public/terrain/kausani"
RADIUS = 20037508.342789244


def tile_xy(lon, lat, zoom):
    n = 2**zoom
    return (
        math.floor((lon + 180) / 360 * n),
        math.floor((1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n),
    )


with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR", CPL_VSIL_CURL_ALLOWED_EXTENSIONS=".tif"):
    with rasterio.open(SCENE["assets"]["visual"]["href"]) as source:
        # Expand to whole z11 tiles so no partial edge tiles need transparency.
        min_x, min_y = tile_xy(BOUNDS[0], BOUNDS[3], 11)
        max_x, max_y = tile_xy(BOUNDS[2], BOUNDS[1], 11)
        span = 2 * RADIUS / 2**11
        mercator = (
            -RADIUS + min_x * span,
            RADIUS - (max_y + 1) * span,
            -RADIUS + (max_x + 1) * span,
            RADIUS - min_y * span,
        )
        source_bounds = transform_bounds("EPSG:3857", source.crs, *mercator, densify_pts=21)
        window = window_from_bounds(*source_bounds, source.transform).round_offsets().round_lengths()
        pixels = source.read([1, 2, 3], window=window, boundless=True)
        src_transform = source.window_transform(window)
        src_crs = source.crs
        # The outer tile grid may cross the scene edge. Preserve transparent
        # no-data there so the underlying illustrated geography remains visible.

count = 0
for zoom in range(11, 15):
    factor = 2 ** (zoom - 11)
    span = 2 * RADIUS / 2**zoom
    for x in range(min_x * factor, (max_x + 1) * factor):
        directory = OUT / str(zoom) / str(x)
        directory.mkdir(parents=True, exist_ok=True)
        for y in range(min_y * factor, (max_y + 1) * factor):
            bounds = (-RADIUS + x * span, RADIUS - (y + 1) * span,
                      -RADIUS + (x + 1) * span, RADIUS - y * span)
            target = np.zeros((3, 256, 256), dtype=np.uint8)
            reproject(pixels, target, src_transform=src_transform, src_crs=src_crs,
                      dst_transform=from_bounds(*bounds, 256, 256), dst_crs="EPSG:3857",
                      resampling=Resampling.cubic, src_nodata=0, dst_nodata=0)
            rgb = np.moveaxis(target, 0, 2)
            alpha = np.where(np.any(rgb != 0, axis=2), 255, 0).astype(np.uint8)
            rgba = np.dstack((rgb, alpha))
            Image.fromarray(rgba).save(directory / f"{y}.webp", quality=88, method=6)
            count += 1

geographic = transform_bounds("EPSG:3857", "EPSG:4326", *mercator)
record = {
    "scene": SCENE["id"],
    "acquired": SCENE["properties"]["datetime"],
    "source": SCENE["assets"]["visual"]["href"],
    "sourceResolutionMetres": 10,
    "bounds": list(geographic),
    "minzoom": 11,
    "maxzoom": 14,
    "tiles": count,
    "bytes": sum(path.stat().st_size for path in OUT.rglob("*.webp")),
    "processing": "True-colour COG crop, cubic reprojection to Web Mercator XYZ, WebP quality 88. No generated scenery.",
    "attribution": "Contains modified Copernicus Sentinel data 2026; supplied through Element 84 Earth Search / AWS Open Data.",
    "licence": "https://cds.climate.copernicus.eu/licences/ec-sentinel",
}
(ROOT / "docs/ui-libraries/kausani-texture-build.json").write_text(json.dumps(record, indent=2))
print(json.dumps(record, indent=2))
