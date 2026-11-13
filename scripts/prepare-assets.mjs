import sharp from "sharp";
import { readdir, mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

await mkdir("docs", { recursive: true });
await mkdir("public/images", { recursive: true });
const files = (await readdir("photos"))
  .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
  .sort();
const inventory = [];
const composites = [];
const columns = 5,
  cellW = 300,
  cellH = 245;
for (const [i, file] of files.entries()) {
  const source = `photos/${file}`;
  const meta = await sharp(source).metadata();
  const id = Number(file.match(/\d+/)?.[0]);
  const category = [8042, 8100].includes(id)
    ? "Facilities / bathroom"
    : [8072, 8084, 8088, 8095].includes(id)
      ? "Balconies and mountain views"
      : [8082, 8085, 8114, 8118].includes(id)
        ? "Property / architectural details"
        : (id >= 8101 && id <= 8105) || [8112, 8113].includes(id)
          ? "Restaurant and dining"
          : id >= 8106 && id <= 8110
            ? "Property exterior / surroundings"
            : "Hotel rooms";
  const rotated = [5, 6, 7, 8].includes(meta.orientation);
  const displayWidth = rotated ? meta.height : meta.width;
  const displayHeight = rotated ? meta.width : meta.height;
  const hash = createHash("sha256")
    .update(await readFile(source))
    .digest("hex");
  inventory.push({
    source,
    width: meta.width,
    height: meta.height,
    format: meta.format,
    displayWidth,
    displayHeight,
    orientation: meta.orientation || 1,
    category,
    hash,
  });
  const thumb = await sharp(source)
    .rotate()
    .resize(288, 195, { fit: "inside" })
    .toBuffer();
  const t = await sharp(thumb).metadata();
  const x = (i % columns) * cellW,
    y = Math.floor(i / columns) * cellH;
  composites.push({
    input: thumb,
    left: x + Math.floor((cellW - t.width) / 2),
    top: y,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="300" height="45"><text x="10" y="20" font-family="Arial" font-size="16" fill="#eee">${file}</text><text x="10" y="39" font-family="Arial" font-size="12" fill="#b9c5b8">${displayWidth} × ${displayHeight} · ${meta.format}</text></svg>`,
    ),
    left: x,
    top: y + 195,
  });
}
await sharp({
  create: {
    width: columns * cellW,
    height: Math.ceil(files.length / columns) * cellH,
    channels: 3,
    background: "#1b2925",
  },
})
  .composite(composites)
  .jpeg({ quality: 88 })
  .toFile("docs/asset-contact-sheet.jpg");
await writeFile(
  "docs/asset-inventory.json",
  JSON.stringify(inventory, null, 2),
);
console.log(
  `Inventoried ${files.length} originals. Exact duplicates: ${files.length - new Set(inventory.map((i) => i.hash)).size}.`,
);
