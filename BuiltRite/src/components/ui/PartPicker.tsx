import { useState } from 'react'
import { PARTS } from '../../config/parts'
import { TEXTURE_SETS } from '../../config/textures'
import { useConfigurator, type MaterialChoice, type ConfigState } from '../../state/useConfigurator'

export default function PartPicker() {
  const selection = useConfigurator((s: ConfigState) => s.selection)
  const setSelection = useConfigurator((s: ConfigState) => s.setSelection)
  const tiling = useConfigurator((s: ConfigState) => s.tiling)
  const setTiling = useConfigurator((s: ConfigState) => s.setTiling)
  const pattern = useConfigurator((s: ConfigState) => s.pattern)
  const setPattern = useConfigurator((s: ConfigState) => s.setPattern)

  const [open, setOpen] = useState(true)

  return (
    <div style={{ padding: 12, color: 'rgba(0,0,0,0.9)', background: 'rgba(255,255,255,0.9)', borderRadius: 12, minWidth: 260 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong>Customize</strong>
        <button onClick={() => setOpen((v) => !v)}>{open ? '–' : '+'}</button>
      </div>
      {open && PARTS.map((part) => (
        <div key={part.id} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, marginBottom: 6 }}>{part.label}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(TEXTURE_SETS[part.id] || []).map((opt, i) => {
              const isSel = eqChoice(selection[part.id], opt)
              return (
                <button
                  key={i}
                  onClick={() => setSelection(part.id, opt)}
                  title={(opt as any).name}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 10,
                    border: isSel ? '2px solid black' : '1px solid #d0d0d0',
                    overflow: 'hidden',
                    background: previewColor(opt),
                  }}
                />
              )
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 12 }}>Tiling</span>
            <input
              type="range"
              min={0.5}
              max={4}
              step={0.5}
              value={tiling[part.id] ?? 1}
              onChange={(e) => setTiling(part.id, parseFloat(e.target.value))}
            />
            <span style={{ fontSize: 12, width: 24, textAlign: 'right' }}>{tiling[part.id] ?? 1}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 12 }}>Pattern</span>
            <button
              onClick={() => setPattern(part.id, (pattern[part.id] ?? 'all') === 'all' ? 'alternate' : 'all')}
              style={{ border: '1px solid #d0d0d0', borderRadius: 8, padding: '4px 8px', background: '#fff' }}
            >
              {(pattern[part.id] ?? 'all') === 'all' ? 'All panels' : 'Alternate (even)'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function previewColor(opt: MaterialChoice): string {
  if (opt.type === 'color') return opt.value
  return opt.a
}

function eqChoice(a?: MaterialChoice | null, b?: MaterialChoice | null) {
  if (!a || !b) return false
  if (a.type !== b.type) return false
  if (a.type === 'color' && b.type === 'color') return a.value === b.value
  if (a.type === 'procedural' && b.type === 'procedural') return a.name === b.name
  return false
}