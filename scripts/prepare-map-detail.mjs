import fs from "node:fs/promises";
import sharp from "sharp";
import { VectorTile } from "@mapbox/vector-tile";
import { PbfReader } from "pbf";

// Bounded geographic preparation; no synthetic footprints or mapped tree claims.
const bounds = [79.588, 29.835, 79.62, 29.87];
const origin = [79.604065, 29.856438];
const mx = 111320 * Math.cos((origin[1] * Math.PI) / 180);
const my = 111320;
const local = ([lon, lat]) => [(lon - origin[0]) * mx, (lat - origin[1]) * my];
const hash = (x, y, salt = 0) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453;
  return n - Math.floor(n);
};
const xy = (lon, lat, z = 14) => [
  ((lon + 180) / 360) * 2 ** z,
  ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * 2 ** z,
];
const insideRing = (p, ring) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i],
      b = ring[j];
    if (
      a[1] > p[1] !== b[1] > p[1] &&
      p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      inside = !inside;
  }
  return inside;
};
const insidePolygon = (p, rings) =>
  insideRing(p, rings[0]) && !rings.slice(1).some((r) => insideRing(p, r));
const distanceSegment = (p, a, b) => {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  const t = Math.max(
    0,
    Math.min(
      1,
      ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1),
    ),
  );
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
};
const raw = JSON.parse(
  await fs.readFile(
    "docs/ui-libraries/kausani-overture-buildings.geojson",
    "utf8",
  ),
);
const wallColours = ["#CEC9B7", "#B9B9AA", "#D8D3BF", "#BFB09A"];
const roofColours = ["#8C6151", "#68766E", "#A77C64", "#737A7B", "#918D7C"];
const buildings = {
  type: "FeatureCollection",
  features: raw.features.map((f, i) => ({
    type: "Feature",
    id: i,
    geometry: f.geometry,
    properties: {
      id: f.id,
      // These records have no measured heights. A restrained default is explicit.
      height: f.properties.height || 6.4,
      height_estimated: !f.properties.height,
      wall: wallColours[i % wallColours.length],
      roof: roofColours[Math.floor(hash(i, 3) * roofColours.length)],
    },
  })),
};
await fs.mkdir("public/terrain/detail", { recursive: true });
await fs.writeFile(
  "public/terrain/detail/buildings.geojson",
  JSON.stringify(buildings),
);

const metadata = await (
  await fetch("https://tiles.openfreemap.org/planet")
).json();
const a = xy(bounds[0], bounds[3]).map(Math.floor),
  b = xy(bounds[2], bounds[1]).map(Math.floor);
const forests = [],
  roadSegments = [];
for (let x = a[0]; x <= b[0]; x++)
  for (let y = a[1]; y <= b[1]; y++) {
    const url = metadata.tiles[0]
      .replace("{z}", "14")
      .replace("{x}", x)
      .replace("{y}", y);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Vector source ${response.status}`);
    const tile = new VectorTile(
      new PbfReader(new Uint8Array(await response.arrayBuffer())),
    );
    for (let i = 0; i < (tile.layers.landcover?.length || 0); i++) {
      const f = tile.layers.landcover.feature(i);
      if (f.properties.class !== "wood") continue;
      const g = f.toGeoJSON(x, y, 14).geometry;
      forests.push(
        ...(g.type === "Polygon"
          ? [g.coordinates]
          : g.type === "MultiPolygon"
            ? g.coordinates
            : []),
      );
    }
    for (let i = 0; i < (tile.layers.transportation?.length || 0); i++) {
      const g = tile.layers.transportation
        .feature(i)
        .toGeoJSON(x, y, 14).geometry;
      const lines =
        g.type === "LineString"
          ? [g.coordinates]
          : g.type === "MultiLineString"
            ? g.coordinates
            : [];
      for (const line of lines)
        for (let j = 1; j < line.length; j++)
          roadSegments.push([local(line[j - 1]), local(line[j])]);
    }
  }

// Spatial buckets keep exclusion checks local even with thousands of footprints.
const buckets = new Map();
const addBox = (box, entry) => {
  for (let x = Math.floor(box[0] / 50); x <= Math.floor(box[2] / 50); x++)
    for (let y = Math.floor(box[1] / 50); y <= Math.floor(box[3] / 50); y++) {
      const key = `${x},${y}`;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(entry);
    }
};
for (const f of buildings.features) {
  const polys =
    f.geometry.type === "Polygon"
      ? [f.geometry.coordinates]
      : f.geometry.coordinates;
  for (const poly of polys) {
    const rings = poly.map((r) => r.map(local));
    const points = rings.flat();
    addBox(
      [
        Math.min(...points.map((p) => p[0])) - 12,
        Math.min(...points.map((p) => p[1])) - 12,
        Math.max(...points.map((p) => p[0])) + 12,
        Math.max(...points.map((p) => p[1])) + 12,
      ],
      { rings },
    );
  }
}
for (const segment of roadSegments)
  addBox(
    [
      Math.min(segment[0][0], segment[1][0]) - 9,
      Math.min(segment[0][1], segment[1][1]) - 9,
      Math.max(segment[0][0], segment[1][0]) + 9,
      Math.max(segment[0][1], segment[1][1]) + 9,
    ],
    { segment },
  );
const clear = (p) =>
  !(
    buckets.get(`${Math.floor(p[0] / 50)},${Math.floor(p[1] / 50)}`) || []
  ).some((entry) =>
    entry.segment
      ? distanceSegment(p, ...entry.segment) < 9
      : insidePolygon(p, entry.rings) ||
        entry.rings.some((r) =>
          r.some((q, i) => i > 0 && distanceSegment(p, r[i - 1], q) < 12),
        ),
  );

const imageCache = new Map();
async function forestPixel(lon, lat) {
  const [tx, ty] = xy(lon, lat);
  const x = Math.floor(tx),
    y = Math.floor(ty),
    key = `${x}/${y}`;
  if (!imageCache.has(key))
    imageCache.set(
      key,
      await sharp(`public/terrain/kausani/14/${key}.webp`)
        .removeAlpha()
        .raw()
        .toBuffer(),
    );
  const pixels = imageCache.get(key),
    offset =
      (Math.floor((ty - y) * 256) * 256 + Math.floor((tx - x) * 256)) * 3;
  const [r, g, b] = pixels.subarray(offset, offset + 3);
  return g > r * 1.03 && g > b * 1.08 && g > 22 && (r + g + b) / 3 < 155;
}
const trees = [];
const start = local(bounds.slice(0, 2)),
  end = local(bounds.slice(2));
for (let x = start[0]; x < end[0]; x += 14)
  for (let y = start[1]; y < end[1]; y += 14) {
    const px = x + (hash(x, y) - 0.5) * 11,
      py = y + (hash(x, y, 1) - 0.5) * 11;
    const lon = origin[0] + px / mx,
      lat = origin[1] + py / my;
    if (
      !forests.some((poly) => insidePolygon([lon, lat], poly)) ||
      !clear([px, py]) ||
      !(await forestPixel(lon, lat))
    )
      continue;
    const kind = hash(x, y, 2) > 0.66 ? 1 : 0;
    trees.push([
      +lon.toFixed(6),
      +lat.toFixed(6),
      +(kind ? 9 + hash(x, y, 3) * 7 : 13 + hash(x, y, 3) * 10).toFixed(1),
      +(0.8 + hash(x, y, 4) * 0.45).toFixed(2),
      kind,
      +(hash(x, y, 5) * Math.PI * 2).toFixed(3),
      +(0.8 + hash(x, y, 6) * 0.4).toFixed(2),
    ]);
  }
trees.sort((a, b) => hash(a[0], a[1], 8) - hash(b[0], b[1], 8));
const selected = trees.slice(0, 9000);
await fs.writeFile(
  "public/terrain/detail/trees.json",
  JSON.stringify({ trees: selected }),
);
const record = {
  checked: "2026-11-12",
  bounds,
  buildings: buildings.features.length,
  trees: selected.length,
  buildingSource:
    "Overture Maps 2026-10-21.0 (OSM / Microsoft / Google Open Buildings)",
  buildingLicence: "ODbL-1.0",
  measuredHeights: raw.features.filter((f) => f.properties.height).length,
  defaultHeightMetres: 6.4,
  forestVectorSource: metadata.tiles[0],
  vegetation:
    "Illustrative positions constrained to mapped woods, green Sentinel pixels and 12m building / 9m road exclusion buffers. Not surveyed trees.",
};
await fs.writeFile(
  "docs/ui-libraries/kausani-detail-build.json",
  JSON.stringify(record, null, 2),
);
console.log(JSON.stringify(record, null, 2));
