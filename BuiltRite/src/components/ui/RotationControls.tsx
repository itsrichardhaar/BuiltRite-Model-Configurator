import { useEffect } from 'react'
import { useConfigurator, type ConfigState } from '../../state/useConfigurator'

export default function RotateControls() {
  const rotateBy = useConfigurator((s: ConfigState) => s.rotateBy)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') rotateBy(-Math.PI / 12)
      if (e.key === 'ArrowRight') rotateBy(Math.PI / 12)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [rotateBy])

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={() => rotateBy(-Math.PI / 8)} title="Rotate Left">◀</button>
      <span style={{ fontSize: 12, color: '#000' }}>Rotate</span>
      <button onClick={() => rotateBy(Math.PI / 8)} title="Rotate Right">▶</button>
    </div>
  )
}