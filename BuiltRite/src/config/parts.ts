export type Part = { id: string; label: string; meshNames: string[] }

export const PARTS: Part[] = [
  {
    id: 'facadeA',
    label: 'Facade Panel A',
    meshNames: [
      // TODO: replace with exact façade mesh names
      'windows_doors_1gGf1Z',
      'windows_doors_1gFwH6',
      'fecad_corner_1gHeiq',
      'fecad_corner_1gFcaw',
      'Material_01', 'Material_02', 'Material_03', 'Material_04', 'Material_05',
    ],
  },
]
