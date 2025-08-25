import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white">About This Project</h1>
      <p className="text-lg text-slate-300">
        This is a tool for exploring the OKLCH color space. It was built with a no-nonsense approach, focusing on clean data structures, a solid architectural foundation, and a practical, refined user interface.
      </p>
      <p className="text-slate-400">
        The goal is to demonstrate that good software comes from good taste and sound engineering principles, not from chasing the latest hype or adding unnecessary libraries. Simplicity, clarity, and practicality are the cornerstones of this project.
      </p>
      <h2 className="text-2xl font-bold text-white pt-4">Core Philosophy</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-400">
        <li>
          <strong>Data First:</strong> Good programmers worry about data structures. The code is secondary.
        </li>
        <li>
          <strong>Simplicity:</strong> If it's complex, it's wrong. Reduce complexity, don't just manage it.
        </li>
        <li>
          <strong>Pragmatism:</strong> Solve real problems, not imaginary ones. The theory must serve the practice.
        </li>
      </ul>
    </div>
  )
}
