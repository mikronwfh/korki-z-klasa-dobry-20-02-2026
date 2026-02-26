import { Check, UserCheck, Users } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultPricingContent = {
  subtitle: "CENNIK",
  title: "Sprawdź koszt zajęć",
  description: "",
  plans: [
    {
      name: "Zajęcia indywidualne",
      price: "130",
      unit: "/ lekcję",
      description: "",
      features: [
        "Zajęcia 1 na 1",
        "Dogodny termin i tempo pracy",
        "Stacjonarnie lub online",
      ],
      cta_text: "Zapytaj o termin",
    },
    {
      name: "Kurs grupowy",
      price: "60",
      unit: "/ lekcję",
      description: "",
      features: [
        "Przygotowanie do egzaminów",
        "Małe, kameralne grupy",
        "Terminy stacjonarnie i online",
      ],
      cta_text: "Sprawdź grupy",
    },
  ],
};

const PricingSection = () => {
  const { content } = useSiteContent("home_pricing");
  const pricing = {
    ...defaultPricingContent,
    ...(content?.content ?? {}),
  };
  const plans = (pricing.plans?.length ? pricing.plans : defaultPricingContent.plans).slice(0, 2);
  const planIcons = [UserCheck, Users];

  return (
    <section id="cennik" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            {pricing.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            {pricing.title}
          </h2>
          {pricing.description ? (
            <p className="text-primary-foreground/80 mt-3 max-w-lg mx-auto">{pricing.description}</p>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((p, index) => (
            <div
              key={`${p.name}-${index}`}
              className="rounded-2xl p-8 bg-primary/70 border border-primary-foreground/10 shadow-xl flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                {(() => {
                  const Icon = planIcons[index] ?? Users;
                  return <Icon size={28} className="text-secondary" />;
                })()}
              </div>
              <h3 className="text-2xl font-bold mb-1 leading-none">
                {p.name}
              </h3>
              {p.description ? <p className="text-sm mb-4 text-primary-foreground/75">{p.description}</p> : null}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold">{p.price} zł</span>
                <span className="text-sm text-primary-foreground/65">
                  {p.unit}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f: string, idx: number) => (
                  <li key={`${f}-${idx}`} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-secondary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className="block text-center rounded-xl py-3 font-semibold transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-auto"
              >
                {p.cta_text || "Sprawdź"}
              </a>
              <div className="h-1 bg-secondary rounded-full mt-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
