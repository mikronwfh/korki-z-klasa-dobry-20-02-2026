import { Facebook } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultFooterContent = {
  brand_text: "Korki z Klasą",
  description: "Profesjonalne korepetycje i kursy maturalne w Bolesławcu i online.",
  quick_links: [
    { label: "Oferta", hash: "oferta" },
    { label: "Nabór 2026/2027", hash: "nabor" },
    { label: "Lokalizacja", hash: "lokalizacja" },
    { label: "Przedmioty", hash: "uslugi" },
    { label: "O nas", hash: "o-mnie" },
    { label: "Cennik", hash: "cennik" },
    { label: "Kursy online", hash: "kursy" },
    { label: "Social media", hash: "social" },
    { label: "Opinie", hash: "opinie" },
    { label: "Darmowe materiały", hash: "darmowe-materialy" },
    { label: "Kontakt", hash: "kontakt" },
  ],
  facebook_url: "https://www.facebook.com/korkizklasa.boleslawiec",
  copyright: "© {year} Korki z Klasą — Sandra Wilczyńska. Wszelkie prawa zastrzeżone.",
};

const Footer = () => {
  const { content } = useSiteContent("site_footer");
  const footer = { ...defaultFooterContent, ...(content?.content ?? {}) };
  const quickLinks = defaultFooterContent.quick_links.map((link, index) => {
    const override = footer.quick_links?.[index];
    return {
      label: override?.label ?? link.label,
      hash: override?.hash ?? link.hash,
    };
  });
  const year = new Date().getFullYear();
  const copyright = String(footer.copyright || defaultFooterContent.copyright).replace("{year}", `${year}`);

  return (
    <footer className="bg-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Korki z Klasą" className="h-10 w-10 rounded-full" />
              <span className="font-bold text-lg text-background">{footer.brand_text}</span>
            </div>
            <p className="text-sm text-background/60">
              {footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-background mb-3">Szybkie linki</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <a
                  key={l.hash}
                  href={`#${l.hash}`}
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-background mb-3">Social media</h4>
            <div className="flex gap-3">
              <a
                href={footer.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Facebook size={20} className="text-background" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center">
          <p className="text-xs text-background/40">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
