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
  ];

  const [sourceIndex, setSourceIndex] = useState(0);
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <p className="text-sm text-primary-foreground/80">
        Brak pliku: /public/images/orly-edukacji-{year}.(png|jpg|jpeg|webp)
      </p>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={`Orły Edukacji ${year}`}
      className="mx-auto h-auto w-full max-w-[280px] rounded-2xl object-contain"
      loading="lazy"
      onError={() => {
        const nextSourceIndex = sourceIndex + 1;
        if (nextSourceIndex < sources.length) {
          setSourceIndex(nextSourceIndex);
          return;
        }

        setUnavailable(true);
      }}
    />
  );
};

const AwardsSection = () => {
  return (
    <section id="wyroznienia" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
            <AwardImage year="2025" />
          </div>

          <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
            <AwardImage year="2026" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
