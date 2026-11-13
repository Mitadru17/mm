import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";

const blender = process.argv.includes("--blender");
const child = blender
  ? spawn("C:/Users/loser/.local/bin/uvx.exe", ["blender-mcp"], {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    })
  : spawn(
      process.execPath,
      [
        join(dirname(process.execPath), "node_modules/npm/bin/npx-cli.js"),
        "--yes",
        "shadcn@4.23.0",
        "mcp",
        "--cwd",
        process.cwd(),
      ],
      { stdio: ["pipe", "pipe", "pipe"], windowsHide: true },
    );
let counter = 0;
const requests = new Map();
createInterface({ input: child.stdout }).on("line", (line) => {
  try {
    const message = JSON.parse(line);
    if (message.id && requests.has(message.id)) {
      const { resolve, reject, timer } = requests.get(message.id);
      clearTimeout(timer);
      requests.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  } catch {
    /* Ignore non-protocol startup text. */
  }
});
child.stderr.on("data", () => {});
const notify = (method, params = {}) =>
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method, params }) + "\n");
const request = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++counter;
    const timer = setTimeout(() => {
      requests.delete(id);
      reject(new Error(`Timeout: ${method}`));
    }, 25000);
    requests.set(id, { resolve, reject, timer });
    child.stdin.write(
      JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n",
    );
  });
try {
  const initialization = await request("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "mystic-registry-verification", version: "1.0.0" },
  });
  notify("notifications/initialized");
  const available = await request("tools/list");
  await mkdir("docs/react-bits", { recursive: true });
  await writeFile(
    `docs/react-bits/${blender ? "blender" : "mcp"}-tools.json`,
    JSON.stringify({ initialization, ...available }, null, 2),
  );
  console.log(
    "MCP tools: " + available.tools.map(({ name }) => name).join(", "),
  );
  if (blender)
    console.log(
      JSON.stringify(
        available.tools.filter((tool) => tool.name === "get_scene_info"),
        null,
        2,
      ),
    );
  const requestFile = process.argv.slice(2).find((arg) => arg !== "--blender");
  if (requestFile) {
    const { readFile } = await import("node:fs/promises");
    const call = JSON.parse(await readFile(requestFile, "utf8"));
    const result = await request("tools/call", call);
    await writeFile(
      `docs/react-bits/${blender ? "blender" : "mcp"}-discovery-result.json`,
      JSON.stringify(result, null, 2),
    );
    console.log(JSON.stringify(result, null, 2));
  }
} finally {
  child.stdin.end();
  child.kill();
  for (const { timer } of requests.values()) clearTimeout(timer);
}
