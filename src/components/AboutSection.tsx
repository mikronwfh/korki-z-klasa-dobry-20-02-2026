import aboutPhoto from "@/assets/about-photo.jpg";
import { Award, GraduationCap, Heart } from "lucide-react";

const AboutSection = () => (
  <section id="o-mnie" className="section-padding bg-card">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={aboutPhoto}
            alt="Sandra Wilczyńska — korepetytorka"
            className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-secondary flex items-center justify-center shadow-lg">
            <span className="text-2xl font-extrabold text-secondary-foreground">10+</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">O mnie</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
            Sandra Wilczyńska
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Cześć! Jestem pasjonatką nauczania z wieloletnim doświadczeniem w przygotowywaniu uczniów do matury z matematyki, chemii i języka angielskiego. Wierzę, że każdy uczeń może osiągnąć sukces — wystarczy odpowiednie podejście i cierpliwość.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Moje zajęcia prowadzę w Bolesławcu oraz online. Stawiam na zrozumienie tematu, a nie wkuwanie na pamięć. Dołącz do grona zadowolonych uczniów!
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: GraduationCap, label: "Lat doświadczenia", value: "10+" },
              { icon: Heart, label: "Zadowolonych uczniów", value: "500+" },
              { icon: Award, label: "Zdawalność matury", value: "98%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
