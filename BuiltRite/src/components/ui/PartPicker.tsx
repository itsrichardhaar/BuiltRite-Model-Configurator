import { useMemo, useState } from 'react'
import { PARTS } from '../../config/parts'
import { TEXTURE_SETS } from '../../config/textures'
import { useConfigurator, type ConfigState, type MaterialChoice } from '../../state/useConfigurator'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function PartPicker() {
  const selection = useConfigurator((s: ConfigState) => s.selection)
  const setSelection = useConfigurator((s: ConfigState) => s.setSelection)

  const partsWithOptions = useMemo(
    () => PARTS.filter(p => (TEXTURE_SETS[p.id]?.length ?? 0) > 0),
    []
  )
  const [idx, setIdx] = useState(0)

  if (!partsWithOptions.length) return null

  const part = partsWithOptions[idx]
  const options = TEXTURE_SETS[part.id]!

  const goPrev = () => setIdx(i => (i - 1 + partsWithOptions.length) % partsWithOptions.length)
  const goNext = () => setIdx(i => (i + 1) % partsWithOptions.length)

  return (
    <div
      // Toolbar-style, inline row
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(255,255,255,0.95)',
        padding: '12px 16px',
        borderRadius: 12,
        boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
        maxWidth: 'min(92vw, 1100px)',
        width: '500px',
      }}
    >
      {/* left / index / right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <IconBtn label="Previous part" onClick={goPrev}><ArrowBackIcon fontSize="small" htmlColor="#000" /></IconBtn>
        <span style={{ fontSize: 14, color: '#111' }}>
          {idx + 1}/{partsWithOptions.length}
        </span>
        <IconBtn label="Next part" onClick={goNext}><ArrowForwardIcon fontSize="small" htmlColor="#000" /></IconBtn>
      </div>

      {/* section name */}
      <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.2 }}>
        {part.label}
      </div>

      {/* material swatches */}
      <div style={{ display: 'flex', gap: 10, marginLeft: 'auto', flexWrap: 'nowrap' }}>
        {options.map((opt, i) => {
          const isSel = eq(selection[part.id], opt)
          const style: React.CSSProperties = {
            height: 32,
            width: 32,
            borderRadius: 6,
            border: isSel ? '2px solid #111' : '1px solid #d0d0d0',
            background: opt.type === 'color' ? opt.value : '#c9cdd3',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            outline: 'none',
          }
          if (opt.type === 'pbr') style.backgroundImage = `url(${opt.albedo})`
          return (
            <button
              key={i}
              title={opt.name}
              aria-label={opt.name}
              onClick={() => setSelection(part.id, opt)}
              style={style}
            />
          )
        })}
      </div>
    </div>
  )
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        height: 32,
        width: 32,
        borderRadius: 999,
        border: '1px solid #e2e2e2',
        background: '#fff',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{children}</span>
    </button>
  )
}

function eq(a?: MaterialChoice | null, b?: MaterialChoice | null) {
  if (!a || !b) return false
  if (a.type !== b.type) return false
  if (a.type === 'color' && b.type === 'color') return a.value === b.value
  if (a.type === 'pbr' && b.type === 'pbr') return a.name === b.name
  return false
}



