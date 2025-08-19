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
  // Albedo/baseColor should be sRGB; others (normal/roughness/ao) stay linear
  if (isColorMap) {
    // three r152+: use colorSpace; older versions use encoding = sRGBEncoding
    ;(t as any).colorSpace = (THREE as any).SRGBColorSpace ?? undefined
  }
  cache.set(url, t)
  return t
}

export function makeMaterial(choice: MaterialChoice): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({ color: '#ffffff' })

  if (choice.type === 'color') {
    mat.color = new THREE.Color(choice.value)
    mat.map = null
    mat.normalMap = null
    mat.roughnessMap = null
    mat.aoMap = null
    mat.roughness = 0.9
    mat.metalness = 0.0
    return mat
  }

  const p = choice as PBRChoice

  const map        = getTex(p.albedo, true)
  const normalMap  = getTex(p.normal)
  const roughMap   = getTex(p.roughness)
  const aoMap      = getTex(p.ao)

  mat.map          = map
  mat.normalMap    = normalMap
  mat.roughnessMap = roughMap
  mat.aoMap        = aoMap

  mat.color = new THREE.Color('#ffffff')
  // If you have a roughnessMap, leave roughness at 1 so the map dictates it;
  // otherwise pick a reasonable default.
  mat.roughness = roughMap ? 1.0 : 0.8
  mat.metalness = 0.0
  mat.needsUpdate = true
  return mat
}















