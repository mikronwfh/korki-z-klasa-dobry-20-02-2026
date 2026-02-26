import { useState } from "react";

type AwardImageProps = {
  year: "2025" | "2026";
};

const AwardImage = ({ year }: AwardImageProps) => {
  const sources = [
    `/images/orly-edukacji-${year}.png`,
    `/images/orly-edukacji-${year}.jpg`,
    `/images/orly-edukacji-${year}.jpeg`,
    `/images/orly-edukacji-${year}.webp`,
    `/images/orly-edukacji-${year}.svg`,
  ];

  const [sourceIndex, setSourceIndex] = useState(0);
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
        <p className="text-sm text-primary-foreground/80">
          Brak pliku: /public/images/orly-edukacji-{year}.(png|jpg|jpeg|webp|svg)
        </p>
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={`Orły Edukacji ${year}`}
      className="mx-auto h-auto w-full max-w-[280px] rounded-2xl object-contain"
      onError={() => {
        if (sourceIndex < sources.length - 1) {
          setSourceIndex(sourceIndex + 1);
        } else {
          setUnavailable(true);
        }
      }}
    />
  );
};

const AwardsSection = () => {
  return (
    <section id="wyroznienia" className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Wyróżnienia
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Laureaci Orłów Edukacji
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Zaufali nam uczniowie i rodzice — to sprawiło, że zostaliśmy laureatami ogólnopolskiego plebiscytu Orły Edukacji dwa lata z rzędu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-3xl border border-border/50 bg-card p-8 shadow-lg">
            <AwardImage year="2025" />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Laureat plebiscytu Orły Edukacji 2025
            </p>
          </div>
          <div className="flex flex-col items-center rounded-3xl border border-border/50 bg-card p-8 shadow-lg">
            <AwardImage year="2026" />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Laureat plebiscytu Orły Edukacji 2026
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-6 text-center sm:p-8">
          <p className="text-sm text-muted-foreground sm:text-base">
            To wyróżnienie potwierdza, że nasze metody naprawdę przynoszą efekty i że trafiasz do miejsca sprawdzonego, skutecznego i rekomendowanego przez innych rodziców.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
