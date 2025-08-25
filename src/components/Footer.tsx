export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="p-6 mt-12 border-t border-border-primary text-center text-sm text-text-secondary">
      <p>&copy; {currentYear} OKLCH Color Lab. A project by a pragmatic engineer.</p>
    </footer>
  )
}
