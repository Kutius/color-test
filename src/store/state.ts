import { z } from 'zod'

// --- Base Schemas and Types ---
export const oklchColorSchema = z.object({
  l: z.number(),
  c: z.number(),
  h: z.number(),
})
export type OklchColor = z.infer<typeof oklchColorSchema>

export const baseHueSchema = z.object({
  id: z.string(),
  name: z.string(),
  h: z.number(),
  c: z.number(),
})
export type BaseHue = z.infer<typeof baseHueSchema>

// --- App State ---
export const appStateSchema = z.object({
  hues: z.array(baseHueSchema),
  activeId: z.string(),
})
export type AppState = z.infer<typeof appStateSchema>

// --- Default State ---
export const defaultState: AppState = {
  hues: [
    { id: 'primary', name: 'Primary', h: 250, c: 0.1 },
    { id: 'neutral', name: 'Neutral', h: 250, c: 0.01 },
    { id: 'success', name: 'Success', h: 145, c: 0.1 },
    { id: 'danger', name: 'Danger', h: 25, c: 0.1 },
  ],
  activeId: 'primary',
}