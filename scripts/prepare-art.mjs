import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const records = [];
for (const name of ["bronze-swallows", "mountain-relief"]) {
  const result = await sharp(`public/art/${name}.png`)
    .webp({ quality: 86, alphaQuality: 100 })
    .toFile(`public/art/${name}.webp`);
  records.push({
    name,
    source: `blender/${name}.blend`,
    script: "blender/create_art.py",
    render: `public/art/${name}.png`,
    optimized: `public/art/${name}.webp`,
    model: `public/art/${name}.glb`,
    bytes: result.size,
    width: result.width,
    height: result.height,
    kind: "Original Blender artwork; decorative illustration, not hotel photography",
  });
}
await writeFile("docs/art-manifest.json", JSON.stringify(records, null, 2));
console.log(records);
