import { formatHex } from 'culori'
import { useMemo, useState } from 'react'
import { useStore } from '../store'
import { useComputedScales } from '../store/selectors'
import { CodeExport } from './CodeExport'
import { UIPreview } from './UIPreview'

export function OklchPlayground() {
  const { activeId, hues, actions } = useStore()
  const allScales = useComputedScales()
  const [activeTab, setActiveTab] = useState('preview')

  const activeHue = useMemo(() => hues.find(hue => hue.id === activeId)!, [hues, activeId])
  const activeScale = useMemo(() => allScales.find(s => s.name === activeHue.name)!.scale, [allScales, activeHue])

  return (
    <div className="space-y-8">
      {/* --- Controls --- */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-text-primary">Controls</h2>
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
            <label htmlFor="hue-c" className="flex justify-between text-xs font-medium text-text-secondary">
              <span>{`${activeHue.name} Chroma`}</span>
              <span>{activeHue.c.toFixed(3)}</span>
            </label>
            <input id="hue-c" type="range" min="0" max="0.2" step="0.005" value={activeHue.c} onChange={e => actions.setHueChroma(Number.parseFloat(e.target.value))} />
          </div>
        </div>
      </section>

      {/* --- Color Scale Display --- */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-text-primary">
          {`Scale: ${activeHue.name}`}
        </h2>
        <div className="card p-4">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-4">
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
        </div>
      </section>

      {/* --- Workbench Area --- */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-text-primary">Workbench</h2>
        <div className="card">
          <div className="flex border-b border-border-primary">
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
          <div className="p-6">
            {activeTab === 'preview' && <UIPreview />}
            {activeTab === 'export' && <CodeExport />}
          </div>
        </div>
      </section>
    </div>
  )
}
