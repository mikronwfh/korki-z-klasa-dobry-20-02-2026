import { useSiteContent } from "@/hooks/useSiteContent";
import { useState } from "react";

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

const getBadgeImageSrc = (year: string) => {
  if (year === "2026") return "/images/orly-edukacji-2026.png";
  return "/images/orly-edukacji-2025.png";
};

const AwardsSection = () => {
  const { content } = useSiteContent("home_awards");
  const [imageErrorKeys, setImageErrorKeys] = useState<Record<string, boolean>>({});
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
            (() => {
              const badgeKey = `${badge.year}-${index}`;
              const hasImageError = Boolean(imageErrorKeys[badgeKey]);

              return (
            <article
              key={badgeKey}
              className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6"
            >
              <div className="mx-auto w-full max-w-[320px]">
                {!hasImageError ? (
                  <img
                    src={getBadgeImageSrc(badge.year)}
                    alt={`${badge.title} ${badge.subtitle} ${badge.year}`}
                    className="h-auto w-full rounded-2xl object-contain"
                    loading="lazy"
                    onError={() =>
                      setImageErrorKeys((prev) => ({
                        ...prev,
                        [badgeKey]: true,
                      }))
                    }
                  />
                ) : (
                  <div className="rounded-2xl border border-secondary/35 bg-secondary/10 px-4 py-8">
                    <p className="text-lg font-black tracking-wide text-secondary">{badge.title}</p>
                    <p className="mt-2 text-xs font-semibold tracking-wide text-primary-foreground/90">
                      {badge.subtitle}
                    </p>
                    <p className="mt-3 text-4xl font-black leading-none">{badge.year}</p>
                  </div>
                )}
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
