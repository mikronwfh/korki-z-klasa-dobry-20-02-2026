import { Award, Sparkles } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultAwardsContent = {
  subtitle: "Laureaci plebiscytu",
  title: "Laureaci Orłów Edukacji 2025 i 2026",
  description_1:
    "Zaufali nam uczniowie i rodzice — i to właśnie ich opinie sprawiły, że zostaliśmy laureatami ogólnopolskiego plebiscytu Orły Edukacji dwa lata z rzędu: 2025 i 2026.",
  description_2:
    "Dla Ciebie to jasny sygnał: trafiasz do miejsca sprawdzonego, skutecznego i rekomendowanego przez innych rodziców. To wyróżnienie potwierdza, że nasze metody naprawdę przynoszą efekty.",
  badges: [
    {
      title: "ORŁY EDUKACJI",
      subtitle: "LAUREAT KONKURSU",
      year: "2025",
    },
    {
      title: "ORŁY EDUKACJI",
      subtitle: "LAUREAT KONKURSU",
      year: "2026",
    },
  ],
};

type AwardBadge = {
  title: string;
  subtitle: string;
  year: string;
};

const AwardsSection = () => {
  const { content } = useSiteContent("home_awards");
  const awards = {
    ...defaultAwardsContent,
    ...(content?.content ?? {}),
  };

  const badges = (awards.badges?.length ? awards.badges : defaultAwardsContent.badges).slice(0, 2);

  return (
    <section id="wyroznienia" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-secondary">{awards.subtitle}</p>
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">{awards.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">{awards.description_1}</p>
          <p className="mt-3 text-lg leading-relaxed text-primary-foreground/80">{awards.description_2}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {badges.map((badge: AwardBadge, index: number) => (
            <article
              key={`${badge.year}-${index}`}
              className="rounded-2xl border border-secondary/45 bg-secondary/15 p-6 text-center shadow-xl"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/25">
                {index === 0 ? <Award className="text-secondary" size={24} /> : <Sparkles className="text-secondary" size={24} />}
              </div>
              <p className="text-xl font-black tracking-wide text-secondary">{badge.title}</p>
              <p className="mt-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground">
                {badge.subtitle}
              </p>
              <p className="mt-4 text-5xl font-black leading-none">{badge.year}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
