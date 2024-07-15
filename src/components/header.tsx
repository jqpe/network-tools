import { Link } from '~/components/ui/link.tsx'
import { ThemeToggle } from '~/components/theme-toggle'
import { cn } from '~/utils'

export function Header() {
  const linkStyles = cn('[&.active]:underline no-underline')

  return (
    <header className="max-w-prose mx-auto flex justify-between py-4">
      <nav className="flex gap-2 items-center">
        <Link to="/" className={linkStyles}>
          Home
        </Link>
        <Link to="/tld" className={linkStyles}>
          Top level domains
        </Link>
        <Link to="/whois" className={linkStyles}>
          Whois
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  )
}
