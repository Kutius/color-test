import { useMemo } from 'react'
import { useStore } from '../store'
import { useComputedScales } from '../store/selectors'
import type { OklchColor } from '../store/state'

// --- Types ---
type ColorScale = Record<string, OklchColor>

export function UIPreview() {
  const allScales = useComputedScales()
  const primaryHueName = useStore(state => state.hues.find(h => h.id === 'primary')?.name || 'Primary')

  const scales = useMemo(() => {
    return allScales.reduce((acc, { name, scale }) => ({ ...acc, [name]: scale }), {} as Record<string, ColorScale>)
  }, [allScales])

  const cssVariables = useMemo(() => {
    const vars: Record<string, string> = {}
    const primaryName = primaryHueName.toLowerCase()

    for (const [name, scale] of Object.entries(scales)) {
      for (const [key, color] of Object.entries(scale)) {
        vars[`--color-${name.toLowerCase()}-${key}`] = `oklch(${color.l} ${color.c} ${color.h})`
      }
    }

    // Generate semantic variables
    vars['--primary'] = `var(--color-${primaryName}-500)`
    vars['--primary-hover'] = `var(--color-${primaryName}-600)`
    vars['--primary-text'] = `var(--color-${primaryName}-50)`
    vars['--secondary-bg'] = `var(--color-neutral-800)`
    vars['--secondary-hover'] = `var(--color-neutral-700)`
    vars['--secondary-text'] = `var(--color-neutral-100)`
    vars['--surface'] = `var(--color-neutral-900)`
    vars['--on-surface-text'] = `var(--color-neutral-100)`
    vars['--on-surface-text-secondary'] = `var(--color-neutral-300)`
    vars['--link'] = `var(--color-${primaryName}-400)`
    vars['--success-bg'] = `var(--color-success-500)`
    vars['--success-text'] = `var(--color-success-100)`
    vars['--danger-bg'] = `var(--color-danger-500)`
    vars['--danger-text'] = `var(--color-danger-100)`

    return vars
  }, [scales, primaryHueName])

  return (
    <div className="card p-6" style={cssVariables as React.CSSProperties}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Buttons and Alerts */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">Buttons</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <button type="button" className="px-4 py-2 rounded-lg font-semibold text-[var(--primary-text)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors">Primary</button>
            <button type="button" className="px-4 py-2 rounded-lg font-semibold text-[var(--secondary-text)] bg-[var(--secondary-bg)] hover:bg-[var(--secondary-hover)] transition-colors">Secondary</button>
            <button type="button" className="px-4 py-2 rounded-lg font-semibold text-[var(--link)] ring-1 ring-[var(--link)] hover:bg-[var(--link)]/10 transition-colors">Outline</button>
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--success-bg)]/10 border border-[var(--success-bg)]/20">
              <p className="font-bold text-[var(--success-text)]">Success</p>
              <p className="text-[var(--success-text)]/80">Your operation was completed successfully.</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--danger-bg)]/10 border border-[var(--danger-bg)]/20">
              <p className="font-bold text-[var(--danger-text)]">Danger</p>
              <p className="text-[var(--danger-text)]/80">There was an error with your request.</p>
            </div>
          </div>
        </div>

        {/* Column 2: Card and Text */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">Card</h3>
          <div className="p-6 rounded-lg bg-[var(--surface)] shadow">
            <h4 className="text-xl font-bold text-[var(--on-surface-text)]">Card Title</h4>
            <p className="mt-2 text-[var(--on-surface-text-secondary)]">
              This is a sample card component to demonstrate how content containers would look with the current color scheme.
            </p>
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Typography</h3>
          <div className="space-y-2 text-[var(--on-surface-text-secondary)]">
            <p>
              This is a paragraph of text.
              <a href="#" className="text-[var(--link)] hover:underline">This is a link.</a>
            </p>
            <p className="text-sm text-slate-400">This is a smaller, secondary text.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
