import { Calculator, FlaskConical, Languages, Users, User, Monitor } from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Matematyka",
    description: "Korepetycje od podstaw po rozszerzenie. Przygotowanie do matury i egzaminów.",
  },
  {
    icon: FlaskConical,
    title: "Chemia",
    description: "Zrozumiałe tłumaczenie trudnych zagadnień. Kursy maturalne i pomoc bieżąca.",
  },
  {
    icon: Languages,
    title: "Język angielski",
    description: "Konwersacje, gramatyka, przygotowanie do certyfikatów i matury.",
  },
  {
    icon: User,
    title: "Zajęcia indywidualne",
    description: "Dopasowany program do Twoich potrzeb. Elastyczne terminy.",
  },
  {
    icon: Users,
    title: "Kursy grupowe",
    description: "Małe grupy, intensywna praca. Motywacja i wsparcie rówieśników.",
  },
  {
    icon: Monitor,
    title: "Zajęcia online",
    description: "Ucz się z dowolnego miejsca. Pełna interakcja jak na żywo.",
  },
];

const ServicesSection = () => (
  <section id="uslugi" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Co oferujemy</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Nasze usługi
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
