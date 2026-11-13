# Creative integration status — 11 November 2026

## React Bits / shadcn

- Configured the free `@react-bits` registry in `components.json`, using TypeScript/CSS variants for this Vite project.
- Added the shadcn MCP server to `C:/Users/loser/.codex/config.toml`, pinned to tested CLI version 4.23.0 and project cwd `D:/code/MYSTIC`. The original configuration was preserved byte-for-byte before the new entry, and backed up alongside the config file.
- Verified initialize, tools/list and a real `search_items_in_registries` call through STDIO MCP. The server returned the requested `BlurText-TS-CSS` result from `@react-bits`. The same discovery succeeded after removing the CLI from project dependencies and invoking it through `npx`.
- A Codex restart is needed for the newly configured server to appear in this running chat's native tool list. Work proceeded using the verified protocol client and official registry source.
- The discover helper searches all 218 currently available free TypeScript/CSS variants. Only shortlisted source was retrieved. No Pro credentials or paid access were used.
- Adapted BlurText inside the hotel application; retained upstream MIT + Commons Clause attribution in `public/licenses/react-bits.txt`. Selection details are in `react-bits-component-map.md`.

Documentation checked: [shadcn MCP](https://ui.shadcn.com/docs/mcp), [React Bits MCP](https://reactbits.dev/get-started/mcp), [official OpenAI MCP configuration](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).

## Higgsfield

The connected read-only balance tool reported a free plan, 0 credits, no free generations and no active unlimited allowance. No generation, purchase or trial activation was performed. Development does not depend on Higgsfield.

## Blender

Blender was found running at `D:/bd/blender.exe`; localhost port 9876 was listening. However, a read-only `get_scene_info` bridge request timed out, and a separate Blender MCP STDIO initialization also timed out. A live, responsive Blender MCP connection is **not verified**.

The existing Codex Blender entry points to `C:/Users/loser/.local/bin`, a directory, without an executable or arguments. It was preserved rather than replacing it with an unverified server command. No changes were made to the user's current Blender scene.

Existing original bronze artwork and its saved Blender/GLB files remain available. The website now presents the relief as an optional collection detail, with the heavier viewer loaded only when requested. Additional generation was not necessary for the photographic design.

## Property information and assets

- Rechecked SHA-256 for all 53 original photographs against the inventory: no changes. See `react-bits/asset-recheck.json`.
- Revisited the existing ProExsus website in the browser. Its date/guest search, address, email, photographic slideshow and external booking workflow remain present. Its conflicting arrival/departure times, phone discrepancy and broad amenity text remain subject to owner confirmation; these were not copied into new claims.
- The supplied Google Maps short link timed out. No new review quotations, ratings, reviewer names or counts were introduced. The established review-source link remains.
- No invented hotel inventory, availability, prices or reservation confirmation was added. The local site prepares a reviewed inquiry and links to the real external booking portal.
