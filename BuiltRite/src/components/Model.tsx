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

  // Keep track of any meshes we identified as "ground" so we don't overwrite their material later
  const groundMeshUUIDs = useRef<Set<string>>(new Set())

  // default selections (first option per part)
  useEffect(() => {
    for (const part of PARTS) {
      if (!selection[part.id]) {
        const first = TEXTURE_SETS[part.id]?.[0]
        if (first) useConfigurator.getState().setSelection(part.id, first)
      }
    }
  }, [selection])

  // ground & shadows + make GLB ground shadow-only
  useEffect(() => {
    // 1) enable cast/receive on all meshes
    root.traverse((o: any) => {
      if (o?.isMesh) { o.castShadow = true; o.receiveShadow = true }
    })

    // 2) place model on ground
    const box = new THREE.Box3().setFromObject(root)
    const minY = box.min.y
    if (isFinite(minY)) root.position.y -= minY

    // 3) detect GLB ground mesh(es) and swap to ShadowMaterial
    const GROUND_NAME_HINTS = ['ground', 'floor', 'plane', 'base']

    root.traverse((o: any) => {
      if (!o?.isMesh) return

      const name = (o.name || '').toLowerCase()
      const matName = (o.material?.name || '').toLowerCase()
      const namedLikeGround =
        GROUND_NAME_HINTS.some(h => name.includes(h)) ||
        GROUND_NAME_HINTS.some(h => matName.includes(h))

      // Heuristic: very flat in Y, reasonably wide in X/Z
      let flatAndWide = false
      if (o.geometry) {
        o.geometry.computeBoundingBox?.()
        const bb = o.geometry.boundingBox
        if (bb) {
          const size = new THREE.Vector3()
          bb.getSize(size)
          // tweak thresholds to match your scale
          flatAndWide = size.y < 0.15 && size.x > 2 && size.z > 2
        }
      }

      if (namedLikeGround || flatAndWide) {
        // Mark so our material pass won’t touch it
        groundMeshUUIDs.current.add(o.uuid)

        // Make it invisible except for shadows
        const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22, transparent: true })
        shadowMat.depthWrite = false
        o.castShadow = false
        o.receiveShadow = true
        o.material = shadowMat
      }
    })
  }, [root])

  // meshName -> partId
  const meshToPart = useMemo(() => {
    const map = new Map<string, string>()
    for (const part of PARTS) for (const n of part.meshNames) map.set(n, part.id)
    return map
  }, [])

  // apply materials to *non-ground* meshes only
  useFrame(() => {
    root.traverse((obj: any) => {
      if (!obj?.isMesh) return
      if (groundMeshUUIDs.current.has(obj.uuid)) return // skip GLB ground

      const partId = meshToPart.get(obj.name)
      if (!partId) return
      const sel = selection[partId]
      if (sel) obj.material = makeMaterial(sel)
    })
  })

  // eased rotation / inertia for both Y (yaw) and X (pitch)
  useFrame((_, dt) => {
    if (!group.current) return

    // Y axis
    const diffY = rotationY - group.current.rotation.y
    const accelY = diffY * 10
    const newVelY = velocityY * 0.9 + accelY * dt
    setVelocityY(newVelY)
    group.current.rotation.y += newVelY * dt

    // X axis
    const diffX = rotationX - group.current.rotation.x
    const accelX = diffX * 10
    const newVelX = velocityX * 0.9 + accelX * dt
    setVelocityX(newVelX)
    group.current.rotation.x += newVelX * dt
  })

  return (
    <group ref={group} position={[0, -1, 0]}>
      <primitive object={root} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)





 






 
