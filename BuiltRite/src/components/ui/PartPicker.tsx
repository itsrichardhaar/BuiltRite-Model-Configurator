import { useMemo, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { PARTS } from '../../config/parts'
import { TEXTURE_SETS } from '../../config/textures'
import { useConfigurator, type ConfigState, type MaterialChoice } from '../../state/useConfigurator'

type Cat = 'Color' | 'Masonry' | 'Metal' | 'Stone' | 'Stucco'
const ALL_CATS: Cat[] = ['Color', 'Masonry', 'Stone', 'Stucco', 'Metal']

// Prefer this order if those ids exist in PARTS
const PREFERRED_PART_ORDER = [
  'walls',
  'base',
  'top_trim',
  'metal_panels',
  'awning',
  'garrage_doors'
]

export default function PartPicker() {
  const selection = useConfigurator((s: ConfigState) => s.selection)
  const setSelection = useConfigurator((s: ConfigState) => s.setSelection)

  // Build the list of parts that have texture options, honoring our preferred order first
  const partsWithOptions = useMemo(() => {
    const hasOpts = (id: string) => (TEXTURE_SETS[id]?.length ?? 0) > 0
    const byId = new Map(PARTS.map(p => [p.id, p]))
    const ordered: typeof PARTS = []

    // Add preferred ids that exist AND have options
    for (const id of PREFERRED_PART_ORDER) {
      const p = byId.get(id)
      if (p && hasOpts(p.id)) ordered.push(p)
    }
    // Add any remaining parts with options that weren’t in preferred order
    for (const p of PARTS) {
      if (!ordered.find(o => o.id === p.id) && hasOpts(p.id)) ordered.push(p)
    }
    return ordered
  }, [])

  const [idx, setIdx] = useState(0)
  const [activeTabByPart, setActiveTabByPart] = useState<Record<string, Cat>>({})

  if (!partsWithOptions.length) return null

  const part = partsWithOptions[Math.min(idx, partsWithOptions.length - 1)]
  const options = TEXTURE_SETS[part.id]!

  const availableCats = getAvailableCats(options)
  const defaultCat: Cat = availableCats[0] ?? 'Brick'
  const activeCat: Cat = activeTabByPart[part.id] ?? defaultCat

  const filtered = options.filter(opt => inferCategory(opt) === activeCat)
  const shownOptions = filtered.length ? filtered : options // fallback so UI never empties

  const setTab = (cat: Cat) =>
    setActiveTabByPart(prev => ({ ...prev, [part.id]: cat }))

  const goPrev = () => setIdx(i => (i - 1 + partsWithOptions.length) % partsWithOptions.length)
  const goNext = () => setIdx(i => (i + 1) % partsWithOptions.length)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(255,255,255,0.95)',
        padding: '12px 16px',
        borderRadius: 12,
        boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
        maxWidth: 'min(92vw, 1100px)',
        width: 900,
      }}
    >
      {/* Part switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 32 }}>
        <IconBtn label="Previous part" onClick={goPrev}>
          <ArrowBackIcon fontSize="small" htmlColor="#000" />
        </IconBtn>

        <span
          style={{
            fontSize: 14,
            color: '#111',
            display: 'inline-flex',
            alignItems: 'center',
            height: 32,
            lineHeight: 1,
          }}
        >
          {idx + 1}/{partsWithOptions.length}
        </span>

        <IconBtn label="Next part" onClick={goNext}>
          <ArrowForwardIcon fontSize="small" htmlColor="#000" />
        </IconBtn>
      </div>

      {/* Part label */}
      <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: 0.2 }}>
        {part.label}
      </div>

      {/* Options panel: tabs ABOVE swatches */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginLeft: 'auto',
          alignItems: 'flex-start',
          minWidth: 280,
          maxWidth: 620,
        }}
      >
        {/* Tabs row */}
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          {availableCats.map(cat => (
            <TabBtn
              key={cat}
              active={activeCat === cat}
              onClick={() => setTab(cat)}
            >
              {cat}
            </TabBtn>
          ))}
        </div>

        {/* Swatches row */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            width: '100%',
            overflowX: 'auto',
            paddingTop: 2,
          }}
        >
          {shownOptions.map((opt, i) => {
            const isSel = eq(selection[part.id], opt)
            const style: React.CSSProperties = {
              height: 32,
              width: 32,
              borderRadius: 0, // square like bricks/tiles
              border: isSel ? '2px solid #111' : '1px solid #d0d0d0',
              background: opt.type === 'color' ? opt.value : '#c9cdd3',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              outline: 'none',
              cursor: 'pointer',
              flex: '0 0 auto',
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
          {!shownOptions.length && (
            <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>
              No textures in {activeCat}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- UI bits ---------- */
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
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#000',
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  )
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 32,
        padding: '0 12px',
        borderRadius: 999,
        border: active ? '1px solid #111' : '1px solid #e2e2e2',
        background: active ? '#fff' : '#f4f4f4',
        color: '#000',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

/* ---------- Helpers ---------- */
function eq(a?: MaterialChoice | null, b?: MaterialChoice | null) {
  if (!a || !b) return false
  if (a.type !== b.type) return false
  if (a.type === 'color' && b.type === 'color') return a.value === b.value
  if (a.type === 'pbr' && b.type === 'pbr') return a.name === b.name
  return false
}

function inferCategory(opt: MaterialChoice): Cat | null {
  if (opt.type === 'color') return 'Color'

  const text = [
    opt.type === 'pbr' ? opt.albedo : '',
    opt.type === 'pbr' ? opt.normal ?? '' : '',
    opt.type === 'pbr' ? opt.roughness ?? '' : '',
    opt.type === 'pbr' ? opt.ao ?? '' : '',
    (opt as any).name ?? '',
  ]
    .join(' ')
    .toLowerCase()

  const has = (s: string) => text.includes(s)
  const inFolder = (folder: string) =>
    text.includes(`/${folder}/`) || text.includes(`\\${folder}\\`)

  if (inFolder('brick') || has(' brick')) return 'Masonry'

  if (
    inFolder('metal') ||
    has(' metal') ||
    has('aluminum') ||
    has('steel') ||
    has('galvalume') ||
    has('corten') ||
    has('copper') ||
    has('zinc')
  ) return 'Metal'

  if (
    inFolder('stone') ||
    has(' stone') ||
    has('limestone') ||
    has('granite') ||
    has('marble') ||
    has('sandstone')
  ) return 'Stone'

  if (
    inFolder('stucco') ||
    has('stucco') ||
    has('render') ||
    has('plaster')
  ) return 'Stucco'

  if (
    inFolder('masonry') ||
    has('masonry') ||
    has('brick') ||
    has('concrete') ||   // move concrete here
    has('cement') ||
    has('cmu') ||
    has('block')
  ) return 'Masonry'

  return null
}


function getAvailableCats(options: MaterialChoice[]): Cat[] {
  const present = new Set<Cat>()
  for (const o of options) {
    const c = inferCategory(o)
    if (c) present.add(c)
  }
  return ALL_CATS.filter(c => present.has(c))
}






