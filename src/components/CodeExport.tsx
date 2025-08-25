import { useMemo, useState } from 'react'
import { useComputedScales } from '../store'

// --- Types ---
interface OklchColor { l: number, c: number, h: number }
type ColorScale = Record<string, OklchColor>

function formatCss(scales: { name: string, scale: ColorScale }[]) {
  let output = ':root {\n'
  for (const { name, scale } of scales) {
    for (const [key, color] of Object.entries(scale)) {
      output += `  --color-${name.toLowerCase()}-${key}: oklch(${color.l} ${color.c} ${color.h});\n`
    }
  }
  output += '}'
  return output
}

function formatJson(scales: { name: string, scale: ColorScale }[]) {
  const output: Record<string, Record<string, string>> = {}
  for (const { name, scale } of scales) {
    output[name.toLowerCase()] = {}
    for (const [key, color] of Object.entries(scale)) {
      output[name.toLowerCase()][key] = `oklch(${color.l} ${color.c} ${color.h})`
    }
  }
  return JSON.stringify(output, null, 2)
}

function formatTailwind(scales: { name: string, scale: ColorScale }[]) {
  const colors: Record<string, Record<string, string>> = {}
  for (const { name, scale } of scales) {
    colors[name.toLowerCase()] = {}
    for (const [key, oklch] of Object.entries(scale)) {
      colors[name.toLowerCase()][key] = `oklch(${oklch.l} ${oklch.c} ${oklch.h})`
    }
  }

  const config = {
    theme: {
      extend: {
        colors,
      },
    },
  }

  return `// tailwind.config.js\nmodule.exports = ${JSON.stringify(config, null, 2)};`
}

export function CodeExport() {
  const allScales = useComputedScales()
  const [format, setFormat] = useState('css')

  const code = useMemo(() => {
    if (format === 'css')
      return formatCss(allScales)
    if (format === 'json')
      return formatJson(allScales)
    if (format === 'tailwind')
      return formatTailwind(allScales)
    return ''
  }, [allScales, format])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="relative">
      <div className="flex gap-1 mb-2">
        <button type="button" onClick={() => setFormat('css')} className={`px-3 py-1 text-xs rounded-md ${format === 'css' ? 'bg-accent text-white' : 'bg-app-bg-inset'}`}>CSS</button>
        <button type="button" onClick={() => setFormat('json')} className={`px-3 py-1 text-xs rounded-md ${format === 'json' ? 'bg-accent text-white' : 'bg-app-bg-inset'}`}>JSON</button>
        <button type="button" onClick={() => setFormat('tailwind')} className={`px-3 py-1 text-xs rounded-md ${format === 'tailwind' ? 'bg-accent text-white' : 'bg-app-bg-inset'}`}>Tailwind</button>
      </div>
      <pre className="p-4 rounded-md bg-app-bg border border-border-secondary text-xs text-text-secondary overflow-auto h-64">
        {code}
      </pre>
      <button type="button" onClick={copyToClipboard} className="absolute top-10 right-3 p-1 text-xs rounded-md bg-border-primary hover:bg-border-secondary">Copy</button>
    </div>
  )
}
