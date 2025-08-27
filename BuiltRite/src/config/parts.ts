export type Part = { id: string; label: string; meshNames: string[] }

export const PARTS: Part[] = [
  { id: 'walls',         label: 'Primary Walls', meshNames: ['Object_01'] },
  { id: 'base',          label: 'Base',          meshNames: ['Object_03'] },
  { id: 'top_trim',      label: 'Top Trim',      meshNames: ['Object_02', 'Object_04'] },
  { id: 'metal_panels',  label: 'Metal Panels',  meshNames: ['Object_05'] },
  { id: 'awning',        label: 'Awning',        meshNames: ['Awning'] },
  { id: 'windows_doors', label: 'Windows & Doors', meshNames: ['windows_doors'] },
  { id: 'garage_doors', label: 'Roll Up Doors',  meshNames: ['garrage_doors'] }
  
]

