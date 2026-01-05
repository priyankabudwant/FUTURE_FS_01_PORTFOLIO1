import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // show navbar at top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // scrolling down → hide
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } 
      // scrolling up → show
      else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-xs"
          : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#hero" className="text-xl font-bold text-primary">
          <span className="text-glow text-foreground">B K</span> PRIYANKA
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition"
            >
              {item.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-x-0 top-55 bottom-0 bg-background/90 backdrop-blur-md",
            "transition-all duration-300 md:hidden",
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
