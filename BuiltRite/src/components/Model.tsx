import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { makeMaterial } from '../lib/materials'
import { PARTS } from '../config/parts'
import { TEXTURE_SETS } from '../config/textures'
import { useConfigurator, type ConfigState } from '../state/useConfigurator'

export default function Model() {
  const group = useRef<THREE.Group>(null!)
  const rotationY = useConfigurator((s: ConfigState) => s.rotationY)
  const selection = useConfigurator((s: ConfigState) => s.selection)
  const tiling = useConfigurator((s: ConfigState) => s.tiling)
  const pattern = useConfigurator((s: ConfigState) => s.pattern)

   const [velocity, setVelocity] = useState(0)

  const panels = useMemo(() => {
    const g = new THREE.Group()
    const panelGeo = new THREE.BoxGeometry(0.9, 2, 0.1)
    for (let i = 0; i < 8; i++) {
      const mat = new THREE.MeshStandardMaterial({ color: 'lightgray' })
      const mesh = new THREE.Mesh(panelGeo, mat)
      mesh.name = `Panel_${String(i + 1).padStart(2, '0')}`
      mesh.position.x = -3.15 + i * 0.9
      g.add(mesh)
    }
    const base = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 2), new THREE.MeshStandardMaterial({ color: '#dadada' }))
    base.position.y = -1.05
    g.add(base)
    return g
  }, [])

  useMemo(() => {
    const part = PARTS[0]
    if (!selection[part.id]) {
      const first = TEXTURE_SETS[part.id]?.[0]
      if (first) useConfigurator.getState().setSelection(part.id, first)
    }
    if (tiling[part.id] == null) useConfigurator.getState().setTiling(part.id, 1)
    if (!pattern[part.id]) useConfigurator.getState().setPattern(part.id, 'all')
  }, [selection, tiling, pattern])

  useFrame(() => {
    if (!group.current) return
    const part = PARTS[0]
    const sel = selection[part.id]
    const rep = tiling[part.id] ?? 1
    const mode = pattern[part.id] ?? 'all'

    group.current.traverse((obj: any) => {
      if (!obj.isMesh) return
      if (!obj.name.startsWith('Panel_')) return
      const idx = parseInt(obj.name.slice(-2), 10)
      const allow = mode === 'all' ? true : idx % 2 === 0
      const targetMat = allow && sel ? makeMaterial(sel, rep) : new THREE.MeshStandardMaterial({ color: '#bbb' })
      obj.material = targetMat
    })
  })

  useFrame((_, dt) => {
  if (!group.current) return;
  // Smoothly ease current rotation toward rotationY
  // 6 = smoothing factor (higher = snappier, lower = floatier)
  group.current.rotation.y = THREE.MathUtils.damp(
    group.current.rotation.y,
    rotationY,
    6,
    dt
  );
});


  return (
    <group ref={group}>
      <primitive object={panels} />
    </group>
  )
}
