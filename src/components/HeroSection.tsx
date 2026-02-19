import { ArrowRight, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroImage} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/80" />
    </div>

    <div className="container mx-auto relative z-10 px-4 py-24 md:py-32">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <img src={logo} alt="Logo" className="h-16 w-16 rounded-full border-2 border-secondary shadow-lg" />
          <span className="text-secondary font-bold text-lg">Korki z Klasą</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Matematyka, Chemia,{" "}
          <span className="text-secondary">Angielski</span> — zdaj maturę z&nbsp;klasą!
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Korepetycje indywidualne i kursy grupowe w Bolesławcu i online. Profesjonalne przygotowanie do matury i nie tylko.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#uslugi"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 text-base font-bold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg"
          >
            <BookOpen size={20} />
            Sprawdź ofertę
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-base font-bold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            Umów lekcję
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
