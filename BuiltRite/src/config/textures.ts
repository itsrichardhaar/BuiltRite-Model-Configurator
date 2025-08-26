
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
const MASONRY_TAN_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Mastonry Tan Brick Wall', 
  albedo: '/textures/masonry/tan-brick/Tan_Brick_BaseColor.webp',
  normal: '/textures/masonry/tan-brick/Tan_Brick_Normal.webp',
  roughness: '/textures/masonry/tan-brick/Tan_Brick_Roughness.webp',
   params: {
    roughness: 1.0,        // used when no roughnessMap; when map exists, this is a baseline
    metalness: 0.0,
    normalScale: 1.0,
    bumpScale: 0.04,
    aoIntensity: 1.0,
    specularIntensity: 0.25,
  },
}

const MASONRY_GRAY_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Gray Brick Wall', 
  albedo: '/textures/masonry/gray-brick/Gray_Brick_Wall_ucnfejocw_4K_BaseColor.webp',
  normal: '/textures/masonry/gray-brick/Gray_Brick_Wall_ucnfejocw_4K_Normal.webp',
  params: {
    roughness: 1.0,        // used when no roughnessMap; when map exists, this is a baseline
    metalness: 0.0,
    normalScale: 1.0,
    bumpScale: 0.04,
    aoIntensity: 1.0,
    specularIntensity: 0.25,
  },
}

const MASONRY_DARK_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Dark Brick Wall', 
  albedo: '/textures/masonry/dark-brick/Dark_Brick_Wall_ucmlbhgg_4K_BaseColor.webp',
  normal: '/textures/masonry/dark-brick/Dark_Brick_Wall_ucmlbhgg_4K_Normal.webp',
  params: {
    roughness: 1.0,        // used when no roughnessMap; when map exists, this is a baseline
    metalness: 0.0,
    normalScale: 1.0,
    bumpScale: 0.04,
    aoIntensity: 1.0,
    specularIntensity: 0.25,
  },
}

const MASONRY_BRIGHT_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Bright Brick Wall', 
  albedo: '/textures/masonry/bright-brick/Brick_Wall_Bright_tg1mbdbi_4K_BaseColor.webp',
  normal: '/textures/masonry/bright-brick/Brick_Wall_Bright_tg1mbdbi_4K_BaseColor.webp',
  params: {
    roughness: 1.0,        // used when no roughnessMap; when map exists, this is a baseline
    metalness: 0.0,
    normalScale: 1.0,
    bumpScale: 0.04,
    aoIntensity: 1.0,
    specularIntensity: 0.25,
  },
}

const MASONRY_BEIGE_BRICK: MaterialChoice = { 
  type: 'pbr', 
  name: 'Beige Brick Wall', 
  albedo: '/textures/masonry/beige-brick/Beige_Brick_Facade_uc0ndcifw_4K_BaseColor.webp',
  normal: '/textures/masonry/beige-brick/Beige_Brick_Facade_uc0ndcifw_4K_Normal.webp',
  roughness: '/textures/masonry/beige-brick/Beige_Brick_Facade_uc0ndcifw_4K_Roughness.webp',
  bump: '/textures/masonry/beige-brick/Beige_Brick_Facade_uc0ndcifw_4K_Bump.webp',
  params: {
    roughness: 1.0,        // used when no roughnessMap; when map exists, this is a baseline
    metalness: 0.0,
    normalScale: 1.0,
    bumpScale: 0.04,
    aoIntensity: 1.0,
    specularIntensity: 0.25,
  },
}

// Metal
const METAL_RUSTIC_RED: MaterialChoice = { 
  type: 'pbr', 
  name: 'Metal Rustic Red', 
  albedo: '/textures/metal/rustic-red/box_profile_metal_sheet_diff.jpg',
  normal: '/textures/metal/rustic-red/box_profile_metal_sheet_normal.jpg',
  params: {
    roughness: 0.55,        // used when no roughnessMap; when map exists, this is a baseline
    metalness: 0.05,
    normalScale: 1.0,
    bumpScale: 0.02,
    aoIntensity: 0.95,
    specularIntensity: 0.25,
  },
}

// Stone
const STONE_WALL:     MaterialChoice = { type: 'pbr', name: 'Stone Wall', albedo: '/textures/stone/rustic_stone_wall_02_diff.jpg' }

// Stucco
const STUCCO_CONCRETE:     MaterialChoice = { type: 'pbr', name: 'Stucco Concrete', albedo: '/textures/stucco/gravel_concrete_diff_4k.jpg' }
const STUCCO_PLASTER:    MaterialChoice = { type: 'pbr', name: 'Stucco Plaster',      albedo: '/textures/stucco/painted_plaster_wall_diff_4k.jpg' }

const STUCCO_WALL_YELLOW_TAN: MaterialChoice = { 
  type: 'pbr', 
  name: 'Stucco Wall Yellow Tan', 
  albedo: '/textures/stucco/yellow-tan/Stucco_Wall_ve4meimcw_4K_BaseColor.webp',
  normal: '/textures/stucco/yellow-tan/Stucco_Wall_ve4meimcw_4K_Normal.webp'
}

const STUCCO_WALL_LIGHT_GRAY: MaterialChoice = { 
  type: 'pbr', 
  name: 'Stucco Wall Light Gray', 
  albedo: '/textures/stucco/light-gray/painted_plaster_wall_diff_4k.jpg',
  normal: '/textures/stucco/light-gray/painted_plaster_wall_normal.jpg'
}

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
  walls:        [MASONRY_TAN_BRICK, MASONRY_GRAY_BRICK, MASONRY_DARK_BRICK, MASONRY_BRIGHT_BRICK, MASONRY_BEIGE_BRICK, STUCCO_WALL_YELLOW_TAN, STUCCO_WALL_LIGHT_GRAY, METAL_RUSTIC_RED],
  base:         [MASONRY_TAN_BRICK, MASONRY_GRAY_BRICK, MASONRY_DARK_BRICK, MASONRY_BRIGHT_BRICK, MASONRY_BEIGE_BRICK, STUCCO_WALL_YELLOW_TAN, STUCCO_WALL_LIGHT_GRAY, METAL_RUSTIC_RED],
  top_trim:     [MASONRY_TAN_BRICK, MASONRY_GRAY_BRICK, MASONRY_DARK_BRICK, MASONRY_BRIGHT_BRICK, MASONRY_BEIGE_BRICK, STUCCO_WALL_YELLOW_TAN, STUCCO_WALL_LIGHT_GRAY, METAL_RUSTIC_RED],
  metal_panels: [METAL_RUSTIC_RED],
  roof:         [METAL_RUSTIC_RED],
  awning:       [METAL_RUSTIC_RED, AWNING_WHITE, AWNING_BLACK, AWNING_BRONZE, AWNING_GREY, AWNING_RED],
  foundation:   [BRICK_RED, BRICK_LIGHT, MASONRY_BRICK_WHITE, STUCCO_CONCRETE, STUCCO_PLASTER, STONE_WALL, MASONRY_TAN_BRICK, MASONRY_GRAY_BRICK],
  garage_doors: [GARAGE_CORRUGATED, GARAGE_RED, GARAGE_WHITE, GARAGE_BLACK, GARAGE_BRONZE, GARAGE_GREY],
}







