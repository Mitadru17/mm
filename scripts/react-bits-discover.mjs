import { mkdir, writeFile } from "node:fs/promises";

const catalogUrl = "https://reactbits.dev/r/registry.json";
const [command = "search", query = ""] = process.argv.slice(2);
const response = await fetch(catalogUrl);
if (!response.ok) throw new Error(`Registry HTTP ${response.status}`);
const catalog = await response.json();
const variants = catalog.items.filter((item) => item.name.endsWith("-TS-CSS"));
if (command === "inspect") {
  const item = variants.find((item) => item.name === query);
  if (!item) throw new Error("Choose an exact TS-CSS identifier from search.");
  const detail = await fetch(
    `https://reactbits.dev/r/${encodeURIComponent(query)}.json`,
  );
  if (!detail.ok) throw new Error(`Component HTTP ${detail.status}`);
  const source = await detail.json();
  await mkdir("docs/react-bits/source-reviews", { recursive: true });
  await writeFile(
    `docs/react-bits/source-reviews/${query}.json`,
    JSON.stringify(source, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        name: source.name,
        dependencies: source.dependencies,
        files: source.files.map((file) => ({
          path: file.path,
          bytes: file.content?.length,
        })),
      },
      null,
      2,
    ),
  );
} else {
  const hits = variants.filter((item) =>
    `${item.name} ${item.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  console.log(
    JSON.stringify(
      {
        source: catalogUrl,
        freeComponents: variants.length,
        matches: hits.map(({ name, description, dependencies }) => ({
          name,
          description,
          dependencies,
        })),
      },
      null,
      2,
    ),
  );
}
