import aboutPhoto from "@/assets/about-photo.jpg";
import { Award, GraduationCap, Heart } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultAboutContent = {
  label: "O mnie",
  name: "Sandra Wilczyńska",
  paragraph_1:
    "Cześć! Jestem pasjonatką nauczania z wieloletnim doświadczeniem w przygotowywaniu uczniów do matury z matematyki, chemii i języka angielskiego. Wierzę, że każdy uczeń może osiągnąć sukces — wystarczy odpowiednie podejście i cierpliwość.",
  paragraph_2:
    "Moje zajęcia prowadzę w Bolesławcu oraz online. Stawiam na zrozumienie tematu, a nie wkuwanie na pamięć. Dołącz do grona zadowolonych uczniów!",
  stats: [
    { label: "Lat doświadczenia", value: "10+" },
    { label: "Zadowolonych uczniów", value: "500+" },
    { label: "Zdawalność matury", value: "98%" },
  ],
};

const AboutSection = () => {
  const { content } = useSiteContent("home_about");
  const about = {
    ...defaultAboutContent,
    ...(content?.content ?? {}),
  };

  const stats = about.stats?.length ? about.stats : defaultAboutContent.stats;
  const statIcons = [GraduationCap, Heart, Award];

  return (
    <section id="o-mnie" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <img
                src={aboutPhoto}
                alt="Sandra Wilczyńska — korepetytorka"
                className="rounded-2xl shadow-2xl w-full h-auto object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">{about.label}</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              {about.name}
            </h2>
            <div 
              className="text-base text-muted-foreground leading-relaxed mb-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.paragraph_1 }}
            />
            <div 
              className="text-base text-muted-foreground leading-relaxed mb-8 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.paragraph_2 }}
            />

            <div className="grid grid-cols-3 gap-6">
              {stats.map((s, index) => {
                const Icon = statIcons[index] ?? GraduationCap;
                return (
                  <div key={`${s.label}-${index}`} className="rounded-xl bg-muted/40 p-4 text-center h-fit">
                    <Icon className="mx-auto mb-3 text-primary" size={28} />
                    <p className="text-2xl font-bold text-foreground mb-1">{s.value}</p>
                    <p className="text-xs font-medium text-muted-foreground leading-snug">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
