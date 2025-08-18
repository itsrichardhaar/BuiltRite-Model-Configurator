import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { makeMaterial } from '../lib/materials'
import { PARTS } from '../config/parts'
import { TEXTURE_SETS } from '../config/textures'
import { useConfigurator, type ConfigState } from '../state/useConfigurator'

const MODEL_URL = '/models/building_01.glb'

export default function Model() {
  const group = useRef<THREE.Group>(null!)

  // Store/state
  const rotationY = useConfigurator((s: ConfigState) => s.rotationY)
  const selection = useConfigurator((s: ConfigState) => s.selection)
  const tiling = useConfigurator((s: ConfigState) => s.tiling)
  const pattern = useConfigurator((s: ConfigState) => s.pattern)

  // Inertia (keeps your eased rotation feel)
  const [velocity, setVelocity] = useState(0)

  // Load GLB and clone so we can safely mutate materials
  const { scene } = useGLTF(MODEL_URL)
  const root = useMemo(() => scene.clone(true), [scene])

  // (Optional) Log all mesh names once to help fill PARTS.meshNames
  useMemo(() => {
    const names: string[] = []
    root.traverse((o: any) => {
      if (o?.isMesh && typeof o.name === 'string') names.push(o.name)
    })
    // eslint-disable-next-line no-console
    console.log('[GLB mesh names]', names)
  }, [root])

  // Initialize defaults (first material, tiling=1, pattern=all) for each part
  useMemo(() => {
    for (const part of PARTS) {
      if (!selection[part.id]) {
        const first = TEXTURE_SETS[part.id]?.[0]
        if (first) useConfigurator.getState().setSelection(part.id, first)
      }
      if (tiling[part.id] == null) useConfigurator.getState().setTiling(part.id, 1)
      if (!pattern[part.id]) useConfigurator.getState().setPattern(part.id, 'all')
    }
  }, [selection, tiling, pattern])

  // Quick lookup: meshName -> partId
  const meshToPart = useMemo(() => {
    const map = new Map<string, string>()
    for (const part of PARTS) for (const n of part.meshNames) map.set(n, part.id)
    return map
  }, [])

  // Apply materials every frame based on UI state (selection, tiling, pattern)
  useFrame(() => {
    root.traverse((obj: any) => {
      if (!obj?.isMesh) return
      const partId = meshToPart.get(obj.name)
      if (!partId) return

      const sel = selection[partId]
      const rep = tiling[partId] ?? 1
      const mode = pattern[partId] ?? 'all'

      // Pattern: if alternate, only even-indexed meshes (parse trailing number)
      if (mode === 'alternate') {
        const num = parseInt(obj.name.match(/(\d+)$/)?.[1] ?? '0', 10)
        if (num % 2 !== 0) {
          obj.material = new THREE.MeshStandardMaterial({ color: '#bbbbbb' })
          return
        }
      }

      obj.material = sel ? makeMaterial(sel, rep) : new THREE.MeshStandardMaterial({ color: '#bbbbbb' })
    })
  })

  // Smooth rotation with a touch of inertia
  useFrame((_, dt) => {
    if (!group.current) return
    const diff = rotationY - group.current.rotation.y
    const acceleration = diff * 10
    const newVelocity = velocity * 0.9 + acceleration * dt
    setVelocity(newVelocity)
    group.current.rotation.y += newVelocity * dt
  })

  return (
    <group ref={group}>
      <primitive object={root} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
