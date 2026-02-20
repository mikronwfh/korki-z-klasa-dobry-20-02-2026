import { useEffect, useState } from "react";
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
  {
    title: "Zajęcia indywidualne",
    description: "Dopasowany program do Twoich potrzeb. Elastyczne terminy.",
  },
  {
    title: "Kursy grupowe",
    description: "Małe grupy, intensywna praca. Motywacja i wsparcie rówieśników.",
  },
  {
    title: "Zajęcia online",
    description: "Ucz się z dowolnego miejsca. Pełna interakcja jak na żywo.",
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
  subtitle: "Cennik",
  title: "Przejrzyste ceny",
  description: "Wybierz opcję dopasowaną do Twoich potrzeb. Bez ukrytych kosztów.",
  plans: [
    {
      name: "Pojedyncza lekcja",
      price: "80",
      unit: "/ 60 min",
      description: "Idealne na próbę lub doraźną pomoc",
      features: [
        "Zajęcia indywidualne",
        "Dowolny przedmiot",
        "Stacjonarnie lub online",
        "Elastyczny termin",
      ],
      highlighted: false,
    },
    {
      name: "Pakiet 10 lekcji",
      price: "700",
      unit: "/ 10h",
      description: "Najpopularniejszy wybór — oszczędzasz 100 zł",
      features: [
        "Zajęcia indywidualne",
        "Dowolny przedmiot",
        "Stacjonarnie lub online",
        "Priorytetowe umawianie",
        "Materiały dodatkowe",
      ],
      highlighted: true,
    },
    {
      name: "Kurs maturalny",
      price: "150",
      unit: "/ miesiąc",
      description: "Intensywne przygotowanie w grupie",
      features: [
        "Zajęcia grupowe (max 6 os.)",
        "2 spotkania tygodniowo",
        "Próbne matury",
        "Materiały i testy",
        "Wsparcie online",
      ],
      highlighted: false,
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

  const handleSaveAll = async () => {
    try {
      await handleSaveHero();
      await handleSaveServices();
      await handleSaveAbout();
      await handleSavePricing();
      await handleSaveCourses();
      await handleSaveContact();
      toast({
        title: "✓ Zapisano",
        description: "Wszystkie zmiany zostały zapisane pomyślnie",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Błąd zapisu",
        description: "Nie udało się zapisać zmian. Sprawdź uprawnienia w bazie danych.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

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
      (pricing.plans?.length ? pricing.plans : defaultPricingContent.plans).map((plan: any) => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : [],
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Panel admin</h2>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          Zapisz wszystko (Ctrl+S)
        </Button>
      </div>

      <section id="uslugi" className="space-y-6">
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
                  <Label htmlFor="pricing-title">Przejrzyste ceny</Label>
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
