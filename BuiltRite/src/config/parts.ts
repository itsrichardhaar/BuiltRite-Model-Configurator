export type Part = { id: string; label: string; meshNames: string[] }

export const PARTS: Part[] = [
  { id: 'walls',   label: 'Primary Walls',   meshNames: ['Object_01'] },
  { id: 'roof',    label: 'Top Trim',    meshNames: ['Object_02'] },
  { id: 'windows', label: 'Base', meshNames: ['Object_03'] },
  { id: 'doors',   label: 'Roof Trim',   meshNames: ['Object_04'] },
]

