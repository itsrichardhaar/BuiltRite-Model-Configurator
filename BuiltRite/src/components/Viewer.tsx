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
        camera={{ position: [0, 6, 45], fov: 45 }}
        // Option A: quick — solid background via style
        style={{ background: '#ffffff' }}

        // Option B: precise — set clear color in WebGL (uncomment if you prefer)
        // onCreated={({ gl }) => {
        //   gl.toneMapping = THREE.ACESFilmicToneMapping
        //   gl.outputColorSpace = THREE.SRGBColorSpace
        //   gl.toneMappingExposure = 1.0
        //   gl.setClearColor('#f8f8f4')
        // }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[0, 18, 60]}
          intensity={1}
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

      {/* Top-left image */}
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
        <img
          src="/images/BRSS_logo.png"   // <-- change to your image path
          alt="Logo"
          style={{ height: 40, width: 'auto', display: 'block' }}
        />
      </div>

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






