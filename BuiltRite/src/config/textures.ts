import type { MaterialChoice } from '../state/useConfigurator'

export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  facadeA: [
    { type: 'procedural', name: 'Brick (mock)', a: '#b23b2a', b: '#7a241a', repeat: 3 },
    { type: 'procedural', name: 'Stucco (mock)', a: '#e7e3da', b: '#d6d0c3', repeat: 1.5 },
    { type: 'procedural', name: 'Metal (mock)', a: '#b8bfc7', b: '#8f969e', repeat: 2 },
    { type: 'color', name: 'Paint: White', value: '#f5f5f7' },
    { type: 'color', name: 'Paint: Charcoal', value: '#333333' },
  ],
}