// src/components/Model.tsx
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { makeMaterial, makeWindowGlass, makeWindowFrame } from '../lib/materials'
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

  // Ground, windows, shadows, and special-case materials
  useEffect(() => {
    if (!root) return

    // --- Nice, stable defaults on import ---
    root.traverse((o: any) => {
      if (!o?.isMesh) return

      o.castShadow = true
      o.receiveShadow = true

      // Force uv2 for AO if missing
      if (o.geometry && !o.geometry.attributes.uv2 && o.geometry.attributes.uv) {
        o.geometry.setAttribute('uv2', o.geometry.attributes.uv)
      }

      // Per-material hygiene
      const mat = o.material as THREE.Material | THREE.Material[] | undefined
      const mats = Array.isArray(mat) ? mat : mat ? [mat] : []
      for (const m of mats) {
        if ('side' in m) (m as any).side = THREE.FrontSide
        if ('shadowSide' in m) (m as any).shadowSide = THREE.FrontSide
      }
    })

    // --- Place on ground & compute shadow plane footprint ---
    const box = new THREE.Box3().setFromObject(root)
    const minY = box.min.y
    if (isFinite(minY)) root.position.y -= minY
    const size = new THREE.Vector3()
    box.getSize(size)
    setFootprint({ x: size.x * 1.2, z: size.z * 1.2 })

    // --- Make GLB "ground" meshes unlit & NOT part of shadow pipeline ---
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

    // --- WINDOWS: assign glass + frame materials by names we found in your GLB ---
    const glassMat = makeWindowGlass()
    const frameMat = makeWindowFrame()

    root.traverse((o: any) => {
      if (!o?.isMesh) return
      const nodeName = (o.name || '').toLowerCase()
      const geomName = (o.geometry?.name || '').toLowerCase()
      const matName  = (o.material?.name || '').toLowerCase()

      const isGlass =
        matName.includes('window_glass') ||
        geomName === 'plane.008_0' ||                    // from your GLB
        nodeName.startsWith('windows_doors')             // glass subparts often live here
      const isFrame =
        matName.includes('window_frame') ||
        geomName === 'plane.008_1' ||
        geomName === 'cube.027_0'

      if (isGlass) {
        o.material = glassMat
        o.castShadow = false
        o.receiveShadow = false
        fixedMaterialUUIDs.current.add(o.uuid)
        return
      }

      if (isFrame || nodeName.includes('windows_doors')) {
        // Fallback: if it's part of windows_doors but not caught as glass, treat as frame
        o.material = frameMat
        o.castShadow = true
        o.receiveShadow = true
        fixedMaterialUUIDs.current.add(o.uuid)
        return
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

      {/* Single shadow receiver plane (slightly lifted to avoid z-fighting) */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[footprint.x, footprint.z]} />
        <shadowMaterial color="#000" opacity={0.28} transparent />
      </mesh>
    </group>
  )
}

useGLTF.preload(MODEL_URL)











 






 
