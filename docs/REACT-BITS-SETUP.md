# React Bits connection — 12 November 2026

React Bits is installed as a reusable registry/CLI workflow for this Windows user. Its official distribution installs individual components as editable source. The hotel project's existing `@react-bits` registry entry is retained.

## Installed locations

- Official shadcn CLI **4.23.0**, pinned in `C:/Users/loser/.codex/integrations/react-bits/package.json` and its lockfile. It runs directly through the installed Node executable, without depending on an npx cache path or Windows command-shell quoting.
- Shared MCP discovery workspace: `C:/Users/loser/.codex/integrations/react-bits/catalog`. It includes React Bits and preserves discovery access to the existing Vengeance/Skiper registries. Their individual access/licensing terms still apply.
- User skill: `C:/Users/loser/.codex/skills/react-bits/SKILL.md`, with validated `agents/openai.yaml` and a helper script.
- Terminal entry points: `C:/Users/loser/AppData/Roaming/npm/react-bits.ps1` and `.cmd`, in the existing PATH. No PATH change was needed.
- Global server: `[mcp_servers.shadcn]` in `C:/Users/loser/.codex/config.toml`. Its former hardcoded `D:/code/MYSTIC` cwd is replaced by the shared catalog. Other configuration/server entries were left intact. Backup: `config.toml.before-react-bits-20261112` beside the config.

## Use

In Codex, request `$react-bits` and describe the desired component or interaction. The skill discovers suitable source and adapts it to the active project.

From any project terminal:

```powershell
react-bits search "text"
react-bits search "gallery" --variant TS-TW
react-bits inspect BlurText-TS-CSS --save
react-bits init --cwd "D:/path/to/project"
react-bits add BlurText-TS-CSS --cwd "D:/path/to/project"
react-bits doctor
```

`init` adds only the React Bits registry to an existing components.json, backing up changes and preserving existing aliases/settings/registries. For a new config it detects a stylesheet, language and Next.js setting; inspect those choices and resolve project compiler/bundler aliases before using the official installer. Pass `--css` if the stylesheet cannot be detected. Source variants support JS/TS and CSS/Tailwind. The hotel uses TS-CSS.

The shared MCP workspace supplies discovery, not the destination for application files. Always use the active project's cwd for installation. Install selected components and import/render them in the requested feature. The helper retains the upstream license notice and preserves earlier notices when adding a changed upstream version.

**Restart Codex once to load the updated MCP entry.** This session has verified the server through a direct MCP protocol connection; it does not claim a newly loaded native tool in the already-running chat. The terminal/helper workflow is usable immediately.

## Verification

- `react-bits doctor`: Node 24.19.0, shadcn 4.23.0, official registry reachable; 1,274 registry items at verification (218 TS-CSS entries). Catalog counts may change.
- Official MCP server: successful initialization, seven tools listed, project registries read, `BlurText-TS-CSS` search, actual component source retrieval and add-command generation. Record: `docs/react-bits/global-mcp-verification.json`.
- Real source install in isolated `C:/Users/loser/.codex/integrations/react-bits/smoke-project`: `react-bits init`, `inspect --save`, `add BlurText-TS-CSS`, import into a React entry and `npm run build` all passed. TypeScript and Vite produced a production bundle. Vite logged its usual ignored `use client` directive warnings in this client-only fixture.
- Existing custom config test: adding the registry preserved all unrelated settings; a second init made no change. Record: `docs/react-bits/global-workflow-verification.json`.
- Skill validator passed; command shims work from PowerShell and CMD. `codex mcp get shadcn --json` recognizes the enabled server and its new executable/paths.
- This installation did not add a demo animation or new runtime dependency to the hotel site.

Sources: [React Bits repository](https://github.com/DavidHDev/react-bits), [official component installation](https://reactbits.dev/get-started/installation), [React Bits MCP guide](https://reactbits.dev/get-started/mcp), [shadcn Codex setup](https://ui.shadcn.com/docs/mcp#codex). React Bits uses [MIT + Commons Clause](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md); application/website use is supported, with restrictions on redistributing the components themselves.
