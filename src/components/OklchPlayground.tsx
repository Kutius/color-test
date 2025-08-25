import { formatHex } from 'culori'
import { useMemo, useState } from 'react'
import { useComputedScales, useStore } from '../store'
import { CodeExport } from './CodeExport'
import { UIPreview } from './UIPreview'

export function OklchPlayground() {
  const { activeId, hues, globalChroma, actions } = useStore()
  const allScales = useComputedScales()
  const [activeTab, setActiveTab] = useState('preview')

  const activeHue = useMemo(() => hues.find(hue => hue.id === activeId)!, [hues, activeId])
  const activeScale = useMemo(() => allScales.find(s => s.name === activeHue.name)!.scale, [allScales, activeHue])

  return (
    <>
      <div className="space-y-10">
        {/* --- Top Controls --- */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {hues.map(hue => (
              <button
                key={hue.id}
                type="button"
                onClick={() => actions.setActiveHueId(hue.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors text-sm ${activeId === hue.id ? 'bg-accent text-white' : 'bg-app-bg-inset text-text-secondary hover:bg-border-primary'}`}
              >
                {hue.name}
              </button>
            ))}
          </div>
          <div className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="h" className="flex justify-between text-xs font-medium text-text-secondary">
                <span>
                  {`${activeHue.name} Hue`}
                </span>
                <span>{activeHue.h.toFixed(0)}</span>
              </label>
              <input id="h" type="range" min="0" max="360" step="1" value={activeHue.h} onChange={e => actions.setHueValue(Number.parseFloat(e.target.value))} />
            </div>
            <div>
              <label htmlFor="c" className="flex justify-between text-xs font-medium text-text-secondary">
                <span>Global Chroma</span>
                <span>{globalChroma.toFixed(3)}</span>
              </label>
              <input id="c" type="range" min="0" max="0.2" step="0.005" value={globalChroma} onChange={e => actions.setGlobalChroma(Number.parseFloat(e.target.value))} />
            </div>
          </div>
        </header>

        {/* --- Color Scale Display --- */}
        <main>
          <div className="grid grid-cols-10 gap-x-2 gap-y-4">
            {Object.entries(activeScale).map(([key, color]) => {
              const colorStr = `oklch(${color.l} ${color.c} ${color.h})`
              return (
                <div key={key} className="space-y-1.5 text-center">
                  <div className="w-full h-20 rounded-md border border-border-primary" style={{ backgroundColor: colorStr }} />
                  <div className="text-xs font-bold text-text-primary">{key}</div>
                  <div className="text-xs text-text-secondary font-mono">{formatHex(colorStr)}</div>
                </div>
              )
            })}
          </div>
        </main>

        {/* --- Workbench Area --- */}
        <section className="mt-12">
          <div className="flex border-b border-border-primary mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-semibold ${activeTab === 'preview' ? 'text-text-primary border-b-2 border-accent' : 'text-text-secondary'}`}
            >
              UI Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 text-sm font-semibold ${activeTab === 'export' ? 'text-text-primary border-b-2 border-accent' : 'text-text-secondary'}`}
            >
              Export
            </button>
          </div>
          <div className="card p-6">
            {activeTab === 'preview' && <UIPreview />}
            {activeTab === 'export' && <CodeExport />}
          </div>
        </section>
      </div>
    </>
  )
}
