import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { makeMaterial } from '../lib/materials'
import { PARTS } from '../config/parts'
import { TEXTURE_SETS } from '../config/textures'
import { useConfigurator, type ConfigState } from '../state/useConfigurator'

const MODEL_URL = '/models/building_01-2.glb'

export default function Model() {
  const group = useRef<THREE.Group>(null!)

  const rotationY = useConfigurator((s: ConfigState) => s.rotationY)
  const rotationX = useConfigurator((s: ConfigState) => s.rotationX)
  const selection = useConfigurator((s: ConfigState) => s.selection)

  const [velocityY, setVelocityY] = useState(0)
  const [velocityX, setVelocityX] = useState(0)

  const { scene } = useGLTF(MODEL_URL)
  const root = useMemo(() => scene.clone(true), [scene])

  // default selections (first option per part)
  useEffect(() => {
    for (const part of PARTS) {
      if (!selection[part.id]) {
        const first = TEXTURE_SETS[part.id]?.[0]
        if (first) useConfigurator.getState().setSelection(part.id, first)
      }
    }
  }, [selection])

  // ground & shadows
  useEffect(() => {
    root.traverse((o: any) => {
      if (o?.isMesh) { o.castShadow = true; o.receiveShadow = true }
    })
    const box = new THREE.Box3().setFromObject(root)
    const minY = box.min.y
    if (isFinite(minY)) root.position.y -= minY
  }, [root])

  // meshName -> partId
  const meshToPart = useMemo(() => {
    const map = new Map<string, string>()
    for (const part of PARTS) for (const n of part.meshNames) map.set(n, part.id)
    return map
  }, [])

  // apply materials
  useFrame(() => {
    root.traverse((obj: any) => {
      if (!obj?.isMesh) return
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




 






 
