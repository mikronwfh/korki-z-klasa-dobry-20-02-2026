import { Youtube, TrendingUp, BookOpen, Lightbulb, ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultFreeMaterialsContent = {
  subtitle: "DARMOWE MATERIAŁY",
  title: "YouTube i TikTok",
  introduction:
    "Na naszych kanałach w mediach społecznościowych znajdziesz darmowe materiały edukacyjne:",
  items: [
    {
      title: "Tłumaczenia zadań egzaminacyjnych",
      icon: "book",
    },
    {
      title: "Powtórki do matury i egzaminu ósmoklasisty",
      icon: "graduate",
    },
    {
      title: "Krótkie lekcje i strategie rozwiązywania zadań",
      icon: "lightbulb",
    },
  ],
  description:
    "To świetny sposób, aby zobaczyć nasze metody w praktyce i skorzystać z wiedzy między zajęciami.",
  youtube_title: "YouTube",
  youtube_url: "https://www.youtube.com/channel/UCgwe_AWW4WE26N7-jwkLU3Q",
  tiktok_title: "TikTok",
  tiktok_url: "https://www.tiktok.com/@korkizklasa",
};

type FreeMaterialItem = {
  title: string;
  icon?: "book" | "graduate" | "lightbulb" | string;
};

const iconMap = {
  book: BookOpen,
  graduate: TrendingUp,
  lightbulb: Lightbulb,
} as const;

const FreeMaterialsSection = () => {
  const { content } = useSiteContent("home_free_materials");
  const material = { ...defaultFreeMaterialsContent, ...(content?.content ?? {}) };
  const items = (material.items?.length ? material.items : defaultFreeMaterialsContent.items).slice(0, 3);

  return (
    <section id="darmowe-materialy" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-[0.15em] mb-3">{material.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
            {material.title}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">{material.introduction}</p>

            <div className="space-y-3 mb-8">
              {items.map((item: FreeMaterialItem, index: number) => {
                const iconKey = item.icon as keyof typeof iconMap;
                const IconComponent = iconMap[iconKey] ?? BookOpen;

                return (
                  <div key={`material-${index}`} className="flex items-center justify-center gap-3">
                    <IconComponent size={20} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-base">{item.title}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-lg text-foreground/70 mb-10">{material.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href={material.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border-2 border-primary/30 p-8 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Youtube size={24} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{material.youtube_title}</h3>
              </div>
              <p className="text-base text-foreground/60 text-left">
                Lekcje wideo, tłumaczenia zadań i powtórki do egzaminów
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-base">
                Przejdź na kanał
                <ArrowUpRight size={20} />
              </div>
            </a>

            <a
              href={material.tiktok_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border-2 border-primary/30 p-8 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <TrendingUp size={24} className="text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{material.tiktok_title}</h3>
              </div>
              <p className="text-base text-foreground/60 text-left">
                Krótkie lekcje, porady i strategie przygotowania do egzaminów
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-base">
                Przejdź na kanał
                <ArrowUpRight size={20} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeMaterialsSection;
