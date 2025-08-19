import type { MaterialChoice } from '../state/useConfigurator'

// Two PBR entries using just albedo (normal/roughness/ao omitted for now)
const BRICK_RED = {
  type: 'pbr',
  name: 'Brick (Red)',
  albedo: '/textures/brick/uk1kcadew_4K_Albedo.jpg',
} as const

const BRICK_LIGHT = {
  type: 'pbr',
  name: 'Brick (Light)',
  albedo: '/textures/brick/ukxlehdo_4K_Albedo.jpg',
} as const

const BRICK_NORMAL = {
  type: 'pbr',
  name: 'Brick (Normal)',
  albedo: '/textures/brick/ukxlehdo_4K_Normal.jpg',
  normal: '/textures/brick/ukxlehdo_4K_Normal.jpg',
} as const

// Only provide sets for "walls" (Primary Walls) and "windows" (Base).
// Leave the others out so they don't show any UI or change.
export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  walls:   [BRICK_RED, BRICK_LIGHT, BRICK_NORMAL],
  windows: [BRICK_RED, BRICK_LIGHT, BRICK_NORMAL], // your "Base" part uses id "windows"
}







