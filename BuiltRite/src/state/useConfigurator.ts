import { create } from 'zustand'

export type ColorChoice = {
  type: 'color'
  name: string
  value: string // hex color
}

export type PBRChoice = {
  type: 'pbr'
  name: string
  albedo: string
  normal?: string
  roughness?: string
  ao?: string
  // optional tiling later: repeat?: number
}

export type MaterialChoice = ColorChoice | PBRChoice

export type ConfigState = {
  selection: Record<string, MaterialChoice | null>
  setSelection: (partId: string, sel: MaterialChoice) => void

  rotationY: number
  rotateBy: (delta: number) => void
}

export const useConfigurator = create<ConfigState>((set) => ({
  selection: {},
  setSelection: (partId, sel) =>
    set((s) => ({ selection: { ...s.selection, [partId]: sel } })),

  rotationY: 0,
  rotateBy: (delta) => set((s) => ({ rotationY: s.rotationY + delta })),
}))

