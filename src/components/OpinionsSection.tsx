import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultOpinionsContent = {
  subtitle: "Opinie",
  title: "Co mówią uczniowie i rodzice",
  items: [
    {
      text:
        "Polecam Panią Sandrę, świetnie tłumaczy i ma ogromną cierpliwość. Dzięki Pani Sandrze matematyka już nie jest aż tak straszna dla mojej córki. Na zajęcia uczęszcza z uśmiechem i co najważniejsze nie boi się powiedzieć, że czegoś nie rozumie.",
      author: "Aneta Śmiałowska",
    },
    {
      text:
        "Bardzo polecam! Przez kilka lekcji nauczyłam się więcej niż w szkole i zdałam maturę poprawką z języka angielskiego. Lekcje są prowadzone w bardzo miłej atmosferze.",
      author: "Klaudia Ziobro",
    },
    {
      text: 'Szczerze polecam zajęcia u Pani Sandry, to naprawdę "Korki z klasą".',
      author: "Aneta Hucał",
    },
    {
      text:
        "Polecam z całego serca. Korzystaliśmy ze wsparcia i córka otrzymała świetne przygotowanie do testów ósmoklasisty, a teraz korzystamy z zajęć indywidualnych. Wykwalifikowana kadra, a Pani Sandra oddaje swoje serce każdemu uczniowi. POLECAM!! PS. Oczywiście będziemy kontynuować współpracę w następnych latach.",
      author: "Karolina Prosół",
    },
    {
      text: "Gorąco polecam, wspaniała nauczycielka. Chemia z Panią Sandrą to sama przyjemność.",
      author: "Julia Hucał",
    },
    {
      text:
        "Naprawdę z czystym sumieniem mogę polecić korepetycje z Sandrą! Sposób nauczania i atmosfera jest świetna, bardzo zachęcająca do zrozumienia tego, z czym mamy problem. Dzięki niej poradziłam sobie z uporczywym dla mnie materiałem i jestem jej za to niezmiernie wdzięczna.",
      author: "Paulina Tyszkiewicz",
    },
    {
      text: "Superanckie korki, świetna atmosfera i pełen profesjonalizm.",
      author: "Marcin Żebrowski",
    },
    {
      text:
        "Bardzo polecam panią Sandrę, bardzo dobrze tłumaczy, świetna atmosfera na zajęciach. Dzięki pani Sandrze więcej rozumiem, a co najważniejsze ma dużo cierpliwości do mnie.",
      author: "Maja Śmiałowska",
    },
  ],
};

const OpinionsSection = () => {
  const { content } = useSiteContent("home_opinions");
  const opinionsContent = { ...defaultOpinionsContent, ...(content?.content ?? {}) };
  const opinions = opinionsContent.items?.length ? opinionsContent.items : defaultOpinionsContent.items;

  return (
    <section id="opinie" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">{opinionsContent.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{opinionsContent.title}</h2>
        </div>

        <div className="max-w-4xl mx-auto max-h-[560px] overflow-y-auto pr-2 space-y-4">
          {opinions.map((opinion, index) => (
            <article key={`${opinion.author}-${index}`} className="glass-card rounded-xl p-6">
              <Quote size={20} className="text-primary mb-3" />
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{opinion.text}</p>
              <p className="text-sm font-semibold text-primary mt-4">— {opinion.author}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpinionsSection;
