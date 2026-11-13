import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Map, Marker, setWorkerUrl } from "maplibre-gl";
import mapWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import type { StyleSpecification } from "maplibre-gl";
import {
  ArrowUpRight,
  Compass,
  Hotel,
  Landmark,
  Leaf,
  Minus,
  Mountain,
  Plus,
  Satellite,
  Focus,
  Trees,
} from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import { GlassDock } from "../components/vengeance/GlassDock";
import { EditorialLink } from "../components/EditorialLink";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/vengeance/HoverCard";
import { useSiteMotion } from "../motion";
import { hotelPlace, places } from "./places";
import type { MapPlace, PlaceId } from "./places";
import { TerrainTrees } from "./TerrainTrees";
import type { TerrainTree } from "./TerrainTrees";

// An explicit emitted asset URL keeps MapLibre's module worker reachable in Vite.
setWorkerUrl(mapWorkerUrl);

const terrainStyle: StyleSpecification = {
  version: 8,
  transition: { duration: 150, delay: 0 },
  light: {
    anchor: "map",
    position: [1.5, 210, 45],
    color: "#FFF2DA",
    intensity: 0.55,
  },
  sources: {
    "local-buildings": {
      type: "geojson",
      data: "/terrain/detail/buildings.geojson",
      attribution:
        '<a href="https://docs.overturemaps.org/attribution/" target="_blank" rel="noreferrer">Overture Maps</a> · <a href="/licenses/overture-buildings.txt" target="_blank" rel="noreferrer">ODbL / sources</a>',
    },
    // Locally prepared true-colour Sentinel-2 crop, acquired 6 November 2026.
    // Georeferencing and a reproducible build are recorded in docs/ui-libraries.
    satellite: {
      type: "raster",
      tiles: [`${window.location.origin}/terrain/kausani/{z}/{x}/{y}.webp`],
      tileSize: 256,
      minzoom: 11,
      maxzoom: 14,
      bounds: [79.453125, 29.6880527498568, 79.8046875, 29.993002284551064],
      attribution:
        '<a href="https://cds.climate.copernicus.eu/licences/ec-sentinel" target="_blank" rel="noreferrer">Contains modified Copernicus Sentinel data 2026</a> · <a href="https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2C_44RLU_20261106_0_L2A" target="_blank" rel="noreferrer">Element 84 / AWS</a>',
    },
    geography: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
      attribution:
        '<a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
    },
    terrain: {
      type: "raster-dem",
      // This regional endpoint serves elevation through z12. Overzoom those
      // real samples instead of requesting missing z13/z14 tiles indefinitely.
      tiles: ["https://tiles.mapterhorn.com/{z}/{x}/{y}.webp"],
      maxzoom: 12,
      encoding: "terrarium",
      tileSize: 512,
      attribution:
        '<a href="https://mapterhorn.com/attribution" target="_blank" rel="noreferrer">© Mapterhorn</a>',
    },
    relief: {
      type: "raster-dem",
      tiles: ["https://tiles.mapterhorn.com/{z}/{x}/{y}.webp"],
      maxzoom: 12,
      encoding: "terrarium",
      tileSize: 512,
    },
  },
  layers: [
    {
      id: "ground",
      type: "background",
      paint: { "background-color": "#A7BD82" },
    },
    {
      id: "woods",
      type: "fill",
      source: "geography",
      "source-layer": "landcover",
      paint: {
        "fill-color": [
          "match",
          ["get", "class"],
          "wood",
          "#4F8860",
          "grass",
          "#B3CB83",
          "farmland",
          "#D4CA8D",
          "wetland",
          "#79AFA0",
          "sand",
          "#E1CDA2",
          "#83AA71",
        ],
        "fill-opacity": 0.88,
      },
    },
    {
      id: "water",
      type: "fill",
      source: "geography",
      "source-layer": "water",
      paint: { "fill-color": "#60B5CE" },
    },
    {
      id: "satellite-texture",
      type: "raster",
      source: "satellite",
      paint: {
        "raster-opacity": 1,
        "raster-opacity-transition": { duration: 150, delay: 0 },
        "raster-fade-duration": 150,
        "raster-saturation": 0,
        "raster-contrast": 0.04,
        "raster-brightness-min": 0.02,
        "raster-brightness-max": 0.98,
      },
    },
    {
      id: "hill-relief",
      type: "hillshade",
      source: "relief",
      paint: {
        "hillshade-shadow-color": "#203B30",
        "hillshade-highlight-color": "#E5E4CF",
        "hillshade-accent-color": "#738270",
        "hillshade-exaggeration": 0.18,
      },
    },
    {
      id: "streams",
      type: "line",
      source: "geography",
      "source-layer": "waterway",
      paint: {
        "line-color": "#60B5CE",
        "line-opacity": 0,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.6, 16, 2.5],
      },
    },
    {
      id: "buildings",
      type: "fill",
      source: "geography",
      "source-layer": "building",
      minzoom: 13,
      paint: { "fill-color": "#E7C9A4", "fill-opacity": 0 },
    },
    {
      id: "road-edges",
      type: "line",
      source: "geography",
      "source-layer": "transportation",
      paint: {
        "line-color": "#68734D",
        "line-opacity": 0.2,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.5, 16, 5],
      },
    },
    {
      id: "roads",
      type: "line",
      source: "geography",
      "source-layer": "transportation",
      paint: {
        "line-color": "#F1D5A0",
        "line-opacity": 0.24,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.75, 16, 3],
      },
    },
    {
      id: "building-walls",
      type: "fill-extrusion",
      source: "local-buildings",
      minzoom: 13,
      paint: {
        "fill-extrusion-color": ["get", "wall"],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 1,
        "fill-extrusion-vertical-gradient": true,
      },
    },
    {
      id: "building-roofs",
      type: "fill-extrusion",
      source: "local-buildings",
      minzoom: 13,
      paint: {
        "fill-extrusion-color": ["get", "roof"],
        "fill-extrusion-height": ["+", ["get", "height"], 0.7],
        "fill-extrusion-base": ["get", "height"],
        "fill-extrusion-opacity": 1,
        "fill-extrusion-vertical-gradient": false,
      },
    },
  ],
  terrain: { source: "terrain", exaggeration: 1 },
};

export const placeIcons = {
  hotel: Hotel,
  tea: Leaf,
  ashram: Mountain,
  museum: Landmark,
};
function PlacePin({
  place,
  index,
  active,
  onSelect,
  onPreview,
}: {
  place: MapPlace;
  index: number;
  active: boolean;
  onSelect: () => void;
  onPreview: (id: PlaceId | null, source?: PlaceId) => void;
}) {
  const Icon = placeIcons[place.id];
  const [open, setOpen] = useState(false);
  const showInfo = (value: boolean) => {
    setOpen(value);
    onPreview(value ? place.id : null, place.id);
  };
  return (
    <HoverCard
      open={open}
      openDelay={0}
      closeDelay={120}
      onOpenChange={showInfo}
    >
      <HoverCardTrigger asChild>
        <button
          className={`map-pin ${place.id === "hotel" ? "map-pin-hotel" : "map-pin-nearby"}`}
          data-active={active || undefined}
          data-place={place.id}
          aria-label={`Explore ${place.title}`}
          aria-pressed={active}
          onClick={() => {
            showInfo(true);
            onSelect();
          }}
        >
          {place.id === "hotel" ? (
            <>
              <Hotel size={19} />
              <span>Mystic Mountain</span>
              <span className="map-hotel-dot" />
            </>
          ) : (
            <>
              <span>{String(index).padStart(2, "0")}</span>
              <span className="map-pin-name">{place.short}</span>
            </>
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="map-place-popup">
        <p className="ts-kicker">
          <Icon size={16} />
          {place.category}
        </p>
        <h3>{place.title}</h3>
        <p>{place.description}</p>
        <EditorialLink href={place.href} target="_blank" rel="noreferrer">
          {place.id === "hotel"
            ? "Open hotel directions"
            : "Discover this place"}
        </EditorialLink>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function TerrainMap({
  selection,
  preview,
  onSelect,
  onPreview,
}: {
  selection: { id: PlaceId; serial: number };
  preview: PlaceId | null;
  onSelect: (id: PlaceId) => void;
  onPreview: (id: PlaceId | null, source?: PlaceId) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [hosts, setHosts] = useState<HTMLDivElement[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [tilted, setTilted] = useState(true);
  const [satellite, setSatellite] = useState(true);
  const [details, setDetails] = useState(true);
  const detailsRef = useRef(true);
  const [treeCount, setTreeCount] = useState(0);
  const treeLayer = useRef<TerrainTrees | null>(null);
  const reduced = useSiteMotion();
  const initialReduced = useRef(reduced);
  useEffect(() => {
    let map: Map;
    try {
      map = new Map({
        container: container.current!,
        style: terrainStyle,
        center: [79.603, 29.851],
        zoom: 13.2,
        pitch: initialReduced.current ? 0 : 58,
        bearing: -18,
        minZoom: 11,
        maxZoom: 16.7,
        maxBounds: [
          [79.48, 29.76],
          [79.74, 29.99],
        ],
        maxPitch: 70,
        cooperativeGestures: true,
        attributionControl: { compact: true },
        renderWorldCopies: false,
        fadeDuration: 150,
      });
    } catch {
      setFailed(true);
      return;
    }
    mapRef.current = map;
    const markers = places.map((place) => {
      const host = document.createElement("div");
      host.className = `map-marker-host ${place.id === "hotel" ? "is-hotel" : ""}`;
      const marker = new Marker({
        element: host,
        anchor: "bottom",
        offset: place.id === "tea" ? [-60, 18] : [0, 0],
      })
        .setLngLat(place.coordinates)
        .addTo(map);
      return { marker, host };
    });
    setHosts(markers.map((item) => item.host));
    const loadTimeout = window.setTimeout(() => setFailed(true), 20000);
    map.on("load", () => {
      window.clearTimeout(loadTimeout);
      setFailed(false);
      setReady(true);
      map.fitBounds(
        [
          [79.597, 29.8405],
          [79.61, 29.8605],
        ],
        {
          padding: {
            top: 105,
            bottom: map.getContainer().clientWidth < 640 ? 157.5 : 105,
            left: 52.5,
            right: 52.5,
          },
          maxZoom: 13.6,
          duration: 0,
        },
      );
    });
    map.on("error", (event) => {
      if (
        /Failed to initialize|Worker failed to load/.test(
          event.error?.message || "",
        )
      )
        setFailed(true);
    });
    const resize = new ResizeObserver(() => map.resize());
    resize.observe(container.current!);
    return () => {
      resize.disconnect();
      window.clearTimeout(loadTimeout);
      markers.forEach((item) => item.marker.remove());
      map.remove();
      mapRef.current = null;
    };
  }, []);
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    const controller = new AbortController();
    let layer: TerrainTrees | null = null;
    fetch("/terrain/detail/trees.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Vegetation unavailable");
        return response.json();
      })
      .then((data: { trees: TerrainTree[] }) => {
        if (controller.signal.aborted) return;
        layer = new TerrainTrees(data.trees, setTreeCount);
        treeLayer.current = layer;
        map.addLayer(layer);
        layer.setEnabled(detailsRef.current);
      })
      .catch(() => {
        /* Buildings, satellite and directions remain usable. */
      });
    return () => {
      controller.abort();
      if (mapRef.current && layer && map.getLayer(layer.id))
        map.removeLayer(layer.id);
      treeLayer.current = null;
    };
  }, [ready]);
  useEffect(() => {
    detailsRef.current = details;
    const map = mapRef.current;
    if (!ready || !map) return;
    for (const id of ["building-walls", "building-roofs"])
      map.setLayoutProperty(id, "visibility", details ? "visible" : "none");
    treeLayer.current?.setEnabled(details);
  }, [ready, details]);
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    map.setPaintProperty("satellite-texture", "raster-opacity-transition", {
      duration: reduced ? 0 : 150,
      delay: 0,
    });
    map.setPaintProperty(
      "satellite-texture",
      "raster-fade-duration",
      reduced ? 0 : 150,
    );
    for (const [layer, property] of [
      ["hill-relief", "hillshade-exaggeration"],
      ["streams", "line-opacity"],
      ["buildings", "fill-opacity"],
      ["road-edges", "line-opacity"],
      ["roads", "line-opacity"],
    ] as const) {
      map.setPaintProperty(layer, `${property}-transition`, {
        duration: reduced ? 0 : 150,
        delay: 0,
      });
    }
    map.setPaintProperty(
      "satellite-texture",
      "raster-opacity",
      satellite ? 1 : 0,
    );
    map.setPaintProperty(
      "hill-relief",
      "hillshade-exaggeration",
      satellite ? 0.18 : 0.32,
    );
    map.setPaintProperty("streams", "line-opacity", satellite ? 0 : 0.85);
    map.setPaintProperty("buildings", "fill-opacity", satellite ? 0 : 0.8);
    map.setPaintProperty("road-edges", "line-opacity", satellite ? 0.2 : 0.55);
    map.setPaintProperty("roads", "line-opacity", satellite ? 0.24 : 0.95);
  }, [ready, satellite, reduced]);
  useEffect(() => {
    if (!ready || !selection.serial) return;
    const place = places.find((item) => item.id === selection.id)!;
    mapRef.current?.easeTo({
      center: place.coordinates,
      zoom: place.id === "tea" ? 14.3 : 14.6,
      duration: reduced ? 0 : 150,
    });
  }, [ready, selection.id, selection.serial, reduced]);
  useEffect(() => {
    if (reduced) mapRef.current?.keyboard.disable();
    else mapRef.current?.keyboard.enable();
    if (reduced) {
      mapRef.current?.stop();
      setTilted(false);
      mapRef.current?.easeTo({ pitch: 0, duration: 0 });
    }
  }, [reduced]);
  const flat = () => {
    setTilted((value) => !value);
    mapRef.current?.easeTo({
      pitch: tilted ? 0 : 58,
      duration: reduced ? 0 : 150,
    });
  };
  return (
    <div
      className="terrain-scene"
      data-ready={ready || undefined}
      data-satellite={satellite}
      data-details={details}
      data-trees={treeCount}
    >
      <div
        ref={container}
        className="terrain-map"
        aria-label="Interactive terrain map of Kausani"
      />
      {!ready && !failed && (
        <div className="terrain-loading">
          <Mountain size={42} />
          <span>Finding our corner of the hills…</span>
        </div>
      )}
      {failed && (
        <div className="terrain-loading">
          <Mountain size={42} />
          <h3>A little closer to Kausani.</h3>
          <p>Choose a place below, or open directions to plan your visit.</p>
          <a
            className="button"
            href={hotelPlace.href}
            target="_blank"
            rel="noreferrer"
          >
            Open directions <ArrowUpRight size={18} />
          </a>
        </div>
      )}
      {hosts.map((host, index) =>
        createPortal(
          <PlacePin
            place={places[index]}
            index={index}
            active={(preview || selection.id) === places[index].id}
            onSelect={() => onSelect(places[index].id)}
            onPreview={onPreview}
          />,
          host,
          places[index].id,
        ),
      )}
      <div className="map-location-tag glass-surface">
        <span className="map-tag-dot" />
        <span>
          Kausani / Kumaon
          <small>
            {satellite ? "Satellite · 2026" : "Illustrated terrain"}
          </small>
        </span>
      </div>
      {!failed && (
        <div className="map-camera-controls glass-surface">
          <button
            aria-label="Zoom in on the map"
            onClick={() =>
              mapRef.current?.zoomIn({ duration: reduced ? 0 : 150 })
            }
          >
            <Plus size={19} />
          </button>
          <button
            aria-label="Zoom out of the map"
            onClick={() =>
              mapRef.current?.zoomOut({ duration: reduced ? 0 : 150 })
            }
          >
            <Minus size={19} />
          </button>
          <button
            aria-label={tilted ? "Show map from above" : "Show 3D terrain"}
            aria-pressed={tilted}
            onClick={flat}
          >
            {tilted ? "3D" : "2D"}
          </button>
          <button
            aria-label={
              satellite ? "Show illustrated terrain" : "Show satellite texture"
            }
            aria-pressed={satellite}
            onClick={() => setSatellite((value) => !value)}
          >
            <Satellite size={19} />
          </button>
          <button
            aria-label={
              details ? "Hide buildings and trees" : "Show buildings and trees"
            }
            aria-pressed={details}
            onClick={() => setDetails((value) => !value)}
          >
            <Trees size={19} />
          </button>
        </div>
      )}
      {!failed && (
        <div className="map-dock-wrap">
          <GlassDock
            label="Map view controls"
            items={[
              {
                id: "hotel",
                label: "Back to Mystic Mountain",
                icon: <Hotel size={21} />,
                onClick: () => onSelect("hotel"),
              },
              {
                id: "overview",
                label: "Show all places",
                icon: <Compass size={21} />,
                onClick: () =>
                  mapRef.current?.fitBounds(
                    [
                      [79.597, 29.8405],
                      [79.61, 29.8605],
                    ],
                    { padding: 60, maxZoom: 13.6, duration: reduced ? 0 : 150 },
                  ),
              },
              {
                id: "terrain",
                label: tilted ? "View from above" : "View in 3D",
                icon: <Mountain size={21} />,
                onClick: flat,
                active: tilted,
              },
              {
                id: "detail",
                label: "Explore 3D detail",
                icon: <Focus size={21} />,
                onClick: () => {
                  setTilted(true);
                  setDetails(true);
                  mapRef.current?.easeTo({
                    center: hotelPlace.coordinates,
                    zoom: 16.2,
                    pitch: 62,
                    bearing: -32,
                    duration: reduced ? 0 : 150,
                  });
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
