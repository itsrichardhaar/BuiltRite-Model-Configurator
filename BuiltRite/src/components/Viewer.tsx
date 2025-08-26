// src/components/Viewer.tsx
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'
import RotateControls from './ui/RotationControls'
import PartPicker from './ui/PartPicker'

export default function Viewer() {
  // ---- "Sun" direction knobs ----
  const AZIMUTH_DEG = 35;   // 0 = +X, 90 = +Z
  const ELEVATION_DEG = 60; // 0 = horizon, 90 = straight down
  const DIST = 100;

  // Convert spherical → Cartesian
  const phi = THREE.MathUtils.degToRad(90 - ELEVATION_DEG);
  const theta = THREE.MathUtils.degToRad(AZIMUTH_DEG);
  const lx = DIST * Math.sin(phi) * Math.cos(theta);
  const ly = DIST * Math.cos(phi);
  const lz = DIST * Math.sin(phi) * Math.sin(theta);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        shadows
        camera={{ position: [0, 6, 45], fov: 45 }}
        style={{ background: '#f2f2f3' }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
          // If shimmer persists, try VSM (uncomment):
          // gl.shadowMap.type = THREE.VSMShadowMap
        }}
      >
        {/* Softer ambient to keep contrast in shadows */}
        <ambientLight intensity={0.7} />

        {/* Key directional light (casts shadow) */}
        <directionalLight
          position={[lx, ly, lz]}
          target-position={[0, 0, 0]}
          intensity={1.25}
          castShadow

          // High-res shadow map
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}

          // Tighter orthographic shadow camera around the model
          shadow-camera-near={10}
          shadow-camera-far={160}
          shadow-camera-left={-35}
          shadow-camera-right={35}
          shadow-camera-top={35}
          shadow-camera-bottom={-35}

          // Bias tuning (gentle values reduce shimmer without floating shadows)
          shadow-bias={-0.00015}
          shadow-normalBias={0.02}

          // Small kernel blur for PCF
          shadow-radius={2}
        />

        {/* If you want a non-shadowing fill: */}
        {/* <directionalLight position={[0, 18, 60]} intensity={0.5} castShadow={false} /> */}

        <Model />

        <OrbitControls
          enablePan={false}
          minDistance={30}
          maxDistance={124}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* UI overlays unchanged */}
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
        <img src="/images/BRSS_logo.png" alt="Logo" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: '10%', bottom: 16, transform: 'translateX(-50%)' }}>
        <RotateControls />
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)' }}>
        <PartPicker />
      </div>
    </div>
  )
}








