export type Part = { id: string; label: string; meshNames: string[] }

const expand = (prefix: string, start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => `${prefix}${String(start + i).padStart(2, '0')}`)

export const PARTS: Part[] = [
  { id: 'facadeA', label: 'Facade Panels', meshNames: expand('Panel_', 1, 8) },
]