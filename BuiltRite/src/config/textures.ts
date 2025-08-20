
import type { MaterialChoice } from '../state/useConfigurator'

// Brick
const BRICK_RED: MaterialChoice = { type: 'pbr', name: 'Brick Red',   albedo: '/textures/brick/red_brick_normal.jpg' }
const BRICK_LIGHT: MaterialChoice = { type: 'pbr', name: 'Brick Light', albedo: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg' }

// Masonry
const MASONRY_BRICK_WHITE: MaterialChoice = { type: 'pbr', name: 'Masonry Brick White', albedo: '/textures/masonry/brick_wall_003_normal.jpg' }

// Metal
const METAL_CORRUGATED:     MaterialChoice = { type: 'pbr', name: 'Corrugated Metal', albedo: '/textures/metal/corrugated_iron_02_diff_4k.jpg' }
const METAL_FACTORY:    MaterialChoice = { type: 'pbr', name: 'Metal Factory',      albedo: '/textures/metal/factory_wall_diff.jpg' }

// Stone
const STONE_WALL:     MaterialChoice = { type: 'pbr', name: 'Stone Wall', albedo: '/textures/stone/rustic_stone_wall_02_diff.jpg' }

// Stucco
const STUCCO_CONCRETE:     MaterialChoice = { type: 'pbr', name: 'Stucco Concrete', albedo: '/textures/stucco/gravel_concrete_normal.jpg' }
const STUCCO_PLASTER:    MaterialChoice = { type: 'pbr', name: 'Stucco Plaster',      albedo: '/textures/stucco/painted_plaster_wall_normal.jpg' }

export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  walls:        [BRICK_RED, BRICK_LIGHT, MASONRY_BRICK_WHITE, STUCCO_CONCRETE, STUCCO_PLASTER, STONE_WALL],
  base:         [BRICK_LIGHT, STUCCO_CONCRETE, STUCCO_PLASTER, STONE_WALL],
  top_trim:     [MASONRY_BRICK_WHITE, BRICK_RED, STUCCO_CONCRETE, STUCCO_PLASTER, STONE_WALL],
  metal_panels: [METAL_CORRUGATED, METAL_FACTORY],
  roof:         [METAL_CORRUGATED, METAL_FACTORY],
  awning:       [METAL_CORRUGATED, METAL_FACTORY],
  foundation:   [BRICK_RED, BRICK_LIGHT, MASONRY_BRICK_WHITE, STUCCO_CONCRETE, STUCCO_PLASTER, STONE_WALL],
}







