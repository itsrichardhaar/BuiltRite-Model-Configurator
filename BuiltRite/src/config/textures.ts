import type { MaterialChoice } from '../state/useConfigurator'

// Shared color palette
const COLOR = {
  white:    { type: 'color', name: 'White',    value: '#f5f5f7' } as const,
  charcoal: { type: 'color', name: 'Charcoal', value: '#333333' } as const,
  sand:     { type: 'color', name: 'Sand',     value: '#d9c9a3' } as const,
  navy:     { type: 'color', name: 'Navy',     value: '#0a2342' } as const,
}

// Example PBR entries (drop your actual file paths in here)
const BRICK_RED = {
  type: 'pbr',
  name: 'Brick (Red)',
  albedo: '/textures/brick/uk1kcadew_4K_Albedo.jpg',
  normal: '/textures/brick/uk1kcadew_4K_Albedo.jpg',
  roughness: '/textures/brick/uk1kcadew_4K_Albedo.jpg',
  ao: '/textures/brick/uk1kcadew_4K_Albedo.jpg',
} as const

const STUCCO_LIGHT = {
  type: 'pbr',
  name: 'Brick (Light)',
  albedo: '/textures/brick/ukxlehdo_4K_Albedo.jpg',
  normal: '/textures/brick/ukxlehdo_4K_Albedo.jpg',
  roughness: '/textures/brick/ukxlehdo_4K_Albedo.jpg',
} as const

const METAL_PANEL = {
  type: 'pbr',
  name: 'Metal Panel',
  albedo: '/textures/metal_panel/albedo.jpg',
  normal: '/textures/metal_panel/normal.jpg',
  roughness: '/textures/metal_panel/rough.jpg',
} as const

export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  walls:    [BRICK_RED, STUCCO_LIGHT, COLOR.white, COLOR.charcoal],
  roof:     [METAL_PANEL, COLOR.charcoal, COLOR.white],
  windows:  [COLOR.white, COLOR.charcoal, COLOR.navy],
  doors:    [STUCCO_LIGHT, COLOR.white, COLOR.charcoal],
}

