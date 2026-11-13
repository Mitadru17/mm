import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
const images = [
  ["valley-balcony", "8072", "Views"],
  ["balcony", "8084", "Views"],
  ["terrace", "8085", "Property"],
  ["timber-room", "8122", "Rooms"],
  ["timber-detail", "8123", "Rooms"],
  ["timber-window", "8125", "Rooms"],
  ["room-view", "8069", "Rooms"],
  ["room-blue", "8076", "Rooms"],
  ["room-warm", "8093", "Rooms"],
  ["room-wide", "8033", "Rooms"],
  ["dining", "8101", "Dining"],
  ["dining-window", "8105", "Dining"],
  ["lounge", "8102", "Dining"],
  ["surroundings", "8107", "Surroundings"],
  ["arrival", "8109", "Property"],
  ["doorway", "8118", "Property"],
  ["terrace-sign", "8114", "Property"],
  ["valley-portrait", "8088", "Views"],
];
await mkdir("public/images", { recursive: true });
const map = [];
for (const [name, id, category] of images) {
  const source = `photos/IMG_${id}.JPG`;
  const sizes = [];
  for (const width of [480, 960, 1600]) {
    const output = `public/images/${name}-${width}.webp`;
    const result = await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);
    sizes.push({
      output,
      width: result.width,
      height: result.height,
      bytes: result.size,
    });
  }
  map.push({ name, source, category, sizes });
}
// A landscape crop of the actual balcony photograph. No generative alterations.
const hero = await sharp("photos/IMG_8084.JPG")
  .rotate()
  .resize(1920, 1100, { fit: "cover", position: "centre" })
  .webp({ quality: 86 })
  .toFile("public/images/hero.webp");
map.push({
  name: "hero",
  source: "photos/IMG_8084.JPG",
  category: "Views",
  treatment: "1920 × 1100 editorial crop; original colours",
  sizes: [{ output: "public/images/hero.webp", ...hero }],
});
await writeFile("docs/asset-map.json", JSON.stringify(map, null, 2));
await writeFile(
  "src/image-dimensions.json",
  JSON.stringify(
    Object.fromEntries(
      map.map((image) => {
        const size =
          image.sizes.find((size) => size.width === 960) || image.sizes[0];
        return [image.name, { width: size.width, height: size.height }];
      }),
    ),
    null,
    2,
  ),
);
console.log(
  "Optimized",
  map.length,
  "photographs/crops. Hero:",
  hero.size,
  "bytes",
);
