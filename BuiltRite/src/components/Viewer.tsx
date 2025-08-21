// src/components/Viewer.tsx
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'
import RotateControls from './ui/RotationControls'
import PartPicker from './ui/PartPicker'

export default function Viewer() {
  // ---- tweak these like "rotation" knobs ----
  const AZIMUTH_DEG = 35;   // 0 = +X (right), 90 = +Z (front), 180 = -X, 270 = -Z
  const ELEVATION_DEG = 60; // 0 = horizon, 90 = straight down (1:1 shadow scale)
  const DIST = 100;         // distance from origin (any value; direction is what matters)

  // Convert spherical → Cartesian
  const phi = THREE.MathUtils.degToRad(90 - ELEVATION_DEG); // polar
  const theta = THREE.MathUtils.degToRad(AZIMUTH_DEG);      // azimuth
  const lx = DIST * Math.sin(phi) * Math.cos(theta)
  const ly = DIST * Math.cos(phi)
  const lz = DIST * Math.sin(phi) * Math.sin(theta)

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        shadows
        camera={{ position: [0, 6, 45], fov: 45 }}
        style={{ background: '#f2f2f3' }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <ambientLight intensity={1} />

        {/* Key light "rotated" by azimuth/elevation */}
        <directionalLight
          position={[lx, ly, lz]}
          // aim at the model origin
          target-position={[0, 0, 0]}     // <— three-fiber sugar to set light.target.position
          intensity={1.25}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-near={1}
          shadow-camera-far={200}
          shadow-camera-left={-80}
          shadow-camera-right={80}
          shadow-camera-top={80}
          shadow-camera-bottom={-80}
          shadow-bias={-0.0005}
          shadow-normalBias={0.03}
        />

        {/* Optional fill that doesn’t affect shadow size */}
        {/* <directionalLight position={[0, 18, 60]} intensity={0.6} castShadow={false} /> */}
        {/* Ground with horizon fade */}
{/* Ground with horizon fade (robust version) */}
        <Model />

        <OrbitControls enablePan={false} minDistance={30} maxDistance={124} target={[0, 0, 0]} />
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







