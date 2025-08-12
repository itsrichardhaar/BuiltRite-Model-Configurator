import * as THREE from 'three'
import type { MaterialChoice, ProceduralChoice } from '../state/useConfigurator'

export function makeMaterial(choice: MaterialChoice, repeat: number): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  if (choice.type === 'color') {
    mat.color = new THREE.Color(choice.value)
    mat.map = null
    return mat
  }
  const tex = makeCheckerTexture(choice, repeat)
  mat.map = tex
  mat.color = new THREE.Color('#ffffff')
  mat.roughness = 0.7
  mat.metalness = 0
  return mat
}

function makeCheckerTexture(choice: ProceduralChoice, repeat: number): THREE.CanvasTexture {
  const size = 256
  const tiles = Math.max(1, Math.round((choice.repeat ?? 1) * repeat * 2))
  const cell = Math.floor(size / tiles)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  for (let y = 0; y < tiles; y++) {
    for (let x = 0; x < tiles; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? choice.a : choice.b
      ctx.fillRect(x * cell, y * cell, cell, cell)
    }
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)
  texture.anisotropy = 4
  return texture
}
