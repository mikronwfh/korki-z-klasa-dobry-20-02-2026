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

const getBadgeImageCandidates = (year: string) => {
  if (year === "2026") {
    return [
      "/images/orly-edukacji-2026.png",
      "/images/orly-edukacji-2026.jpg",
      "/images/orly-edukacji-2026.jpeg",
      "/images/orly-edukacji-2026.webp",
    ];
  }

  return [
    "/images/orly-edukacji-2025.png",
    "/images/orly-edukacji-2025.jpg",
    "/images/orly-edukacji-2025.jpeg",
    "/images/orly-edukacji-2025.webp",
  ];
};

const AwardsSection = () => {
  const { content } = useSiteContent("home_awards");
  const [imageIndexByKey, setImageIndexByKey] = useState<Record<string, number>>({});
  const [imageUnavailableByKey, setImageUnavailableByKey] = useState<Record<string, boolean>>({});
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
              className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6"
            >
              <div className="mx-auto w-full max-w-[320px] rounded-2xl border border-secondary/35 bg-secondary/10 px-4 py-8">
                {(() => {
                  const badgeKey = `${badge.year}-${index}`;
                  const candidates = getBadgeImageCandidates(badge.year);
                  const currentIndex = imageIndexByKey[badgeKey] ?? 0;
                  const imageSrc = candidates[currentIndex];
                  const imageUnavailable = Boolean(imageUnavailableByKey[badgeKey]);

                  return (
                    <>
                      <div className="mx-auto mb-3 h-14 w-full max-w-[180px]">
                        {!imageUnavailable && imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={`${badge.title} ${badge.year}`}
                            className="h-full w-full object-contain object-top"
                            loading="lazy"
                            onError={() => {
                              const nextIndex = currentIndex + 1;

                              if (nextIndex < candidates.length) {
                                setImageIndexByKey((prev) => ({
                                  ...prev,
                                  [badgeKey]: nextIndex,
                                }));
                                return;
                              }

                              setImageUnavailableByKey((prev) => ({
                                ...prev,
                                [badgeKey]: true,
                              }));
                            }}
                          />
                        ) : (
                          <div className="h-full w-full" />
                        )}
                      </div>

                      <p className="text-4xl font-black tracking-wide text-secondary sm:text-3xl">{badge.title}</p>
                      <p className="mt-2 text-xl font-semibold tracking-wide text-primary-foreground/90 sm:text-lg">
                        {badge.subtitle}
                      </p>
                      <p className="mt-3 text-6xl font-black leading-none sm:text-5xl">{badge.year}</p>
                    </>
                  );
                })()}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
