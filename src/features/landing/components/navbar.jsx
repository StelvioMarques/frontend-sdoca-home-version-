import { Button } from "@/components/ui/button"
import MobileMenu from "./menu/mobile-menu"
import { Link } from "react-router-dom"
import DesktopMenu from "./menu/desktop-menu"
import Logo from "./logo"
import { useEffect, useState } from "react"

export default function NavBarMenu() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <>
      <header
        className={`px-4 md:px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-background/50 backdrop-blur-md border"
            : "bg-transparent"
          }`}
      >
        <div className="flex items-center justify-between h-16 gap-10 md:justify-around">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <MobileMenu />

            {/* Logo and navigation menu*/}
            <div className="flex items-center gap-10">
              <Logo />
              <DesktopMenu />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className={scrolled ? "" : "hover:bg-white/10"}>
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild size="sm">
              <Link to="#">Teste Grátis</Link>
            </Button>
          </div>
        </div>
      </header>
      {/* Espaçador para compensar o header fixo */}
      <div className="h-16"></div>
    </>
  )
}
