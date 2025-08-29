import { clampChroma } from 'culori'
import { useMemo } from 'react'
import { useStore } from './index'
import type { OklchColor } from './state'

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
}

export function useComputedScales() {
  const { hues } = useStore()
  return useMemo(() => {
    return hues.map(hue => ({
      name: hue.name,
      scale: generateScale(hue.h, hue.c),
    }))
  }, [hues])
}
