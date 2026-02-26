import { Calculator, FlaskConical, Languages } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultServicesContent = {
  subtitle: "CO OFERUJEMY",
  title: "Przedmioty",
  items: [
  {
    id: "math",
    icon: Calculator,
    title: "Matematyka",
      description: "Szkoła podstawowa i ponadpodstawowa, bieżąca nauka i skuteczne przygotowanie do egzaminów.",
  },
  {
    id: "chem",
    icon: FlaskConical,
    title: "Chemia",
      description: "Zrozumiałe tłumaczenie zagadnień, przygotowanie do testów, kartkówek i konkursów.",
  },
  {
    id: "eng",
    icon: Languages,
    title: "Język angielski",
      description: "Szkoła podstawowa, ponadpodstawowa, egzaminy, konwersacje, Business English.",
  },
  ],
};

const ServicesSection = () => {
  const { content } = useSiteContent("home_services");
  const servicesContent = { ...defaultServicesContent, ...(content?.content ?? {}) };
  const services = defaultServicesContent.items.map((service, index) => {
    const override = servicesContent.items?.[index];

    return {
      ...service,
      title: override?.title ?? service.title,
      description: override?.description ?? service.description,
    };
  });

  return (
    <section id="uslugi" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-9 md:mb-10">
          <p className="text-sm font-semibold text-secondary uppercase tracking-[0.18em] mb-2">{servicesContent.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {servicesContent.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl p-6 bg-primary/70 border border-primary-foreground/10 shadow-xl flex flex-col min-h-[245px]"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-5">
                <s.icon className="text-primary-foreground/75" size={28} />
              </div>
              <h3 className="text-3xl md:text-[1.95rem] font-bold mb-2.5 leading-tight">{s.title}</h3>
              <div 
                className="text-base md:text-[1.05rem] text-primary-foreground/75 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.description }}
              />
              <div className="h-1.5 bg-secondary rounded-full mt-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
