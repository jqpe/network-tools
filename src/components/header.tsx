import { Link } from '~/components/ui/link.tsx'
import { ThemeToggle } from '~/components/theme-toggle'

export function Header() {
  return (
    <header className="max-w-prose mx-auto flex justify-between py-4">
      <nav className="flex gap-2 items-center">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/tld" className="[&.active]:font-bold">
          Top level domains
        </Link>
        <Link to="/whois" className="[&.active]:font-bold">
          Whois
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  )
}
