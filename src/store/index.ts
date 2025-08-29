import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import type { AppState, BaseHue } from './state'
import { defaultState } from './state'

// --- Store Actions ---
interface Actions {
  setAppState: (state: AppState) => void
  setActiveHueId: (id: string) => void
  setHueValue: (h: number) => void
  setHueChroma: (c: number) => void
}

// --- Store Definition ---
export const useStore = create<AppState & { actions: Actions }>()(
  persist(
    immer((set) => ({
      ...defaultState,
      actions: {
        setAppState: (state) => set(state),
        setActiveHueId: (id) => set({ activeId: id }),
        setHueValue: (h) =>
          set((state) => {
            const activeHue = state.hues.find(hue => hue.id === state.activeId)
            if (activeHue)
              activeHue.h = h
          }),
        setHueChroma: (c) =>
          set((state) => {
            const activeHue = state.hues.find(hue => hue.id === state.activeId)
            if (activeHue)
              activeHue.c = c
          }),
      },
    })),
    {
      name: 'color-lab-storage',
      partialize: (state) => ({
        hues: state.hues,
      }),
      // --- Custom merge function to handle state migration ---
      merge: (persistedState, currentState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return currentState
        }

        const migratedHues = (persistedState as AppState).hues.map((hue: BaseHue) => {
          if (typeof hue.c === 'undefined') {
            // If 'c' is missing, provide a default value.
            return { ...hue, c: hue.id === 'neutral' ? 0.01 : 0.1 }
          }
          return hue
        })

        return {
          ...currentState,
          ...persistedState,
          hues: migratedHues,
        }
      },
    },
  ),
)
