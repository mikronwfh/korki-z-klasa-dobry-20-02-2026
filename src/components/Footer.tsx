import { Facebook } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-foreground py-12 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Korki z Klasą" className="h-10 w-10 rounded-full" />
            <span className="font-bold text-lg text-background">Korki z Klasą</span>
          </div>
          <p className="text-sm text-background/60">
            Profesjonalne korepetycje i kursy maturalne w Bolesławcu i online.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-background mb-3">Szybkie linki</h4>
          <div className="flex flex-col gap-2">
            {["Oferta", "O mnie", "Cennik", "Kursy online", "Kontakt"].map((l) => (
              <a
                key={l}
                href={`#${l === "Oferta" ? "uslugi" : l === "O mnie" ? "o-mnie" : l === "Kursy online" ? "kursy" : l.toLowerCase()}`}
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-background mb-3">Social media</h4>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/korkizklasa.boleslawiec"
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
          © {new Date().getFullYear()} Korki z Klasą — Sandra Wilczyńska. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
