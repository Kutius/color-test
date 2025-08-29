function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="p-6 mt-12 border-t border-border-primary text-center text-sm text-text-secondary flex justify-center items-center gap-4">
      <p>
        &copy;
        {currentYear}
        {' '}
        OKLCH Color Lab.
      </p>
      <a href="https://github.com/kutius/color-test" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
        <GitHubIcon />
      </a>
    </footer>
  )
}
