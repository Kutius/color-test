import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="p-4 border-b border-border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-text-primary hover:text-accent transition-colors">
          OKLCH Color Lab
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors" activeProps={{className: '!text-text-primary font-semibold'}}>Lab</Link>
          <Link to="/about" className="text-sm text-text-secondary hover:text-text-primary transition-colors" activeProps={{className: '!text-text-primary font-semibold'}}>About</Link>
        </nav>
      </div>
    </header>
  )
}