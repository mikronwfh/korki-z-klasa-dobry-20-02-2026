import { ExternalLink, Play } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultCoursesContent = {
  subtitle: "Platforma kursów",
  title: "Kursy online — ucz się w swoim tempie",
  description:
    "Dostęp do nagrań lekcji, materiałów i testów 24/7. Platforma WebToLearn umożliwia naukę z dowolnego urządzenia.",
  features: [
    { label: "Nagrania lekcji", desc: "Wideo z objaśnieniami" },
    { label: "Testy online", desc: "Sprawdź swoją wiedzę" },
    { label: "Materiały PDF", desc: "Do pobrania i druku" },
  ],
  cta_text: "Przejdź do platformy kursów",
  cta_url: "https://webtolearn.pl",
};

const CoursePlatformSection = () => {
  const { content } = useSiteContent("home_courses");
  const courses = {
    ...defaultCoursesContent,
    ...(content?.content ?? {}),
  };
  const features = courses.features?.length ? courses.features : defaultCoursesContent.features;
  const icons = [Play, ExternalLink, Play];

  return (
    <section id="kursy" className="section-padding bg-primary">
      <div className="container mx-auto text-center">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
          {courses.subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
          {courses.title}
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
          {courses.description}
        </p>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          {features.map((f: { label: string; desc: string }, index: number) => {
            const Icon = icons[index] ?? Play;
            return (
              <div key={`${f.label}-${index}`} className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                <Icon className="mx-auto mb-3 text-secondary" size={28} />
                <h3 className="font-bold text-primary-foreground mb-1">{f.label}</h3>
                <p className="text-sm text-primary-foreground/60">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <a
          href={courses.cta_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-bold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg"
        >
          {courses.cta_text}
          <ExternalLink size={18} />
        </a>
      </div>
    </section>
  );
};

export default CoursePlatformSection;
