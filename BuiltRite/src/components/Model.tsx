import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { makeMaterial } from '../lib/materials'
import { PARTS } from '../config/parts'
import { TEXTURE_SETS } from '../config/textures'
import { useConfigurator, type ConfigState } from '../state/useConfigurator'

const MODEL_URL = '/models/building_01_v002.glb'

export default function Model() {
  const group = useRef<THREE.Group>(null!)

  const rotationY = useConfigurator((s: ConfigState) => s.rotationY)
  const rotationX = useConfigurator((s: ConfigState) => s.rotationX)
  const selection = useConfigurator((s: ConfigState) => s.selection)

  const [velocityY, setVelocityY] = useState(0)
  const [velocityX, setVelocityX] = useState(0)

  const { scene } = useGLTF(MODEL_URL)
  const root = useMemo(() => scene.clone(true), [scene])

  // Do-not-touch sets
  const groundMeshUUIDs = useRef<Set<string>>(new Set())
  const fixedMaterialUUIDs = useRef<Set<string>>(new Set())

  // Size for the shadow receiver (no mask involved)
  const [footprint, setFootprint] = useState<{ x: number; z: number }>({ x: 50, z: 50 })

  // Default selections
  useEffect(() => {
    for (const part of PARTS) {
      if (!selection[part.id]) {
        const first = TEXTURE_SETS[part.id]?.[0]
        if (first) useConfigurator.getState().setSelection(part.id, first)
      }
    }
  }, [selection])

  // Name -> part mapping (checks ancestors too)
  const nameToPart = useMemo(() => {
    const m = new Map<string, string>()
    for (const part of PARTS) for (const n of part.meshNames) m.set(n.toLowerCase(), part.id)
    return m
  }, [])

  function partIdForObject(obj: THREE.Object3D | null): string | undefined {
    let o: THREE.Object3D | null = obj
    while (o) {
      const pid = nameToPart.get((o.name || '').toLowerCase())
      if (pid) return pid
      o = o.parent ?? null
    }
    return undefined
  }

  // Ground, shadows, and special-case materials
  useEffect(() => {
    // enable cast/receive on all meshes
    root.traverse((o: any) => { if (o?.isMesh) { o.castShadow = true; o.receiveShadow = true } })

    // place model on ground & compute size for shadow plane
    const box = new THREE.Box3().setFromObject(root)
    const minY = box.min.y
    if (isFinite(minY)) root.position.y -= minY
    const size = new THREE.Vector3()
    box.getSize(size)
    setFootprint({ x: size.x * 1.2, z: size.z * 1.2 })

    // Make GLB ground UNLIT WHITE (pure white, unaffected by lights)
    const GROUND_NAME_HITS = ['floor_plane', 'ground'] as const
    root.traverse((o: any) => {
      if (!o?.isMesh) return
      const name = (o.name || '').toLowerCase()
      const matName = (o.material?.name || '').toLowerCase()
      const isGround =
        GROUND_NAME_HITS.some(h => name === h || name.includes(h)) ||
        GROUND_NAME_HITS.some(h => matName === h || matName.includes(h))
      if (isGround) {
        groundMeshUUIDs.current.add(o.uuid)
        const whiteMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })
        o.material = Array.isArray(o.material) ? o.material.map(() => whiteMat) : whiteMat
        o.castShadow = false
        o.receiveShadow = false
      }
    })

    // Keep windows_doors a fixed solid color
    const WINDOW_DOORS_COLOR = '#2f2f2f'
    root.traverse((o: any) => {
      if (!o?.isMesh) return
      const name = (o.name || '').toLowerCase()
      if (name.includes('windows_doors')) {
        o.material = new THREE.MeshStandardMaterial({
          color: WINDOW_DOORS_COLOR,
          roughness: 0.8,
          metalness: 0.1,
        })
        o.castShadow = true
        o.receiveShadow = true
        fixedMaterialUUIDs.current.add(o.uuid)
      }
    })
  }, [root])

  // Live material pass (skip protected meshes)
  useFrame(() => {
    root.traverse((obj: any) => {
      if (!obj?.isMesh) return
      if (groundMeshUUIDs.current.has(obj.uuid)) return
      if (fixedMaterialUUIDs.current.has(obj.uuid)) return

      const partId = partIdForObject(obj)
      if (!partId) return

      const sel = selection[partId]
      if (!sel) return

      const mat = makeMaterial(sel)
      obj.material = Array.isArray(obj.material) ? obj.material.map(() => mat) : mat
    })
  })

  // eased rotation / inertia
  useFrame((_, dt) => {
    if (!group.current) return
    const diffY = rotationY - group.current.rotation.y
    const newVelY = velocityY * 0.9 + diffY * 10 * dt
    setVelocityY(newVelY)
    group.current.rotation.y += newVelY * dt

    const diffX = rotationX - group.current.rotation.x
    const newVelX = velocityX * 0.9 + diffX * 10 * dt
    setVelocityX(newVelX)
    group.current.rotation.x += newVelX * dt
  })

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* GLB */}
      <primitive object={root} />

      {/* Shadow receiver plane (no mask) */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, 0]} receiveShadow>
        <planeGeometry args={[footprint.x, footprint.z]} />
        <shadowMaterial color="#000" opacity={0.28} transparent />
      </mesh>
    </group>
  )
}

useGLTF.preload(MODEL_URL)








 






 
