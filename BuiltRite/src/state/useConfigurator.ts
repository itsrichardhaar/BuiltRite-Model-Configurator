import { create } from 'zustand'

export type ColorChoice = {
  type: 'color'
  name: string
  value: string // hex color
}

export type PBRChoice = {
  type: 'pbr'
  name: string
  albedo?: string
  normal?: string
  roughness?: string
  ao?: string
  metalnessMap?: string
  // --- optional per-texture overrides ---
  params?: {
    roughness?: number                // 0..1 (multiplies roughnessMap if present)
    metalness?: number                // 0..1 (multiplies metalnessMap if used)
    normalScale?: number | [number, number]
    aoIntensity?: number              // default 1.0
    displacementScale?: number        // if you ever use displacementMap
    displacementBias?: number
    envMapIntensity?: number
    repeat?: [number, number]         // apply same tiling across all maps
    offset?: [number, number]         // apply same offset across all maps
    rotation?: number                 // radians, if you need it
  }
}

export type MaterialChoice = ColorChoice | PBRChoice

export type ConfigState = {
  selection: Record<string, MaterialChoice | null>
  setSelection: (partId: string, sel: MaterialChoice) => void

  rotationY: number
  rotateBy: (delta: number) => void

  rotationX: number
  rotateXBy: (delta: number) => void
}

export const useConfigurator = create<ConfigState>((set) => ({
  selection: {},
  setSelection: (partId, sel) =>
    set((s) => ({ selection: { ...s.selection, [partId]: sel } })),

  rotationY: 0,
  rotateBy: (delta) => set((s) => ({ rotationY: s.rotationY + delta })),

  rotationX: 0,
  rotateXBy: (delta) =>
    set((s) => {
      // Clamp pitch to avoid flipping the model in Orbit-style UX
      const MAX_PITCH = Math.PI / 2.5; // ~72°
      const next = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, s.rotationX + delta))
      return { rotationX: next }
    }),
}))





