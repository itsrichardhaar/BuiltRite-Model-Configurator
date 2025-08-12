import { create } from 'zustand'

export type PatternMode = 'all' | 'alternate'

export type ColorChoice = {
  type: 'color'
  name: string
  value: string
}

export type ProceduralChoice = {
  type: 'procedural'
  name: string
  a: string
  b: string
  repeat?: number
}

export type MaterialChoice = ColorChoice | ProceduralChoice

export type ConfigState = {
  selection: Record<string, MaterialChoice | null>
  setSelection: (partId: string, sel: MaterialChoice) => void
  tiling: Record<string, number>
  setTiling: (partId: string, value: number) => void
  pattern: Record<string, PatternMode>
  setPattern: (partId: string, mode: PatternMode) => void
  rotationY: number
  rotateBy: (delta: number) => void
  targetY: number;
  nudge: (delta: number) => void;
}

export const useConfigurator = create<ConfigState>((set) => ({
  selection: {},
  setSelection: (partId, sel) => set((s) => ({ selection: { ...s.selection, [partId]: sel } })),
  tiling: {},
  setTiling: (partId, value) => set((s) => ({ tiling: { ...s.tiling, [partId]: value } })),
  pattern: {},
  setPattern: (partId, mode) => set((s) => ({ pattern: { ...s.pattern, [partId]: mode } })),
  rotationY: 0,
  rotateBy: (delta) => set((s) => ({ rotationY: s.rotationY + delta })),
  targetY: 0,
  nudge: (delta) => set((s) => ({ targetY: s.targetY + delta })),
}))