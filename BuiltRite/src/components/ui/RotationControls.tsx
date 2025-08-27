import { useEffect } from 'react'
import { useConfigurator, type ConfigState } from '../../state/useConfigurator'

export default function RotateControls() {
  const rotateBy = useConfigurator((s: ConfigState) => s.rotateBy)
  const rotateXBy = useConfigurator((s: ConfigState) => s.rotateXBy) 

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') rotateBy(-Math.PI / 12)
      if (e.key === 'ArrowRight') rotateBy(Math.PI / 12)
      if (e.key === 'ArrowUp') rotateXBy(Math.PI / 12)
      if (e.key === 'ArrowDown') rotateXBy(-Math.PI / 12)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [rotateBy, rotateXBy])

  return (
    <div style={{ display: 'none', gap: 8, alignItems: 'center', flexDirection: 'column' }}>
      {/* Vertical controls */}
      <button onClick={() => rotateXBy(Math.PI / 8)} title="Rotate Up">▲</button>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {/* Horizontal controls */}
        <button onClick={() => rotateBy(-Math.PI / 8)} title="Rotate Left">◀</button>
        <span style={{ fontSize: 12, color: '#000' }}>Rotate</span>
        <button onClick={() => rotateBy(Math.PI / 8)} title="Rotate Right">▶</button>
      </div>
      <button onClick={() => rotateXBy(-Math.PI / 8)} title="Rotate Down">▼</button>
    </div>
  )
}

