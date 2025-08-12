import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'
import RotateControls from './ui/RotationControls'
import PartPicker from './ui/PartPicker'

export default function Viewer() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, 1.2, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight intensity={0.9} position={[2, 4, 2]} />
        <Model />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
      </Canvas>
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <RotateControls />
      </div>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <PartPicker />
      </div>
    </div>
  )
}