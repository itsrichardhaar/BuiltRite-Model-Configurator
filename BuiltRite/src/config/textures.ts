import type { MaterialChoice } from '../state/useConfigurator'

export const TEXTURE_SETS: Record<string, MaterialChoice[]> = {
  facadeA: [
    // Colors
    { type: 'color', name: 'Paint: White', value: '#f5f5f7' },
    { type: 'color', name: 'Paint: Charcoal', value: '#D7282F' },
    { type: 'color', name: 'Paint: Sand', value: '#d9c9a3' },
    { type: 'color', name: 'Paint: Navy', value: '#fff' },

    // PBR (uncomment/use if you have these maps placed under /public)
    // {
    //   type: 'pbr', name: 'Brick (Red)',
    //   albedo: '/textures/brick_red/albedo.jpg',
    //   normal: '/textures/brick_red/normal.jpg',
    //   roughness: '/textures/brick_red/rough.jpg',
    //   ao: '/textures/brick_red/ao.jpg',
    // },
    // {
    //   type: 'pbr', name: 'Stucco (Light)',
    //   albedo: '/textures/stucco_light/albedo.jpg',
    //   normal: '/textures/stucco_light/normal.jpg',
    //   roughness: '/textures/stucco_light/rough.jpg',
    // },
    // {
    //   type: 'pbr', name: 'Metal Panel',
    //   albedo: '/textures/metal_panel/albedo.jpg',
    //   normal: '/textures/metal_panel/normal.jpg',
    //   roughness: '/textures/metal_panel/rough.jpg',
    // },
  ],
}