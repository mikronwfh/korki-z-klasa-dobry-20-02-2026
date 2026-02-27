import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultNavbarContent = {
  brand_text: "Korki z Klasą",
  cta_text: "Umów się",
  cta_href: "#kontakt",
  links: [
    { label: "Oferta", href: "#uslugi" },
    { label: "Nabór 2026/2027", href: "#nabor" },
    { label: "Lokalizacja", href: "#lokalizacja" },
    { label: "O nas", href: "#o-mnie" },
    { label: "Wyróżnienia", href: "#wyroznienia" },
    { label: "Cennik", href: "#cennik" },
    { label: "Kursy online", href: "#kursy" },
    { label: "Opinie", href: "#opinie" },
    { label: "Darmowe materiały", href: "#darmowe-materialy" },
    { label: "Kontakt", href: "#kontakt" },
  ],
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { content } = useSiteContent("site_navbar");
  const navbar = { ...defaultNavbarContent, ...(content?.content ?? {}) };
  const navLinks = defaultNavbarContent.links.map((link, index) => {
    const override = navbar.links?.[index];
    return {
      label: override?.label ?? link.label,
      href: override?.href ?? link.href,
    };
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Korki z Klasą" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-bold text-lg text-foreground">{navbar.brand_text}</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={navbar.cta_href || "#kontakt"}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {navbar.cta_text}
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href={navbar.cta_href || "#kontakt"}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
          >
            {navbar.cta_text}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
