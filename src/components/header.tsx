import { Link } from '~/components/ui/link.tsx'
import { ThemeToggle } from '~/components/theme-toggle'

export function Header() {
  return (
    <header>
      <nav className="p-2 flex gap-2 items-center">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/tld" className="[&.active]:font-bold">
          Top level domains
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  )
}
