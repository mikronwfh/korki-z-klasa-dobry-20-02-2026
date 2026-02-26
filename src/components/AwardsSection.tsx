import { useSiteContent } from "@/hooks/useSiteContent";

const defaultAwardsContent = {
  title: "Laureaci Orłów Edukacji 2025 i 2026",
  description:
    "Zaufali nam uczniowie i rodzice — i to właśnie ich opinie sprawiły, że zostaliśmy laureatami ogólnopolskiego plebiscytu Orły Edukacji dwa lata z rzędu: 2025 i 2026. Dla Ciebie to jasny sygnał: trafiasz do miejsca sprawdzonego, skutecznego i rekomendowanego przez innych rodziców. To wyróżnienie potwierdza, że nasze metody naprawdę przynoszą efekty.",
  image_2025_url: "",
  image_2026_url: "",
};

type AwardImageProps = {
  imageUrl: string;
  year: "2025" | "2026";
};

const AwardImage = ({ imageUrl, year }: AwardImageProps) => {
  if (!imageUrl) {
    return (
      <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6 min-h-[200px] flex items-center justify-center">
        <p className="text-sm text-primary-foreground/80">
          Brak obrazu certyfikatu {year}.<br />
          Dodaj URL w panelu admina.
        </p>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`Orły Edukacji ${year}`}
      className="mx-auto h-auto w-full max-w-[280px] rounded-2xl object-contain"
      loading="lazy"
    />
  );
};

const AwardsSection = () => {
  const { content } = useSiteContent("home_awards");
  const awards = {
    ...defaultAwardsContent,
    ...(content?.content ?? {}),
  };

  return (
    <section id="wyroznienia" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            {awards.title}
          </h2>
          <p className="text-lg text-primary-foreground/85 max-w-3xl mx-auto leading-relaxed">
            {awards.description}
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
            <AwardImage imageUrl={awards.image_2025_url} year="2025" />
          </div>

          <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
            <AwardImage imageUrl={awards.image_2026_url} year="2026" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
