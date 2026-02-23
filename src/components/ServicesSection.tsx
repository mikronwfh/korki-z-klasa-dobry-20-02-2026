import { Calculator, FlaskConical, Languages } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultServices = [
  {
    id: "math",
    icon: Calculator,
    title: "Matematyka",
    description: "Korepetycje od podstaw po rozszerzenie. Przygotowanie do matury i egzaminów.",
  },
  {
    id: "chem",
    icon: FlaskConical,
    title: "Chemia",
    description: "Zrozumiałe tłumaczenie trudnych zagadnień. Kursy maturalne i pomoc bieżąca.",
  },
  {
    id: "eng",
    icon: Languages,
    title: "Język angielski",
    description: "Konwersacje, gramatyka, przygotowanie do certyfikatów i matury.",
  },
];

const ServicesSection = () => {
  const { content } = useSiteContent("home_services");
  const services = defaultServices.map((service, index) => {
    const override = content?.content?.items?.[index];

    return {
      ...service,
      title: override?.title ?? service.title,
      description: override?.description ?? service.description,
    };
  });

  return (
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
              key={s.id}
              className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <div 
                className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: s.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
