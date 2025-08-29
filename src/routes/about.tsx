import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-text-primary">
        A Modern Tool for Oklch Color Exploration
      </h1>
      <div className="space-y-4">
        <p>
          This application is an interactive playground for the
          {' '}
          <a
            href="https://oklch.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            Oklch color space
          </a>
          , designed to help you create beautiful, consistent, and accessible UI
          color palettes.
        </p>
        <p>
          Unlike traditional color spaces like HSL or RGB, Oklch is designed to
          be perceptually uniform. This means that as you change the lightness or
          chroma values, the perceived change in color is much more consistent,
          making it far easier to create harmonious and predictable color

          scales.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">
          The Technology Stack
        </h2>
        <p>
          This project was built with a no-nonsense approach, focusing on a
          lean but powerful stack:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>React & TypeScript:</strong>
            {' '}
            For a robust, type-safe, and
            component-driven UI.
          </li>
          <li>
            <strong>Vite:</strong>
            {' '}
            For a blazing-fast development server and
            build process.
          </li>
          <li>
            <strong>Tailwind CSS:</strong>
            {' '}
            For a utility-first styling workflow
            that enables rapid and consistent design.
          </li>
          <li>
            <strong>Zustand:</strong>
            {' '}
            For simple, unopinionated global state
            management.
          </li>
          <li>
            <strong>TanStack Router:</strong>
            {' '}
            For modern, type-safe, and
            file-based routing.
          </li>
          <li>
            <strong>Culori:</strong>
            {' '}
            For powerful and accurate color manipulation
            and conversion.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">Philosophy</h2>
        <p>
          The goal is to demonstrate that great software comes from good taste
          and sound engineering principles, not from chasing hype or adding
          unnecessary complexity. Simplicity, clarity, and practicality are the
          cornerstones of this project.
        </p>
      </div>
    </div>
  )
}
