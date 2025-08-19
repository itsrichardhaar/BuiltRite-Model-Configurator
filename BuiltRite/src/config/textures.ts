import type { MaterialChoice } from '../state/useConfigurator'

// Two PBR entries using just albedo (normal/roughness/ao omitted for now)
const BRICK_RED = {
  type: 'pbr',
  name: 'Brick (Red)',
  albedo: '/textures/brick/red_brick_diff.jpg',
  diff: '/textures/brick/red_brick_diff.jpg',
  normal: '/textures/brick/red_brick_normal.jpg'
} as const

const BRICK_LIGHT = {
  type: 'pbr',
  name: 'Brick (Sandstone)',
  albedo: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg',
  diff: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg',
  normal: '/textures/brick/seaworn_sandstone_brick_normal.jpg'
} as const

const MASONRY_NORMAL = {
  type: 'pbr',
  name: 'Masonry (Normal)',
  diff: '/textures/masonry/brick_wall_003_diffuse_4k.jpg',
  albedo: '/textures/masonry/brick_wall_003_diffuse_4k.jpg',
  normal: '/textures/masonry/brick_wall_003_normal.jpg',
} as const

const METAL_SHEET = {
  type: 'pbr',
  name: 'Metal (Sheet)',
  diff: '/textures/metal/box_profile_metal_sheet_diff.jpg',
  albedo: '/textures/metal/box_profile_metal_sheet_diff.jpg',
  normal: '/textures/metal/box_profile_metal_sheet_normal.jpg',
} as const

const METAL_CORRUGATED = {
  type: 'pbr',
  name: 'Metal (Corrugated)',
  diff: '/textures/metal/corrugated_iron_02_diff_4k.jpg',
  albedo: '/textures/metal/corrugated_iron_02_diff_4k.jpg',
  normal: '/textures/metal/corrugated_iron_02_normal.jpg',
} as const

const METAL_FACTORY = {
  type: 'pbr',
  name: 'Metal (Factory Wall)',
  diff: '/textures/metal/factory_wall_diff.jpg',
  albedo: '/textures/metal/factory_wall_diff.jpg',
  normal: '/textures/metal/facgtory_wall_normal.jpg',
} as const

// Only provide sets for "walls" (Primary Walls) and "windows" (Base).
// Leave the others out so they don't show any UI or change.
export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  walls:   [BRICK_RED, BRICK_LIGHT, MASONRY_NORMAL, METAL_SHEET, METAL_CORRUGATED, METAL_FACTORY],
  windows: [BRICK_RED, BRICK_LIGHT, MASONRY_NORMAL, METAL_SHEET, METAL_CORRUGATED, METAL_FACTORY], // your "Base" part uses id "windows"
}







