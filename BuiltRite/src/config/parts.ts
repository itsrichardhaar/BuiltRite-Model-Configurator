export type Part = { id: string; label: string; meshNames: string[] }

export const PARTS: Part[] = [
  { id: 'walls',         label: 'Primary Walls', meshNames: ['Object_01'] },
  { id: 'base',          label: 'Base',          meshNames: ['Object_03'] },
  { id: 'top_trim',      label: 'Top Trim',      meshNames: ['Object_02'] },
  { id: 'metal_panels',  label: 'Metal Panels',  meshNames: ['Object_04', 'Object_05'] },
  { id: 'roof',          label: 'Roof',          meshNames: ['roof_pieces'] },
  { id: 'awning',        label: 'Awning',        meshNames: ['Awning'] },
  { id: 'foundation',    label: 'Foundation',    meshNames: ['Foundation'] },
  // Deliberately excluding multi-material meshes to avoid breaking glass:
  // windows_doors (frame + glass), garrage_doors (two materials), fecad_corner (mixed)
  // Also excluding floor_plane (we convert to ShadowMaterial in Model.tsx)
]

