
import type { MaterialChoice } from '../state/useConfigurator'

// Brick
const BRICK_RED: MaterialChoice = { type: 'pbr', name: 'Brick Red',   albedo: '/textures/brick/red_brick_diff.jpg' }
const BRICK_LIGHT: MaterialChoice = { 
  type: 'pbr', 
  name: 'Brick Light', 
  albedo: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg', 
  roughness: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg', 
  normal: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg',
  ao: '/textures/brick/seaworn_sandstone_brick_diff_4k.jpg' ,

}

// Masonry
const MASONRY_BRICK_WHITE: MaterialChoice = { type: 'pbr', name: 'Masonry Brick White', albedo: '/textures/brick/brick_wall_003_diffuse_4k.webp' }
const MASONRY_MODERN_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Mastonry Modern Brick Wall', 
  albedo: '/textures/masonry/modern-brick/Modern_Brick_Wall_semlcibb_4K_BaseColor.webp',
  normal: '/textures/masonry/modern-brick/Modern_Brick_Wall_semlcibb_4K_Normal.webp'
}

const MASONRY_GRAY_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Gray Brick Wall', 
  albedo: '/textures/masonry/gray-brick/Gray_Brick_Wall_ucnfejocw_4K_BaseColor.webp',
  normal: '/textures/masonry/gray-brick/Gray_Brick_Wall_ucnfejocw_4K_Normal.webp'
}

const MASONRY_DARK_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Dark Brick Wall', 
  albedo: '/textures/masonry/dark-brick/Dark_Brick_Wall_ucmlbhgg_4K_BaseColor.webp',
  normal: '/textures/masonry/dark-brick/Dark_Brick_Wall_ucmlbhgg_4K_Normal.webp'
}

// Metal
const METAL_CORRUGATED:     MaterialChoice = { type: 'pbr', name: 'Corrugated Metal', albedo: '/textures/metal/corrugated_iron_02_diff_4k.jpg' }
const METAL_FACTORY:    MaterialChoice = { type: 'pbr', name: 'Metal Factory',      albedo: '/textures/metal/factory_wall_diff.jpg' }

// Stone
const STONE_WALL:     MaterialChoice = { type: 'pbr', name: 'Stone Wall', albedo: '/textures/stone/rustic_stone_wall_02_diff.jpg' }

// Stucco
const STUCCO_CONCRETE:     MaterialChoice = { type: 'pbr', name: 'Stucco Concrete', albedo: '/textures/stucco/gravel_concrete_diff_4k.jpg' }
const STUCCO_PLASTER:    MaterialChoice = { type: 'pbr', name: 'Stucco Plaster',      albedo: '/textures/stucco/painted_plaster_wall_diff_4k.jpg' }

// Garage Doors
const GARAGE_CORRUGATED: MaterialChoice = { type: 'pbr', name: 'Corrugated Metal', albedo: '/textures/metal/corrugated_iron_02_diff_4k.jpg'}
const GARAGE_WHITE: MaterialChoice = { type: 'color', name: 'White',       value: '#ffffff' }
const GARAGE_BLACK: MaterialChoice = { type: 'color', name: 'Black',       value: '#111111' }
const GARAGE_BRONZE: MaterialChoice = { type: 'color', name: 'Dark Bronze', value: '#3b3b3b' }
const GARAGE_GREY: MaterialChoice = { type: 'color', name: 'Gray',         value: '#8a8f98' }
const GARAGE_RED: MaterialChoice = { type: 'color', name: 'Red',           value: '#D7282F'}

const AWNING_WHITE: MaterialChoice = { type: 'color', name: 'White',       value: '#ffffff' }
const AWNING_BLACK: MaterialChoice = { type: 'color', name: 'Black',       value: '#111111' }
const AWNING_BRONZE: MaterialChoice = { type: 'color', name: 'Dark Bronze', value: '#3b3b3b' }
const AWNING_GREY: MaterialChoice = { type: 'color', name: 'Gray',         value: '#8a8f98' }
const AWNING_RED: MaterialChoice = { type: 'color', name: 'Red',           value: '#D7282F'}

export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  walls:        [MASONRY_MODERN_BRICK, MASONRY_GRAY_BRICK, MASONRY_DARK_BRICK],
  base:         [MASONRY_MODERN_BRICK, MASONRY_GRAY_BRICK, MASONRY_DARK_BRICK],
  top_trim:     [MASONRY_MODERN_BRICK, MASONRY_GRAY_BRICK, MASONRY_DARK_BRICK],
  metal_panels: [METAL_CORRUGATED, METAL_FACTORY],
  roof:         [METAL_CORRUGATED, METAL_FACTORY],
  awning:       [METAL_CORRUGATED, METAL_FACTORY, AWNING_WHITE, AWNING_BLACK, AWNING_BRONZE, AWNING_GREY, AWNING_RED],
  foundation:   [BRICK_RED, BRICK_LIGHT, MASONRY_BRICK_WHITE, STUCCO_CONCRETE, STUCCO_PLASTER, STONE_WALL, MASONRY_MODERN_BRICK, MASONRY_GRAY_BRICK],
  garage_doors: [GARAGE_CORRUGATED, GARAGE_RED, GARAGE_WHITE, GARAGE_BLACK, GARAGE_BRONZE, GARAGE_GREY],
}







