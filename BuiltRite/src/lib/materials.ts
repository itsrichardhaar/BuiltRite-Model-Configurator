import * as THREE from 'three'
import type { MaterialChoice, PBRChoice } from '../state/useConfigurator'

const loader = new THREE.TextureLoader()
const cache = new Map<string, THREE.Texture>()

function getTex(url?: string, isColorMap = false): THREE.Texture | null {
  if (!url) return null
  if (cache.has(url)) return cache.get(url)!

  const t = loader.load(url)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 8

  // Modern colorSpace API (r150+)
  if (isColorMap && 'SRGBColorSpace' in THREE) {
    ;(t as any).colorSpace = (THREE as any).SRGBColorSpace
  }

  cache.set(url, t)
  return t
}

// --------- Window helpers ---------
export function makeWindowGlass(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    transmission: 0.6,
    thickness: 1.2,
    ior: 1.5,
    roughness: 0.35,
    metalness: 0.0,
    clearcoat: 0.15,
    clearcoatRoughness: 0.05,
    attenuationColor: new THREE.Color('#cfe0ea'),
    attenuationDistance: 2.0,
    color: new THREE.Color('#a9c6df'),
    transparent: true,
    opacity: 1,
    depthWrite: false, // important so glass sorts correctly with frames
    side: THREE.FrontSide,
    envMapIntensity: 1.1,
  })
}

export function makeWindowFrame(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: '#3a3a3a',
    roughness: 0.6,
    metalness: 0.1,
  })
}

// --------- Main factory used by configurator ---------
export function makeMaterial(choice: MaterialChoice): THREE.Material {
  // Optional: if you ever mark window presets in your config
  if ((choice as any)?.preset === 'window_glass') return makeWindowGlass()
  if ((choice as any)?.preset === 'window_frame') return makeWindowFrame()

  if (choice.type === 'color') {
    const mat = new THREE.MeshStandardMaterial({ color: choice.value })
    mat.roughness = 0.9
    mat.metalness = 0.0
    return mat
  }

  const p = choice as PBRChoice
  const usePhysical = !!p.specular

  const albedo     = getTex(p.albedo, true)
  const normalMap  = getTex(p.normal)
  const roughMap   = getTex(p.roughness)
  const aoMap      = getTex(p.ao)
  const bumpMap    = getTex(p.bump)
  const specMap    = getTex(p.specular)

  const params = p.params ?? {}

  if (usePhysical) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: params.metalness ?? 0.0,
      roughness: roughMap ? 1.0 : (params.roughness ?? 0.8),
      map: albedo || null,
      normalMap: normalMap || null,
      roughnessMap: roughMap || null,
      aoMap: aoMap || null,
      bumpMap: bumpMap || null,
    })
    if (bumpMap) mat.bumpScale = params.bumpScale ?? 0.05
    if (normalMap) mat.normalScale = new THREE.Vector2(params.normalScale ?? 1, params.normalScale ?? 1)
    if (aoMap) mat.aoMapIntensity = params.aoIntensity ?? 1.0

    if ('specularIntensity' in mat) {
      ;(mat as any).specularIntensity = params.specularIntensity ?? 0.25
      if (specMap) (mat as any).specularIntensityMap = specMap
    }

    return mat
  }

  const mat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    metalness: params.metalness ?? 0.0,
    roughness: roughMap ? 1.0 : (params.roughness ?? 0.8),
    map: albedo || null,
    normalMap: normalMap || null,
    roughnessMap: roughMap || null,
    aoMap: aoMap || null,
    bumpMap: bumpMap || null,
  })
  if (bumpMap) mat.bumpScale = params.bumpScale ?? 0.05
  if (normalMap) mat.normalScale = new THREE.Vector2(params.normalScale ?? 1, params.normalScale ?? 1)
  if (aoMap) mat.aoMapIntensity = params.aoIntensity ?? 1.0

  return mat
}
































