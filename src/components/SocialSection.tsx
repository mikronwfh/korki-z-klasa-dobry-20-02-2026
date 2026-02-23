import { Facebook } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultSocialContent = {
  subtitle: "Bądź na bieżąco",
  title: "Śledź nas w social mediach",
  card_title: "Facebook",
  card_description:
    "Aktualności, porady naukowe i informacje o nowych kursach. Dołącz do naszej społeczności!",
  handle: "@korkizklasa.boleslawiec →",
  url: "https://www.facebook.com/korkizklasa.boleslawiec",
};

const SocialSection = () => {
  const { content } = useSiteContent("home_social");
  const social = { ...defaultSocialContent, ...(content?.content ?? {}) };

  return (
    <section id="social" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            {social.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {social.title}
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="w-16 h-16 rounded-full bg-[hsl(220,70%,50%)]/10 flex items-center justify-center group-hover:bg-[hsl(220,70%,50%)]/20 transition-colors">
              <Facebook size={32} className="text-[hsl(220,70%,50%)]" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{social.card_title}</h3>
            <p className="text-sm text-muted-foreground text-center">{social.card_description}</p>
            <span className="text-sm font-semibold text-primary">{social.handle}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
