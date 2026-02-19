import { ExternalLink, Play } from "lucide-react";

const CoursePlatformSection = () => (
  <section id="kursy" className="section-padding bg-primary">
    <div className="container mx-auto text-center">
      <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Platforma kursów</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
        Kursy online — ucz się w swoim tempie
      </h2>
      <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
        Dostęp do nagrań lekcji, materiałów i testów 24/7. Platforma WebToLearn umożliwia naukę z dowolnego urządzenia.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
        {[
          { icon: Play, label: "Nagrania lekcji", desc: "Wideo z objaśnieniami" },
          { icon: ExternalLink, label: "Testy online", desc: "Sprawdź swoją wiedzę" },
          { icon: Play, label: "Materiały PDF", desc: "Do pobrania i druku" },
        ].map((f) => (
          <div key={f.label} className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
            <f.icon className="mx-auto mb-3 text-secondary" size={28} />
            <h3 className="font-bold text-primary-foreground mb-1">{f.label}</h3>
            <p className="text-sm text-primary-foreground/60">{f.desc}</p>
          </div>
        ))}
      </div>

      <a
        href="https://webtolearn.pl"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-bold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg"
      >
        Przejdź do platformy kursów
        <ExternalLink size={18} />
      </a>
    </div>
  </section>
);

export default CoursePlatformSection;
