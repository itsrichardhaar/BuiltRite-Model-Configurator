// src/components/Viewer.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'
import RotateControls from './ui/RotationControls'
import PartPicker from './ui/PartPicker'

export default function Viewer() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        shadows
        camera={{ position: [0, 6, 60], fov: 45 }}
        // Option A: quick — solid background via style
        style={{ background: '#f8f8f4' }}

        // Option B: precise — set clear color in WebGL (uncomment if you prefer)
        // onCreated={({ gl }) => {
        //   gl.toneMapping = THREE.ACESFilmicToneMapping
        //   gl.outputColorSpace = THREE.SRGBColorSpace
        //   gl.toneMappingExposure = 1.0
        //   gl.setClearColor('#f8f8f4')
        // }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={0.9}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Model />

        <OrbitControls
          enablePan={false}
          minDistance={30}   // keep your values
          maxDistance={124}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Bottom-centered rotation controls */}
      {/* Bottom-centered rotation controls (nudged up so it doesn't overlap the picker) */}
      <div style={{ position: 'absolute', left: '10%', bottom: 16, transform: 'translateX(-50%)' }}>
        <RotateControls />
      </div>

      {/* Bottom-centered PartPicker toolbar */}
      <div style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)' }}>
        <PartPicker />
      </div>
    </div>
  )
}






