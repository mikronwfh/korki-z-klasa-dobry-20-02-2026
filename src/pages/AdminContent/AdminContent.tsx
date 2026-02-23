import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useCtrlS } from "@/hooks/useCtrlS";
import { useToast } from "@/hooks/use-toast";

const defaultHeroContent = {
  title_before: "Matematyka, Chemia,",
  title_highlight: "Angielski",
  title_after: "— zdaj maturę z klasą!",
  subtitle:
    "Korepetycje indywidualne i kursy grupowe w Bolesławcu i online. Profesjonalne przygotowanie do matury i nie tylko.",
  cta_primary_text: "Sprawdź ofertę",
  cta_secondary_text: "Umów lekcję",
};

const defaultServiceItems = [
  {
    title: "Matematyka",
    description: "Korepetycje od podstaw po rozszerzenie. Przygotowanie do matury i egzaminów.",
  },
  {
    title: "Chemia",
    description: "Zrozumiałe tłumaczenie trudnych zagadnień. Kursy maturalne i pomoc bieżąca.",
  },
  {
    title: "Język angielski",
    description: "Konwersacje, gramatyka, przygotowanie do certyfikatów i matury.",
  },
];

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

const defaultPricingContent = {
  subtitle: "CENNIK",
  title: "Sprawdź koszt zajęć",
  description: "",
  plans: [
    {
      name: "Zajęcia indywidualne",
      price: "130",
      unit: "/ lekcję",
      description: "",
      features: [
        "Zajęcia 1 na 1",
        "Dogodny termin i tempo pracy",
        "Stacjonarnie lub online",
      ],
      cta_text: "Zapytaj o termin",
    },
    {
      name: "Kurs grupowy",
      price: "60",
      unit: "/ lekcję",
      description: "",
      features: [
        "Przygotowanie do egzaminów",
        "Małe, kameralne grupy",
        "Terminy stacjonarnie i online",
      ],
      cta_text: "Sprawdź grupy",
    },
  ],
};

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

const defaultSocialContent = {
  subtitle: "Bądź na bieżąco",
  title: "Śledź nas w social mediach",
  card_title: "Facebook",
  card_description:
    "Aktualności, porady naukowe i informacje o nowych kursach. Dołącz do naszej społeczności!",
  handle: "@korkizklasa.boleslawiec →",
  url: "https://www.facebook.com/korkizklasa.boleslawiec",
};

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

const defaultContactContent = {
  subtitle: "Kontakt",
  title: "Napisz do nas",
  description: "Masz pytania? Chętnie pomożemy dobrać odpowiednie zajęcia.",
  email: "korkizklasa.boleslawiec@gmail.com",
  phone: "+48 797 239 237",
  address: "Łokietka 8, Bolesławiec",
  brand_name: "Korki z Klasą Sandra Wilczyńska",
  brand_tagline: "Zajęcia stacjonarne i online",
};

const toFeatureList = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export function AdminContent() {
  const { toast } = useToast();
  const {
    content: heroContent,
    loading: heroLoading,
    error: heroError,
    saveContent: saveHeroContent,
  } = useSiteContent("home_hero");
  const {
    content: servicesContent,
    loading: servicesLoading,
    error: servicesError,
    saveContent: saveServicesContent,
  } = useSiteContent("home_services");
  const {
    content: aboutContent,
    loading: aboutLoading,
    error: aboutError,
    saveContent: saveAboutContent,
  } = useSiteContent("home_about");
  const {
    content: pricingContent,
    loading: pricingLoading,
    error: pricingError,
    saveContent: savePricingContent,
  } = useSiteContent("home_pricing");
  const {
    content: coursesContent,
    loading: coursesLoading,
    error: coursesError,
    saveContent: saveCoursesContent,
  } = useSiteContent("home_courses");
  const {
    content: socialContent,
    loading: socialLoading,
    error: socialError,
    saveContent: saveSocialContent,
  } = useSiteContent("home_social");
  const {
    content: opinionsContent,
    loading: opinionsLoading,
    error: opinionsError,
    saveContent: saveOpinionsContent,
  } = useSiteContent("home_opinions");
  const {
    content: contactContent,
    loading: contactLoading,
    error: contactError,
    saveContent: saveContactContent,
  } = useSiteContent("home_contact");

  const [heroTitleBefore, setHeroTitleBefore] = useState("");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState("");
  const [heroTitleAfter, setHeroTitleAfter] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroCtaPrimary, setHeroCtaPrimary] = useState("");
  const [heroCtaSecondary, setHeroCtaSecondary] = useState("");

  const [serviceItems, setServiceItems] = useState(
    defaultServiceItems.map((item) => ({ ...item }))
  );

  const [aboutLabel, setAboutLabel] = useState("");
  const [aboutName, setAboutName] = useState("");
  const [aboutParagraph1, setAboutParagraph1] = useState("");
  const [aboutParagraph2, setAboutParagraph2] = useState("");
  const [aboutStats, setAboutStats] = useState(defaultAboutContent.stats.map((s) => ({ ...s })));

  const [pricingSubtitle, setPricingSubtitle] = useState("");
  const [pricingTitle, setPricingTitle] = useState("");
  const [pricingDescription, setPricingDescription] = useState("");
  const [pricingPlans, setPricingPlans] = useState(
    defaultPricingContent.plans.map((plan) => ({ ...plan }))
  );

  const [coursesSubtitle, setCoursesSubtitle] = useState("");
  const [coursesTitle, setCoursesTitle] = useState("");
  const [coursesDescription, setCoursesDescription] = useState("");
  const [coursesFeatures, setCoursesFeatures] = useState(
    defaultCoursesContent.features.map((feature) => ({ ...feature }))
  );
  const [coursesCtaText, setCoursesCtaText] = useState("");
  const [coursesCtaUrl, setCoursesCtaUrl] = useState("");

  const [socialSubtitle, setSocialSubtitle] = useState("");
  const [socialTitle, setSocialTitle] = useState("");
  const [socialCardTitle, setSocialCardTitle] = useState("");
  const [socialCardDescription, setSocialCardDescription] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialUrl, setSocialUrl] = useState("");

  const [opinionsSubtitle, setOpinionsSubtitle] = useState("");
  const [opinionsTitle, setOpinionsTitle] = useState("");
  const [opinionsItems, setOpinionsItems] = useState(
    defaultOpinionsContent.items.map((item) => ({ ...item }))
  );

  const [contactSubtitle, setContactSubtitle] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactBrandName, setContactBrandName] = useState("");
  const [contactBrandTagline, setContactBrandTagline] = useState("");

  const handleSaveHero = async () => {
    await saveHeroContent({
      title_before: heroTitleBefore,
      title_highlight: heroTitleHighlight,
      title_after: heroTitleAfter,
      subtitle: heroSubtitle,
      cta_primary_text: heroCtaPrimary,
      cta_secondary_text: heroCtaSecondary,
    });
  };

  const handleSaveServices = async () => {
    await saveServicesContent({
      items: serviceItems,
    });
  };

  const handleSaveAbout = async () => {
    await saveAboutContent({
      label: aboutLabel,
      name: aboutName,
      paragraph_1: aboutParagraph1,
      paragraph_2: aboutParagraph2,
      stats: aboutStats,
    });
  };

  const handleSavePricing = async () => {
    await savePricingContent({
      subtitle: pricingSubtitle,
      title: pricingTitle,
      description: pricingDescription,
      plans: pricingPlans,
    });
  };

  const handleSaveCourses = async () => {
    await saveCoursesContent({
      subtitle: coursesSubtitle,
      title: coursesTitle,
      description: coursesDescription,
      features: coursesFeatures,
      cta_text: coursesCtaText,
      cta_url: coursesCtaUrl,
    });
  };

  const handleSaveSocial = async () => {
    await saveSocialContent({
      subtitle: socialSubtitle,
      title: socialTitle,
      card_title: socialCardTitle,
      card_description: socialCardDescription,
      handle: socialHandle,
      url: socialUrl,
    });
  };

  const handleSaveOpinions = async () => {
    await saveOpinionsContent({
      subtitle: opinionsSubtitle,
      title: opinionsTitle,
      items: opinionsItems,
    });
  };

  const handleSaveContact = async () => {
    await saveContactContent({
      subtitle: contactSubtitle,
      title: contactTitle,
      description: contactDescription,
      email: contactEmail,
      phone: contactPhone,
      address: contactAddress,
      brand_name: contactBrandName,
      brand_tagline: contactBrandTagline,
    });
  };

  const handleSaveAll = useCallback(async () => {
    try {
      await handleSaveHero();
      await handleSaveServices();
      await handleSaveAbout();
      await handleSavePricing();
      await handleSaveCourses();
      await handleSaveSocial();
      await handleSaveOpinions();
      await handleSaveContact();
      toast({
        title: "✓ Zapisano",
        description: "Wszystkie zmiany zostały zapisane pomyślnie",
        duration: 3000,
      });
    } catch (error) {
      const description =
        error instanceof Error
          ? error.message
          : "Nie udało się zapisać zmian. Sprawdź uprawnienia w bazie danych.";
      toast({
        title: "Błąd zapisu",
        description,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [handleSaveHero, handleSaveServices, handleSaveAbout, handleSavePricing, handleSaveCourses, handleSaveSocial, handleSaveOpinions, handleSaveContact, toast]);

  useCtrlS(handleSaveAll);

  useEffect(() => {
    const hero = { ...defaultHeroContent, ...(heroContent?.content ?? {}) };
    setHeroTitleBefore(hero.title_before ?? "");
    setHeroTitleHighlight(hero.title_highlight ?? "");
    setHeroTitleAfter(hero.title_after ?? "");
    setHeroSubtitle(hero.subtitle ?? "");
    setHeroCtaPrimary(hero.cta_primary_text ?? "");
    setHeroCtaSecondary(hero.cta_secondary_text ?? "");
  }, [heroContent]);

  useEffect(() => {
    if (servicesContent?.content?.items) {
      const mergedItems = defaultServiceItems.map((item, index) => {
        const override = servicesContent.content.items[index];
        return {
          title: override?.title ?? item.title,
          description: override?.description ?? item.description,
        };
      });
      setServiceItems(mergedItems);
    } else {
      setServiceItems(defaultServiceItems.map((item) => ({ ...item })));
    }
  }, [servicesContent]);

  useEffect(() => {
    const about = { ...defaultAboutContent, ...(aboutContent?.content ?? {}) };
    setAboutLabel(about.label ?? "");
    setAboutName(about.name ?? "");
    setAboutParagraph1(about.paragraph_1 ?? "");
    setAboutParagraph2(about.paragraph_2 ?? "");
    setAboutStats((about.stats?.length ? about.stats : defaultAboutContent.stats).map((s: any) => ({ ...s })));
  }, [aboutContent]);

  useEffect(() => {
    const pricing = { ...defaultPricingContent, ...(pricingContent?.content ?? {}) };
    setPricingSubtitle(pricing.subtitle ?? "");
    setPricingTitle(pricing.title ?? "");
    setPricingDescription(pricing.description ?? "");
    setPricingPlans(
      (pricing.plans?.length ? pricing.plans : defaultPricingContent.plans).slice(0, 2).map((plan: any) => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : [],
        cta_text: plan.cta_text ?? "Sprawdź",
      }))
    );
  }, [pricingContent]);

  useEffect(() => {
    const courses = { ...defaultCoursesContent, ...(coursesContent?.content ?? {}) };
    setCoursesSubtitle(courses.subtitle ?? "");
    setCoursesTitle(courses.title ?? "");
    setCoursesDescription(courses.description ?? "");
    setCoursesFeatures(
      (courses.features?.length ? courses.features : defaultCoursesContent.features).map((feature: any) => ({
        ...feature,
      }))
    );
    setCoursesCtaText(courses.cta_text ?? "");
    setCoursesCtaUrl(courses.cta_url ?? "");
  }, [coursesContent]);

  useEffect(() => {
    const social = { ...defaultSocialContent, ...(socialContent?.content ?? {}) };
    setSocialSubtitle(social.subtitle ?? "");
    setSocialTitle(social.title ?? "");
    setSocialCardTitle(social.card_title ?? "");
    setSocialCardDescription(social.card_description ?? "");
    setSocialHandle(social.handle ?? "");
    setSocialUrl(social.url ?? "");
  }, [socialContent]);

  useEffect(() => {
    const opinions = { ...defaultOpinionsContent, ...(opinionsContent?.content ?? {}) };
    setOpinionsSubtitle(opinions.subtitle ?? "");
    setOpinionsTitle(opinions.title ?? "");
    setOpinionsItems(
      (opinions.items?.length ? opinions.items : defaultOpinionsContent.items).map((item: any) => ({
        text: item?.text ?? "",
        author: item?.author ?? "",
      }))
    );
  }, [opinionsContent]);

  useEffect(() => {
    const contact = { ...defaultContactContent, ...(contactContent?.content ?? {}) };
    setContactSubtitle(contact.subtitle ?? "");
    setContactTitle(contact.title ?? "");
    setContactDescription(contact.description ?? "");
    setContactEmail(contact.email ?? "");
    setContactPhone(contact.phone ?? "");
    setContactAddress(contact.address ?? "");
    setContactBrandName(contact.brand_name ?? "");
    setContactBrandTagline(contact.brand_tagline ?? "");
  }, [contactContent]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Panel admin</h2>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
          Zapisz wszystko (Ctrl+S)
        </Button>
      </div>

      <section id="oferta" className="space-y-6">
        <h3 className="text-xl font-bold">Oferta</h3>

        {heroLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Oferta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title-before">Matematyka, Chemia,</Label>
                <Input
                  id="hero-title-before"
                  value={heroTitleBefore}
                  onChange={(e) => setHeroTitleBefore(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="hero-title-highlight">Angielski</Label>
                <Input
                  id="hero-title-highlight"
                  value={heroTitleHighlight}
                  onChange={(e) => setHeroTitleHighlight(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="hero-title-after">— zdaj maturę z klasą!</Label>
                <Input
                  id="hero-title-after"
                  value={heroTitleAfter}
                  onChange={(e) => setHeroTitleAfter(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="hero-subtitle">Podtytuł</Label>
                <RichTextEditor
                  content={heroSubtitle}
                  onChange={setHeroSubtitle}
                  placeholder="Korepetycje indywidualne i kursy grupowe..."
                />
              </div>

              <div>
                <Label htmlFor="hero-cta-primary">Sprawdź ofertę</Label>
                <Input
                  id="hero-cta-primary"
                  value={heroCtaPrimary}
                  onChange={(e) => setHeroCtaPrimary(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="hero-cta-secondary">Umów lekcję</Label>
                <Input
                  id="hero-cta-secondary"
                  value={heroCtaSecondary}
                  onChange={(e) => setHeroCtaSecondary(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveHero} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {heroError && <p className="text-red-500 text-sm">{heroError}</p>}
            </CardContent>
          </Card>
        )}

      </section>

      <section id="uslugi" className="space-y-6">
        <h3 className="text-xl font-bold">Nasze usługi</h3>

        {servicesLoading ? (
          <p>Ładowanie usług...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nasze usługi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {serviceItems.map((item, index) => (
                <div key={`service-${index}`} className="space-y-3 rounded-lg border border-border p-4">
                  <div>
                    <Label htmlFor={`service-title-${index}`}>Tytuł</Label>
                    <Input
                      id={`service-title-${index}`}
                      value={item.title}
                      onChange={(e) => {
                        const next = [...serviceItems];
                        next[index] = { ...next[index], title: e.target.value };
                        setServiceItems(next);
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`service-desc-${index}`}>Opis</Label>
                    <RichTextEditor
                      content={item.description}
                      onChange={(html) => {
                        const next = [...serviceItems];
                        next[index] = { ...next[index], description: html };
                        setServiceItems(next);
                      }}
                      placeholder="Opis usługi..."
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <Button onClick={handleSaveServices} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {servicesError && <p className="text-red-500 text-sm">{servicesError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="o-mnie" className="space-y-6">
        <h3 className="text-xl font-bold">O mnie</h3>

        {aboutLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>O mnie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-label">O mnie</Label>
                <Input
                  id="about-label"
                  value={aboutLabel}
                  onChange={(e) => setAboutLabel(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="about-name">Sandra Wilczyńska</Label>
                <Input
                  id="about-name"
                  value={aboutName}
                  onChange={(e) => setAboutName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="about-paragraph-1">Opis 1</Label>
                <RichTextEditor
                  content={aboutParagraph1}
                  onChange={setAboutParagraph1}
                  placeholder="Cześć! Jestem pasjonatką nauczania..."
                />
              </div>

              <div>
                <Label htmlFor="about-paragraph-2">Opis 2</Label>
                <RichTextEditor
                  content={aboutParagraph2}
                  onChange={setAboutParagraph2}
                  placeholder="Moje zajęcia prowadzę w Bolesławcu..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {aboutStats.map((stat, index) => (
                  <div key={`about-stat-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                    <div>
                      <Label htmlFor={`about-stat-value-${index}`}>Wartość</Label>
                      <Input
                        id={`about-stat-value-${index}`}
                        value={stat.value}
                        onChange={(e) => {
                          const next = [...aboutStats];
                          next[index] = { ...next[index], value: e.target.value };
                          setAboutStats(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`about-stat-label-${index}`}>Opis</Label>
                      <Input
                        id={`about-stat-label-${index}`}
                        value={stat.label}
                        onChange={(e) => {
                          const next = [...aboutStats];
                          next[index] = { ...next[index], label: e.target.value };
                          setAboutStats(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveAbout} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {aboutError && <p className="text-red-500 text-sm">{aboutError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="cennik" className="space-y-6">
        <h3 className="text-xl font-bold">Cennik</h3>

        {pricingLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Cennik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pricing-subtitle">Cennik</Label>
                  <Input
                    id="pricing-subtitle"
                    value={pricingSubtitle}
                    onChange={(e) => setPricingSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pricing-title">Sprawdź koszt zajęć</Label>
                  <Input
                    id="pricing-title"
                    value={pricingTitle}
                    onChange={(e) => setPricingTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pricing-description">Opis</Label>
                  <Input
                    id="pricing-description"
                    value={pricingDescription}
                    onChange={(e) => setPricingDescription(e.target.value)}
                  />
                </div>
              </div>

              {pricingPlans.map((plan, index) => (
                <div key={`plan-${index}`} className="space-y-3 rounded-lg border border-border p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`plan-name-${index}`}>Nazwa</Label>
                      <Input
                        id={`plan-name-${index}`}
                        value={plan.name}
                        onChange={(e) => {
                          const next = [...pricingPlans];
                          next[index] = { ...next[index], name: e.target.value };
                          setPricingPlans(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`plan-description-${index}`}>Opis</Label>
                      <Input
                        id={`plan-description-${index}`}
                        value={plan.description}
                        onChange={(e) => {
                          const next = [...pricingPlans];
                          next[index] = { ...next[index], description: e.target.value };
                          setPricingPlans(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`plan-price-${index}`}>Cena</Label>
                      <Input
                        id={`plan-price-${index}`}
                        value={plan.price}
                        onChange={(e) => {
                          const next = [...pricingPlans];
                          next[index] = { ...next[index], price: e.target.value };
                          setPricingPlans(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`plan-unit-${index}`}>Jednostka</Label>
                      <Input
                        id={`plan-unit-${index}`}
                        value={plan.unit}
                        onChange={(e) => {
                          const next = [...pricingPlans];
                          next[index] = { ...next[index], unit: e.target.value };
                          setPricingPlans(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`plan-cta-${index}`}>Tekst przycisku</Label>
                      <Input
                        id={`plan-cta-${index}`}
                        value={plan.cta_text ?? ""}
                        onChange={(e) => {
                          const next = [...pricingPlans];
                          next[index] = { ...next[index], cta_text: e.target.value };
                          setPricingPlans(next);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`plan-features-${index}`}>Lista (po jednej pozycji w linii)</Label>
                    <Textarea
                      id={`plan-features-${index}`}
                      value={plan.features.join("\n")}
                      onChange={(e) => {
                        const next = [...pricingPlans];
                        next[index] = { ...next[index], features: toFeatureList(e.target.value) };
                        setPricingPlans(next);
                      }}
                      rows={4}
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <Button onClick={handleSavePricing} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {pricingError && <p className="text-red-500 text-sm">{pricingError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="kursy" className="space-y-6">
        <h3 className="text-xl font-bold">Kursy online</h3>

        {coursesLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Kursy online — ucz się w swoim tempie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="courses-subtitle">Platforma kursów</Label>
                  <Input
                    id="courses-subtitle"
                    value={coursesSubtitle}
                    onChange={(e) => setCoursesSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="courses-title">Kursy online — ucz się w swoim tempie</Label>
                  <Input
                    id="courses-title"
                    value={coursesTitle}
                    onChange={(e) => setCoursesTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="courses-description">Opis</Label>
                  <Input
                    id="courses-description"
                    value={coursesDescription}
                    onChange={(e) => setCoursesDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {coursesFeatures.map((feature, index) => (
                  <div key={`course-feature-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                    <div>
                      <Label htmlFor={`course-feature-label-${index}`}>Tytuł</Label>
                      <Input
                        id={`course-feature-label-${index}`}
                        value={feature.label}
                        onChange={(e) => {
                          const next = [...coursesFeatures];
                          next[index] = { ...next[index], label: e.target.value };
                          setCoursesFeatures(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`course-feature-desc-${index}`}>Opis</Label>
                      <Input
                        id={`course-feature-desc-${index}`}
                        value={feature.desc}
                        onChange={(e) => {
                          const next = [...coursesFeatures];
                          next[index] = { ...next[index], desc: e.target.value };
                          setCoursesFeatures(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courses-cta-text">Przejdź do platformy kursów</Label>
                  <Input
                    id="courses-cta-text"
                    value={coursesCtaText}
                    onChange={(e) => setCoursesCtaText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="courses-cta-url">Link</Label>
                  <Input
                    id="courses-cta-url"
                    value={coursesCtaUrl}
                    onChange={(e) => setCoursesCtaUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveCourses} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {coursesError && <p className="text-red-500 text-sm">{coursesError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="social" className="space-y-6">
        <h3 className="text-xl font-bold">Social media</h3>

        {socialLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Social media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social-subtitle">Bądź na bieżąco</Label>
                  <Input
                    id="social-subtitle"
                    value={socialSubtitle}
                    onChange={(e) => setSocialSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="social-title">Śledź nas w social mediach</Label>
                  <Input
                    id="social-title"
                    value={socialTitle}
                    onChange={(e) => setSocialTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social-card-title">Tytuł karty</Label>
                  <Input
                    id="social-card-title"
                    value={socialCardTitle}
                    onChange={(e) => setSocialCardTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="social-handle">Handle</Label>
                  <Input
                    id="social-handle"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="social-description">Opis</Label>
                <Textarea
                  id="social-description"
                  value={socialCardDescription}
                  onChange={(e) => setSocialCardDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="social-url">Link</Label>
                <Input
                  id="social-url"
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveSocial} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {socialError && <p className="text-red-500 text-sm">{socialError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="opinie" className="space-y-6">
        <h3 className="text-xl font-bold">Opinie</h3>

        {opinionsLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Opinie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="opinions-subtitle">Podtytuł</Label>
                  <Input
                    id="opinions-subtitle"
                    value={opinionsSubtitle}
                    onChange={(e) => setOpinionsSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="opinions-title">Tytuł</Label>
                  <Input
                    id="opinions-title"
                    value={opinionsTitle}
                    onChange={(e) => setOpinionsTitle(e.target.value)}
                  />
                </div>
              </div>

              {opinionsItems.map((item, index) => (
                <div key={`opinion-${index}`} className="space-y-3 rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">Opinia {index + 1}</p>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={opinionsItems.length <= 1}
                      onClick={() => {
                        if (opinionsItems.length <= 1) return;
                        setOpinionsItems(opinionsItems.filter((_, itemIndex) => itemIndex !== index));
                      }}
                    >
                      Usuń
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor={`opinion-text-${index}`}>Treść opinii</Label>
                    <Textarea
                      id={`opinion-text-${index}`}
                      value={item.text}
                      onChange={(e) => {
                        const next = [...opinionsItems];
                        next[index] = { ...next[index], text: e.target.value };
                        setOpinionsItems(next);
                      }}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`opinion-author-${index}`}>Autor</Label>
                    <Input
                      id={`opinion-author-${index}`}
                      value={item.author}
                      onChange={(e) => {
                        const next = [...opinionsItems];
                        next[index] = { ...next[index], author: e.target.value };
                        setOpinionsItems(next);
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setOpinionsItems([
                      ...opinionsItems,
                      {
                        text: "",
                        author: "",
                      },
                    ])
                  }
                >
                  Dodaj opinię
                </Button>
                <Button onClick={handleSaveOpinions} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {opinionsError && <p className="text-red-500 text-sm">{opinionsError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="kontakt" className="space-y-6">
        <h3 className="text-xl font-bold">Kontakt</h3>

        {contactLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Napisz do nas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contact-subtitle">Kontakt</Label>
                  <Input
                    id="contact-subtitle"
                    value={contactSubtitle}
                    onChange={(e) => setContactSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-title">Napisz do nas</Label>
                  <Input
                    id="contact-title"
                    value={contactTitle}
                    onChange={(e) => setContactTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-description">Opis</Label>
                  <Input
                    id="contact-description"
                    value={contactDescription}
                    onChange={(e) => setContactDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Telefon</Label>
                  <Input
                    id="contact-phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-address">Adres</Label>
                  <Input
                    id="contact-address"
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-brand-name">Korki z Klasą Sandra Wilczyńska</Label>
                  <Input
                    id="contact-brand-name"
                    value={contactBrandName}
                    onChange={(e) => setContactBrandName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-brand-tagline">Zajęcia stacjonarne i online</Label>
                  <Input
                    id="contact-brand-tagline"
                    value={contactBrandTagline}
                    onChange={(e) => setContactBrandTagline(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveContact} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
