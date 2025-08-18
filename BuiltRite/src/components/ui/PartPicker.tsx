import { PARTS } from '../../config/parts'
import { TEXTURE_SETS } from '../../config/textures'
import { useConfigurator, type ConfigState } from '../../state/useConfigurator'
import type { MaterialChoice } from '../../state/useConfigurator'

export default function PartPicker() {
  const selection = useConfigurator((s: ConfigState) => s.selection)
  const setSelection = useConfigurator((s: ConfigState) => s.setSelection)

  return (
    <div style={{ padding: 12, background: 'rgba(255,255,255,0.95)', borderRadius: 12, minWidth: 280 }}>
      <strong style={{ display: 'block', marginBottom: 8 }}>Customize</strong>
      {PARTS.map((part) => {
        const options = TEXTURE_SETS[part.id] || []
        return (
          <div key={part.id} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, marginBottom: 6, fontWeight: 600 }}>{part.label}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {options.map((opt, i) => {
                const isSel = eq(selection[part.id], opt)
                const style: React.CSSProperties = {
                  height: 36, width: 36, borderRadius: 8,
                  border: isSel ? '2px solid #111' : '1px solid #d0d0d0',
                  background: opt.type === 'color' ? opt.value : '#c9cdd3',
                  backgroundSize: 'cover',
                }
                // Optional: if you want to show a real PBR preview, uncomment:
                // if (opt.type === 'pbr') style.backgroundImage = `url(${opt.albedo})`

                return (
                  <button
                    key={i}
                    title={(opt as any).name}
                    onClick={() => setSelection(part.id, opt)}
                    style={style}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function eq(a?: MaterialChoice | null, b?: MaterialChoice | null) {
  if (!a || !b) return false
  if (a.type !== b.type) return false
  if (a.type === 'color' && b.type === 'color') return a.value === b.value
  if (a.type === 'pbr' && b.type === 'pbr') return a.name === b.name
  return false
}
