import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultLocationContent = {
  subtitle: "NASZA LOKALIZACJA",
  title: "Uczymy stacjonarnie — w centrum miasta",
  description:
    "Prowadzimy zajęcia w biurze stacjonarnym w centrum Bolesławca. To wygodna lokalizacja z łatwym dojazdem i spokojną przestrzenią do nauki.",
  note: "Pracujemy również nad otwarciem drugiej lokalizacji w Lubinie — szczegóły wkrótce.",
  cards: [
    {
      title: "Bolesławiec — biuro stacjonarne",
      description: "Zajęcia indywidualne i kursy grupowe w centrum miasta",
      status: "active",
    },
    {
      title: "Lubin — w przygotowaniu",
      description: "Nowa lokalizacja w planach otwarcia",
      status: "planned",
    },
  ],
  cta_text: "Zapytaj o dostępne miejsca",
  cta_url: "#kontakt",
};

const LocationSection = () => {
  const { content } = useSiteContent("home_location");
  const location = { ...defaultLocationContent, ...(content?.content ?? {}) };
  const cards = (location.cards?.length ? location.cards : defaultLocationContent.cards).slice(0, 2);

  return (
    <section id="lokalizacja" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-secondary uppercase tracking-[0.15em] mb-3">{location.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">{location.title}</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">{location.description}</p>
          <p className="mt-3 text-2xl text-primary-foreground/75">{location.note}</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {cards.map((card: any, index: number) => {
            const isActive = (card?.status ?? "active") === "active";

            return (
              <article
                key={`${card.title}-${index}`}
                className="rounded-2xl p-6 bg-primary/70 border border-primary-foreground/10 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  {isActive ? (
                    <CheckCircle2 size={24} className="text-secondary" />
                  ) : (
                    <MapPin size={24} className="text-primary-foreground/45" />
                  )}
                  <h3 className={isActive ? "text-2xl font-bold leading-tight" : "text-2xl font-bold leading-tight text-primary-foreground/70"}>
                    {card.title}
                  </h3>
                </div>
                <p className={isActive ? "text-base text-primary-foreground/80 leading-relaxed" : "text-base text-primary-foreground/60 leading-relaxed"}>
                  {card.description}
                </p>

                <div className={isActive ? "relative mt-5 h-24 rounded-xl overflow-hidden bg-muted/70" : "relative mt-5 h-24 rounded-xl overflow-hidden bg-muted/50"}>
                  <div className="absolute -left-8 top-8 w-56 h-3 rotate-[-8deg] rounded-full bg-background/40" />
                  <div className="absolute -right-8 top-5 w-56 h-3 rotate-[10deg] rounded-full bg-background/35" />
                  <div className="absolute left-10 bottom-6 w-44 h-3 rotate-[3deg] rounded-full bg-background/45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin size={42} className={isActive ? "text-secondary" : "text-primary-foreground/35"} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={location.cta_url || "#kontakt"}
            className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-12 py-4 text-3xl font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            {location.cta_text}
            <ArrowUpRight size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
