# Mystic Mountain — original 3D accents

Reference: Aurelia's warm bronze flying birds and quiet heritage art direction. Produce original assets for Mystic; do not reproduce the other hotel's property, logo or footage.

- Assets: three decorative bronze swallows for the hero; an abstract Himalayan-inspired topographic medallion for the destination story.
- Target: responsive web, raster-first presentation with an optional, lazy-loaded interactive GLB viewer.
- Geometry: birds under 30k triangles; terrain base mesh under 60k, full relief with raised contour curves under 90k exported triangles; no texture maps, two procedural PBR metal materials.
- Units: one Blender unit represents one metre in the abstract sculpture scene. Neither asset represents the hotel's physical facilities or a geographically accurate map.
- Scale: flock approximately 6 m across as a conceptual sculpture; relief diameter 6 m. Pivots at scene origin, Z up.
- Camera: orthographic 3/4 studio render, transparent background, warm key, cool soft fill and rim separation.
- Outputs: transparent PNG previews, optimized WebP presentation images, source `.blend` projects and `.glb` meshes.
- Motion: gentle CSS floating/scroll rotation; optional user-controlled real-time 3D orbit. Reduced-motion respects system preference.
- Workflow: isolated background Blender process using factory-startup; `COL_Artwork`, `COL_Cameras`, `COL_Lights`; build silhouettes, material/light preview, final render, geometry audit, export, visual inspection.
- Skills: Blender Director, Rendering, Materials and Lighting. No Blender MCP is exposed in this session, so use the installed executable and `bpy` under the user's explicit authorization. Never load or modify the unrelated open unsaved project.
