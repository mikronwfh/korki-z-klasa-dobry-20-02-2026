import { Check } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultPricingContent = {
  subtitle: "Cennik",
  title: "Przejrzyste ceny",
  description: "Wybierz opcję dopasowaną do Twoich potrzeb. Bez ukrytych kosztów.",
  plans: [
    {
      name: "Pojedyncza lekcja",
      price: "80",
      unit: "/ 60 min",
      description: "Idealne na próbę lub doraźną pomoc",
      features: [
        "Zajęcia indywidualne",
        "Dowolny przedmiot",
        "Stacjonarnie lub online",
        "Elastyczny termin",
      ],
      highlighted: false,
    },
    {
      name: "Pakiet 10 lekcji",
      price: "700",
      unit: "/ 10h",
      description: "Najpopularniejszy wybór — oszczędzasz 100 zł",
      features: [
        "Zajęcia indywidualne",
        "Dowolny przedmiot",
        "Stacjonarnie lub online",
        "Priorytetowe umawianie",
        "Materiały dodatkowe",
      ],
      highlighted: true,
    },
    {
      name: "Kurs maturalny",
      price: "150",
      unit: "/ miesiąc",
      description: "Intensywne przygotowanie w grupie",
      features: [
        "Zajęcia grupowe (max 6 os.)",
        "2 spotkania tygodniowo",
        "Próbne matury",
        "Materiały i testy",
        "Wsparcie online",
      ],
      highlighted: false,
    },
  ],
};

const PricingSection = () => {
  const { content } = useSiteContent("home_pricing");
  const pricing = {
    ...defaultPricingContent,
    ...(content?.content ?? {}),
  };
  const plans = pricing.plans?.length ? pricing.plans : defaultPricingContent.plans;

  return (
    <section id="cennik" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            {pricing.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {pricing.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{pricing.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p, index) => (
            <div
              key={`${p.name}-${index}`}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                p.highlighted
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105 ring-2 ring-secondary"
                  : "glass-card"
              }`}
            >
              {p.highlighted && (
                <span className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                  Najpopularniejszy
                </span>
              )}
              <h3 className={`text-xl font-bold mb-1 ${p.highlighted ? "" : "text-foreground"}`}>
                {p.name}
              </h3>
              <p className={`text-sm mb-4 ${p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {p.description}
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold">{p.price} zł</span>
                <span className={`text-sm ${p.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {p.unit}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f: string, idx: number) => (
                  <li key={`${f}-${idx}`} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={p.highlighted ? "text-secondary" : "text-accent"} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`block text-center rounded-lg py-3 font-semibold transition-colors ${
                  p.highlighted
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Wybierz
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
