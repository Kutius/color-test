import { clampChroma } from 'culori'
import { useMemo } from 'react'
import { z } from 'zod'
import { create } from 'zustand'

const oklchColorSchema = z.object({
  l: z.number(),
  c: z.number(),
  h: z.number(),
})
export type OklchColor = z.infer<typeof oklchColorSchema>

const baseHueSchema = z.object({
  id: z.string(),
  name: z.string(),
  h: z.number(),
})
type BaseHue = z.infer<typeof baseHueSchema>

const appStateSchema = z.object({
  hues: z.array(baseHueSchema),
  globalChroma: z.number(),
  activeId: z.string(),
})
type AppState = z.infer<typeof appStateSchema>

interface StoreState extends AppState {
  actions: {
    setAppState: (state: AppState) => void
    setActiveHueId: (id: string) => void
    setGlobalChroma: (chroma: number) => void
    setHueValue: (h: number) => void
  }
}

const defaultPrimaryHue = { id: 'primary', name: 'Primary', h: 250 }
const defaultNeutralHue = { id: 'neutral', name: 'Neutral', h: 250 }

export const defaultState: AppState = {
  hues: [
    defaultPrimaryHue,
    defaultNeutralHue,
    { id: 'success', name: 'Success', h: 145 },
    { id: 'danger', name: 'Danger', h: 25 },
  ],
  globalChroma: 0.1,
  activeId: 'primary',
}

export const useStore = create<StoreState>(set => ({
  ...defaultState,
  actions: {
    setAppState: state => set(state),
    setActiveHueId: id => set({ activeId: id }),
    setGlobalChroma: chroma => set({ globalChroma: chroma }),
    setHueValue: h => set(state => ({
      hues: state.hues.map(hue =>
        hue.id === state.activeId ? { ...hue, h } : hue,
      ),
    })),
  },
}))

// --- Selectors / Computed State ---

function generateScale(h: number, c: number): Record<string, OklchColor> {
  const scale: Record<string, OklchColor> = {}
  const lightnessScale = [0.97, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
  const scaleKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  for (let i = 0; i < lightnessScale.length; i++) {
    const l = lightnessScale[i]
    const initialColor = { mode: 'oklch', l, c, h }
    const gamutMappedColor = clampChroma(initialColor, 'rgb')
    scale[scaleKeys[i]] = { l: gamutMappedColor.l, c: gamutMappedColor.c, h: gamutMappedColor.h }
  }
  return scale
};

export function useComputedScales() {
  const { hues, globalChroma } = useStore()
  return useMemo(() => {
    return hues.map(hue => ({
      name: hue.name,
      scale: generateScale(hue.h, hue.id === 'neutral' ? globalChroma / 10 : globalChroma),
    }))
  }, [hues, globalChroma])
}
