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

  // Track meshes we should NEVER overwrite in the live material pass
  const groundMeshUUIDs = useRef<Set<string>>(new Set())
  const fixedMaterialUUIDs = useRef<Set<string>>(new Set())

  // footprint for the shadow plane
  const [footprint, setFootprint] = useState<{ x: number; z: number }>({ x: 50, z: 50 })

  // default selections (first option per part)
  useEffect(() => {
    for (const part of PARTS) {
      if (!selection[part.id]) {
        const first = TEXTURE_SETS[part.id]?.[0]
        if (first) useConfigurator.getState().setSelection(part.id, first)
      }
    }
  }, [selection])

  // Build a case-insensitive name → partId map (we'll also check ancestors)
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

  // ground & shadows + special-case materials
  useEffect(() => {
    // 1) enable cast/receive on all meshes
    root.traverse((o: any) => {
      if (o?.isMesh) { o.castShadow = true; o.receiveShadow = true }
    })

    // 2) place model on ground + compute footprint for shadow plane
    const box = new THREE.Box3().setFromObject(root)
    const minY = box.min.y
    if (isFinite(minY)) root.position.y -= minY
    const size = new THREE.Vector3()
    box.getSize(size)
    setFootprint({ x: size.x * 1.2, z: size.z * 1.2 }) // slightly larger than model

    // 3) Make GLB ground UNLIT WHITE (and not a shadow receiver)
    //    so it stays pure white regardless of lighting.
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
        // Unlit white base
        const whiteMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })
        // If multi-material, replace all with the same unlit white
        o.material = Array.isArray(o.material) ? o.material.map(() => whiteMat) : whiteMat
        o.castShadow = false
        o.receiveShadow = false // shadow will be on a thin overlay plane
      }
    })

    // 4) (optional) Force windows_doors to solid color and protect it
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

  // apply materials to non-ground, non-fixed meshes (ancestor-aware, multi-material safe)
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

  // eased rotation / inertia for both Y (yaw) and X (pitch)
  useFrame((_, dt) => {
    if (!group.current) return
    const diffY = rotationY - group.current.rotation.y
    const accelY = diffY * 10
    const newVelY = velocityY * 0.9 + accelY * dt
    setVelocityY(newVelY)
    group.current.rotation.y += newVelY * dt

    const diffX = rotationX - group.current.rotation.x
    const accelX = diffX * 10
    const newVelX = velocityX * 0.9 + accelX * dt
    setVelocityX(newVelX)
    group.current.rotation.x += newVelX * dt
  })

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* GLB */}
      <primitive object={root} />

      {/* Thin shadow receiver plane just above the GLB ground */}
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, 0.001, 0]} // a hair above y=0 in model space
        receiveShadow
      >
        <planeGeometry args={[footprint.x, footprint.z]} />
        <shadowMaterial color="#000" opacity={0.22} transparent />
      </mesh>
    </group>
  )
}

useGLTF.preload(MODEL_URL)







 






 
