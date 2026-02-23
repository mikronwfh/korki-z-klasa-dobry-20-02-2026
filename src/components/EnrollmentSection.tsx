import { ArrowUpRight, CalendarDays, GraduationCap, UserCheck } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultEnrollmentContent = {
  subtitle: "NABÓR NA ROK SZKOLNY 2026/2027",
  title: "Ruszyły zapisy na zajęcia w roku szkolnym 2026/2027!",
  description:
    "Zapraszamy na profesjonalne zajęcia dodatkowe, które wesprą uczniów w systematycznej nauce i przygotowaniu do egzaminów.",
  note: "Dołącz do naszych kursów w roku szkolnym 2026/2027 — szczegóły wkrótce.",
  cards: [
    {
      title: "Zajęcia indywidualne",
      description: "Indywidualny tok pracy i program dopasowany do ucznia",
    },
    {
      title: "Kurs do matury",
      description: "Przygotowanie do matury z matematyki oraz innych przedmiotów",
    },
    {
      title: "Kurs do egzaminu ósmoklasisty",
      description: "Solidne przygotowanie do egzaminu na zakończenie szkoły podstawowej",
    },
  ],
  cta_text: "Dowiedz się więcej",
  cta_url: "#kontakt",
};

const icons = [UserCheck, GraduationCap, CalendarDays];

const EnrollmentSection = () => {
  const { content } = useSiteContent("home_enrollment");
  const enrollment = { ...defaultEnrollmentContent, ...(content?.content ?? {}) };
  const cards = (enrollment.cards?.length ? enrollment.cards : defaultEnrollmentContent.cards).slice(0, 3);

  return (
    <section id="nabor" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-secondary uppercase tracking-[0.15em] mb-3">{enrollment.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">{enrollment.title}</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">{enrollment.description}</p>
          <p className="mt-3 text-2xl text-primary-foreground/75">{enrollment.note}</p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {cards.map((card: any, index: number) => {
            const Icon = icons[index] ?? UserCheck;

            return (
              <article
                key={`${card.title}-${index}`}
                className="rounded-2xl p-7 bg-primary/70 border border-primary-foreground/10 shadow-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-5">
                  <Icon size={30} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold leading-tight mb-3">{card.title}</h3>
                <p className="text-base text-primary-foreground/80 leading-relaxed">{card.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={enrollment.cta_url || "#kontakt"}
            className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-12 py-4 text-3xl font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            {enrollment.cta_text}
            <ArrowUpRight size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentSection;
