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
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={aboutPhoto}
              alt="Sandra Wilczyńska — korepetytorka"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">{about.label}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
              {about.name}
            </h2>
            <div 
              className="text-muted-foreground leading-relaxed mb-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.paragraph_1 }}
            />
            <div 
              className="text-muted-foreground leading-relaxed mb-8 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.paragraph_2 }}
            />

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, index) => {
                const Icon = statIcons[index] ?? GraduationCap;
                return (
                  <div key={`${s.label}-${index}`} className="text-center">
                    <Icon className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
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
