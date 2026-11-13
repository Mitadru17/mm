import { MercatorCoordinate } from "maplibre-gl";
import type {
  CustomLayerInterface,
  CustomRenderMethodInput,
  Map,
} from "maplibre-gl";

type Vec3 = [number, number, number];
export type TerrainTree = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];
type Mesh = {
  vao: WebGLVertexArrayObject;
  geometry: WebGLBuffer;
  instances: WebGLBuffer;
  vertices: number;
  count: number;
};
const origin: [number, number] = [79.604065, 29.856438];
const anchor = MercatorCoordinate.fromLngLat(origin);
const units = anchor.meterInMercatorCoordinateUnits();

const vertexShader = `#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
layout(location=2) in vec3 a_colour;
layout(location=3) in vec4 i_origin;
layout(location=4) in vec4 i_shape;
uniform mat4 u_matrix;
out vec3 v_colour;
void main() {
  float c=cos(i_shape.x), s=sin(i_shape.x);
  mat2 rotation=mat2(c,s,-s,c);
  vec3 p=a_position*i_origin.w;
  p.xy=rotation*p.xy*i_shape.y;
  vec3 normal=normalize(vec3(rotation*a_normal.xy, a_normal.z));
  float sun=max(dot(normal, normalize(vec3(-0.45,0.3,0.82))),0.0);
  float light=0.54+0.46*sun;
  v_colour=a_colour*light*i_shape.z;
  gl_Position=u_matrix*vec4(p+i_origin.xyz,1.0);
}`;
const fragmentShader = `#version 300 es
precision highp float;
in vec3 v_colour;
uniform float u_opacity;
out vec4 fragColor;
void main() { fragColor=vec4(v_colour*u_opacity,u_opacity); }`;

/** Original small tree meshes: layered pine boughs and irregular broadleaf crowns. */
function treeGeometry(broadleaf: boolean) {
  const data: number[] = [];
  const triangle = (a: Vec3, b: Vec3, c: Vec3, colour: Vec3) => {
    const u = b.map((v, i) => v - a[i]),
      v = c.map((n, i) => n - a[i]);
    const n = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ];
    const length = Math.hypot(...n) || 1;
    for (const point of [a, b, c])
      data.push(...point, ...n.map((x) => x / length), ...colour);
  };
  const radial = (r: number, z: number, t: number): Vec3 => [
    Math.cos(t) * r,
    Math.sin(t) * r,
    z,
  ];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2,
      b = ((i + 1) / 7) * Math.PI * 2;
    const p = radial(broadleaf ? 0.026 : 0.018, -0.04, a),
      q = radial(broadleaf ? 0.026 : 0.018, -0.04, b);
    const r = radial(0.009, 0.75, a),
      s = radial(0.009, 0.75, b);
    triangle(p, q, r, [0.31, 0.25, 0.16]);
    triangle(q, s, r, [0.35, 0.28, 0.19]);
  }
  if (!broadleaf) {
    for (let tier = 0; tier < 5; tier++)
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2,
          next = ((i + 1) / 9) * Math.PI * 2;
        const radius =
          (0.23 - tier * 0.034) * (1 + Math.sin(i * 4.7 + tier) * 0.12);
        const z = 0.23 + tier * 0.13;
        triangle(
          radial(radius, z + Math.sin(i * 3) * 0.015, angle),
          radial(radius, z + Math.sin((i + 1) * 3) * 0.015, next),
          [0, 0, 0.63 + tier * 0.093],
          [0.17 + tier * 0.012, 0.3 + tier * 0.016, 0.15 + tier * 0.01],
        );
        triangle(
          radial(radius, z, angle),
          [0, 0, z],
          radial(radius, z, next),
          [0.12, 0.23, 0.12],
        );
      }
  } else {
    const crowns: Vec3[] = [
      [0.04, 0, 0.78],
      [-0.12, 0.025, 0.65],
      [0.06, 0.13, 0.65],
    ];
    for (let k = 0; k < crowns.length; k++) {
      const point = (lat: number, lon: number): Vec3 => {
        const t = (lon / 8) * Math.PI * 2,
          p = (lat / 5) * Math.PI;
        const wobble = 1 + Math.sin(lon * 3.1 + lat * 5 + k) * 0.09;
        return [
          crowns[k][0] + Math.sin(p) * Math.cos(t) * 0.2 * wobble,
          crowns[k][1] + Math.sin(p) * Math.sin(t) * 0.2 * wobble,
          crowns[k][2] + Math.cos(p) * 0.22,
        ];
      };
      for (let lat = 0; lat < 5; lat++)
        for (let lon = 0; lon < 8; lon++) {
          const colour: Vec3 = [
            0.25 + k * 0.015,
            0.36 + k * 0.02,
            0.16 + k * 0.015,
          ];
          triangle(
            point(lat, lon),
            point(lat + 1, lon),
            point(lat, lon + 1),
            colour,
          );
          triangle(
            point(lat, lon + 1),
            point(lat + 1, lon),
            point(lat + 1, lon + 1),
            colour,
          );
        }
    }
  }
  return new Float32Array(data);
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || "Tree shader compilation failed");
  }
  return shader;
}

/** GPU-instanced geometry; no animation loop or additional rendering engine. */
export class TerrainTrees implements CustomLayerInterface {
  id = "kausani-trees";
  type = "custom" as const;
  renderingMode = "3d" as const;
  private map?: Map;
  private gl?: WebGL2RenderingContext;
  private program?: WebGLProgram;
  private meshes: Mesh[] = [];
  private dirty = true;
  private enabled = true;
  private matrixLocation: WebGLUniformLocation | null = null;
  private opacityLocation: WebGLUniformLocation | null = null;
  private projection = new Float32Array(16);
  private points: { tree: TerrainTree; x: number; y: number }[];
  constructor(
    trees: TerrainTree[],
    private report: (count: number) => void,
  ) {
    this.points = trees.map((tree) => {
      const p = MercatorCoordinate.fromLngLat([tree[0], tree[1]]);
      return {
        tree,
        x: (p.x - anchor.x) / units,
        y: -(p.y - anchor.y) / units,
      };
    });
  }
  private markDirty = () => {
    this.dirty = true;
  };
  private sourceLoaded = (event: {
    sourceId?: string;
    isSourceLoaded?: boolean;
  }) => {
    if (event.sourceId === "terrain" && event.isSourceLoaded) this.dirty = true;
  };
  private refresh = () => {
    if (!this.dirty || !this.enabled || !this.map || !this.gl) return;
    this.dirty = false;
    const map = this.map,
      gl = this.gl,
      center = map.getCenter(),
      bounds = map.getBounds();
    const compact = map.getContainer().clientWidth < 640;
    const visible = this.points
      .filter((p) => bounds.contains([p.tree[0], p.tree[1]]))
      .sort(
        (a, b) =>
          Math.hypot(a.tree[0] - center.lng, a.tree[1] - center.lat) -
          Math.hypot(b.tree[0] - center.lng, b.tree[1] - center.lat),
      )
      .slice(0, compact ? 1800 : 6000);
    const instances: number[][] = [[], []];
    for (const p of visible) {
      const h = map.queryTerrainElevation([p.tree[0], p.tree[1]]);
      if (h === null) continue; // Never place geometry at sea level while DEM loads.
      const [, , height, width, kind, yaw, tint] = p.tree;
      instances[kind].push(p.x, p.y, h - 0.8, height, yaw, width, tint, 0);
    }
    this.meshes.forEach((mesh, i) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.instances);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(instances[i]),
        gl.DYNAMIC_DRAW,
      );
      mesh.count = instances[i].length / 8;
    });
    this.report(this.meshes.reduce((n, m) => n + m.count, 0));
    map.triggerRepaint();
  };
  setEnabled(value: boolean) {
    if (this.enabled === value) return;
    this.enabled = value;
    this.dirty = true;
    if (!value) this.report(0);
    this.map?.triggerRepaint();
  }
  onAdd(map: Map, gl: WebGL2RenderingContext) {
    this.map = map;
    this.gl = gl;
    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader),
      fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, vertex);
    gl.attachShader(this.program, fragment);
    gl.linkProgram(this.program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
      throw new Error(
        gl.getProgramInfoLog(this.program) || "Tree program failed",
      );
    this.matrixLocation = gl.getUniformLocation(this.program, "u_matrix");
    this.opacityLocation = gl.getUniformLocation(this.program, "u_opacity");
    this.meshes = [false, true].map((broadleaf) => {
      const data = treeGeometry(broadleaf),
        vao = gl.createVertexArray()!,
        geometry = gl.createBuffer()!,
        instances = gl.createBuffer()!;
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, geometry);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      for (let i = 0; i < 3; i++) {
        gl.enableVertexAttribArray(i);
        gl.vertexAttribPointer(i, 3, gl.FLOAT, false, 36, i * 12);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, instances);
      gl.bufferData(gl.ARRAY_BUFFER, 32, gl.DYNAMIC_DRAW);
      for (let i = 3; i < 5; i++) {
        gl.enableVertexAttribArray(i);
        gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 32, (i - 3) * 16);
        gl.vertexAttribDivisor(i, 1);
      }
      gl.bindVertexArray(null);
      return { vao, geometry, instances, vertices: data.length / 9, count: 0 };
    });
    map.on("moveend", this.markDirty);
    map.on("resize", this.markDirty);
    map.on("sourcedata", this.sourceLoaded);
    map.on("idle", this.refresh);
    this.refresh();
  }
  render(gl: WebGL2RenderingContext, options: CustomRenderMethodInput) {
    if (!this.enabled || !this.program || !this.map || this.map.getZoom() < 13)
      return;
    const m = options.defaultProjectionData.mainMatrix,
      p = this.projection;
    // Translate in double precision before reducing to Float32: no close-up jitter.
    for (let row = 0; row < 4; row++) {
      p[row] = m[row] * units;
      p[4 + row] = -m[4 + row] * units;
      p[8 + row] = m[8 + row] * units;
      p[12 + row] = m[row] * anchor.x + m[4 + row] * anchor.y + m[12 + row];
    }
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(this.matrixLocation, false, p);
    gl.uniform1f(
      this.opacityLocation,
      Math.min(1, (this.map.getZoom() - 13) / 0.5),
    );
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    for (const mesh of this.meshes)
      if (mesh.count) {
        gl.bindVertexArray(mesh.vao);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, mesh.vertices, mesh.count);
      }
    gl.bindVertexArray(null);
  }
  onRemove() {
    const map = this.map,
      gl = this.gl;
    map?.off("moveend", this.markDirty);
    map?.off("resize", this.markDirty);
    map?.off("sourcedata", this.sourceLoaded);
    map?.off("idle", this.refresh);
    if (gl) {
      for (const mesh of this.meshes) {
        gl.deleteVertexArray(mesh.vao);
        gl.deleteBuffer(mesh.geometry);
        gl.deleteBuffer(mesh.instances);
      }
      if (this.program) gl.deleteProgram(this.program);
    }
    this.meshes = [];
    this.program = undefined;
    this.map = undefined;
    this.gl = undefined;
  }
}
