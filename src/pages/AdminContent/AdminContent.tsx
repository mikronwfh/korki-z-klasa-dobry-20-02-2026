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

const defaultNavbarContent = {
  brand_text: "Korki z Klasą",
  cta_text: "Umów się",
  cta_href: "#kontakt",
  links: [
    { label: "Oferta", href: "#uslugi" },
    { label: "Nabór 2026/2027", href: "#nabor" },
    { label: "Lokalizacja", href: "#lokalizacja" },
    { label: "O nas", href: "#o-mnie" },
    { label: "Wyróżnienia", href: "#wyroznienia" },
    { label: "Cennik", href: "#cennik" },
    { label: "Darmowe materiały", href: "#darmowe-materialy" },
    { label: "Opinie", href: "#opinie" },
    { label: "Kontakt", href: "#kontakt" },
  ],
};

const defaultServiceItems = [
  {
    title: "Matematyka",
    description: "Szkoła podstawowa i ponadpodstawowa, bieżąca nauka i skuteczne przygotowanie do egzaminów.",
  },
  {
    title: "Chemia",
    description: "Zrozumiałe tłumaczenie zagadnień, przygotowanie do testów, kartkówek i konkursów.",
  },
  {
    title: "Język angielski",
    description: "Szkoła podstawowa, ponadpodstawowa, egzaminy, konwersacje, Business English.",
  },
];

const defaultServicesContent = {
  subtitle: "CO OFERUJEMY",
  title: "Przedmioty",
};

const defaultAboutContent = {
  label: "O nas",
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

const defaultAwardsContent = {
  subtitle: "Laureaci plebiscytu",
  title: "Laureaci Orłów Edukacji 2025 i 2026",
  description_1:
    "Zaufali nam uczniowie i rodzice — i to właśnie ich opinie sprawiły, że zostaliśmy laureatami ogólnopolskiego plebiscytu Orły Edukacji dwa lata z rzędu: 2025 i 2026.",
  description_2:
    "Dla Ciebie to jasny sygnał: trafiasz do miejsca sprawdzonego, skutecznego i rekomendowanego przez innych rodziców. To wyróżnienie potwierdza, że nasze metody naprawdę przynoszą efekty.",
  badges: [
    {
      title: "ORŁY EDUKACJI",
      subtitle: "LAUREAT KONKURSU",
      year: "2025",
    },
    {
      title: "ORŁY EDUKACJI",
      subtitle: "LAUREAT KONKURSU",
      year: "2026",
    },
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

const defaultLocationContent = {
  subtitle: "NASZE LOKALIZACJE I ZAJĘCIA",
  title: "Uczymy stacjonarnie i online — wybierz najlepszą opcję",
  description:
    "Prowadzimy zajęcia stacjonarne w centrum Bolesławca oraz przygotowujemy nową lokalizację w Lubinie. Możesz też uczyć się z nami online — z dowolnego miejsca.",
  note: "",
  cards: [
    {
      title: "Bolesławiec — biuro stacjonarne",
      description: "Zajęcia indywidualne i kursy grupowe w centrum miasta. Spokojna przestrzeń do nauki i łatwy dojazd.",
      status: "active",
    },
    {
      title: "Lubin — w przygotowaniu",
      description: "Nowa lokalizacja w planach otwarcia. Zapisy na listę zainteresowanych już wkrótce.",
      status: "planned",
    },
    {
      title: "Zajęcia online — ucz się z dowolnego miejsca",
      description: "Lekcje indywidualne i kursy przez internet. Ta sama jakość nauczania, bez dojazdów.",
      status: "online",
    },
  ],
  cta_text: "Zapytaj o dostępne miejsca",
  cta_url: "#kontakt",
};

const defaultFreeMaterialsContent = {
  subtitle: "DARMOWE MATERIAŁY",
  title: "YouTube i TikTok",
  introduction: "Na naszych kanałach w mediach społecznościowych znajdziesz darmowe materiały edukacyjne:",
  items: [
    {
      title: "Tłumaczenia zadań egzaminacyjnych",
      icon: "book",
    },
    {
      title: "Powtórki do matury i egzaminu ósmoklasisty",
      icon: "graduate",
    },
    {
      title: "Krótkie lekcje i strategie rozwiązywania zadań",
      icon: "lightbulb",
    },
  ],
  description:
    "To świetny sposób, aby zobaczyć nasze metody w praktyce i skorzystać z wiedzy między zajęciami.",
  youtube_title: "YouTube",
  youtube_url: "https://www.youtube.com/channel/UCgwe_AWW4WE26N7-jwkLU3Q",
  tiktok_title: "TikTok",
  tiktok_url: "https://www.tiktok.com/@korkizklasa",
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

const defaultFooterContent = {
  brand_text: "Korki z Klasą",
  description: "Profesjonalne korepetycje i kursy maturalne w Bolesławcu i online.",
  quick_links: [
    { label: "Oferta", hash: "uslugi" },
    { label: "Nabór 2026/2027", hash: "nabor" },
    { label: "Lokalizacja", hash: "lokalizacja" },
    { label: "O nas", hash: "o-mnie" },
    { label: "Wyróżnienia", hash: "wyroznienia" },
    { label: "Cennik", hash: "cennik" },
    { label: "Darmowe materiały", hash: "darmowe-materialy" },
    { label: "Opinie", hash: "opinie" },
    { label: "Kontakt", hash: "kontakt" },
  ],
  facebook_url: "https://www.facebook.com/korkizklasa.boleslawiec",
  copyright: "© {year} Korki z Klasą — Sandra Wilczyńska. Wszelkie prawa zastrzeżone.",
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
    content: navbarContent,
    loading: navbarLoading,
    error: navbarError,
    saveContent: saveNavbarContent,
  } = useSiteContent("site_navbar");
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
    content: awardsContent,
    loading: awardsLoading,
    error: awardsError,
    saveContent: saveAwardsContent,
  } = useSiteContent("home_awards");
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
    content: enrollmentContent,
    loading: enrollmentLoading,
    error: enrollmentError,
    saveContent: saveEnrollmentContent,
  } = useSiteContent("home_enrollment");
  const {
    content: locationContent,
    loading: locationLoading,
    error: locationError,
    saveContent: saveLocationContent,
  } = useSiteContent("home_location");
  const {
    content: freeMaterialsContent,
    loading: freeMaterialsLoading,
    error: freeMaterialsError,
    saveContent: saveFreeMaterialsContent,
  } = useSiteContent("home_free_materials");
  const {
    content: contactContent,
    loading: contactLoading,
    error: contactError,
    saveContent: saveContactContent,
  } = useSiteContent("home_contact");
  const {
    content: footerContent,
    loading: footerLoading,
    error: footerError,
    saveContent: saveFooterContent,
  } = useSiteContent("site_footer");

  const [heroTitleBefore, setHeroTitleBefore] = useState("");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState("");
  const [heroTitleAfter, setHeroTitleAfter] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroCtaPrimary, setHeroCtaPrimary] = useState("");
  const [heroCtaSecondary, setHeroCtaSecondary] = useState("");

  const [navbarBrandText, setNavbarBrandText] = useState("");
  const [navbarCtaText, setNavbarCtaText] = useState("");
  const [navbarCtaHref, setNavbarCtaHref] = useState("");
  const [navbarLinks, setNavbarLinks] = useState(
    defaultNavbarContent.links.map((link) => ({ ...link }))
  );

  const [servicesSubtitle, setServicesSubtitle] = useState("");
  const [servicesTitle, setServicesTitle] = useState("");
  const [serviceItems, setServiceItems] = useState(
    defaultServiceItems.map((item) => ({ ...item }))
  );

  const [aboutLabel, setAboutLabel] = useState("");
  const [aboutName, setAboutName] = useState("");
  const [aboutParagraph1, setAboutParagraph1] = useState("");
  const [aboutParagraph2, setAboutParagraph2] = useState("");
  const [aboutStats, setAboutStats] = useState(defaultAboutContent.stats.map((s) => ({ ...s })));

  const [awardsSubtitle, setAwardsSubtitle] = useState("");
  const [awardsTitle, setAwardsTitle] = useState("");
  const [awardsDescription1, setAwardsDescription1] = useState("");
  const [awardsDescription2, setAwardsDescription2] = useState("");
  const [awardsBadges, setAwardsBadges] = useState(
    defaultAwardsContent.badges.map((badge) => ({ ...badge }))
  );

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

  const [enrollmentSubtitle, setEnrollmentSubtitle] = useState("");
  const [enrollmentTitle, setEnrollmentTitle] = useState("");
  const [enrollmentDescription, setEnrollmentDescription] = useState("");
  const [enrollmentNote, setEnrollmentNote] = useState("");
  const [enrollmentCards, setEnrollmentCards] = useState(
    defaultEnrollmentContent.cards.map((card) => ({ ...card }))
  );
  const [enrollmentCtaText, setEnrollmentCtaText] = useState("");
  const [enrollmentCtaUrl, setEnrollmentCtaUrl] = useState("");

  const [locationSubtitle, setLocationSubtitle] = useState("");
  const [locationTitle, setLocationTitle] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [locationCards, setLocationCards] = useState(
    defaultLocationContent.cards.map((card) => ({ ...card }))
  );
  const [locationCtaText, setLocationCtaText] = useState("");
  const [locationCtaUrl, setLocationCtaUrl] = useState("");

  const [freeMaterialsSubtitle, setFreeMaterialsSubtitle] = useState("");
  const [freeMaterialsTitle, setFreeMaterialsTitle] = useState("");
  const [freeMaterialsIntroduction, setFreeMaterialsIntroduction] = useState("");
  const [freeMaterialsItems, setFreeMaterialsItems] = useState(
    defaultFreeMaterialsContent.items.map((item) => ({ ...item }))
  );
  const [freeMaterialsDescription, setFreeMaterialsDescription] = useState("");
  const [youtubeTitle, setYoutubeTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokTitle, setTiktokTitle] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  const [contactSubtitle, setContactSubtitle] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactBrandName, setContactBrandName] = useState("");
  const [contactBrandTagline, setContactBrandTagline] = useState("");

  const [footerBrandText, setFooterBrandText] = useState("");
  const [footerDescription, setFooterDescription] = useState("");
  const [footerQuickLinks, setFooterQuickLinks] = useState(
    defaultFooterContent.quick_links.map((link) => ({ ...link }))
  );
  const [footerFacebookUrl, setFooterFacebookUrl] = useState("");
  const [footerCopyright, setFooterCopyright] = useState("");

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

  const handleSaveNavbar = async () => {
    await saveNavbarContent({
      brand_text: navbarBrandText,
      cta_text: navbarCtaText,
      cta_href: navbarCtaHref,
      links: navbarLinks,
    });
  };

  const handleSaveServices = async () => {
    await saveServicesContent({
      subtitle: servicesSubtitle,
      title: servicesTitle,
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

  const handleSaveAwards = async () => {
    await saveAwardsContent({
      subtitle: awardsSubtitle,
      title: awardsTitle,
      description_1: awardsDescription1,
      description_2: awardsDescription2,
      badges: awardsBadges,
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

  const handleSaveEnrollment = async () => {
    await saveEnrollmentContent({
      subtitle: enrollmentSubtitle,
      title: enrollmentTitle,
      description: enrollmentDescription,
      note: enrollmentNote,
      cards: enrollmentCards,
      cta_text: enrollmentCtaText,
      cta_url: enrollmentCtaUrl,
    });
  };

  const handleSaveLocation = async () => {
    await saveLocationContent({
      subtitle: locationSubtitle,
      title: locationTitle,
      description: locationDescription,
      note: locationNote,
      cards: locationCards,
      cta_text: locationCtaText,
      cta_url: locationCtaUrl,
    });
  };

  const handleSaveFreeMaterials = async () => {
    await saveFreeMaterialsContent({
      subtitle: freeMaterialsSubtitle,
      title: freeMaterialsTitle,
      introduction: freeMaterialsIntroduction,
      items: freeMaterialsItems,
      description: freeMaterialsDescription,
      youtube_title: youtubeTitle,
      youtube_url: youtubeUrl,
      tiktok_title: tiktokTitle,
      tiktok_url: tiktokUrl,
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

  const handleSaveFooter = async () => {
    await saveFooterContent({
      brand_text: footerBrandText,
      description: footerDescription,
      quick_links: footerQuickLinks,
      facebook_url: footerFacebookUrl,
      copyright: footerCopyright,
    });
  };

  const handleSaveAll = async () => {
    try {
      await handleSaveHero();
      await handleSaveNavbar();
      await handleSaveServices();
      await handleSaveAbout();
      await handleSaveAwards();
      await handleSavePricing();
      await handleSaveCourses();
      await handleSaveSocial();
      await handleSaveOpinions();
      await handleSaveEnrollment();
      await handleSaveLocation();
      await handleSaveFreeMaterials();
      await handleSaveContact();
      await handleSaveFooter();
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
    const navbar = { ...defaultNavbarContent, ...(navbarContent?.content ?? {}) };
    setNavbarBrandText(navbar.brand_text ?? "");
    setNavbarCtaText(navbar.cta_text ?? "");
    setNavbarCtaHref(navbar.cta_href ?? "");
    setNavbarLinks(
      defaultNavbarContent.links.map((link, index) => {
        const override = navbar.links?.[index];
        return {
          label: override?.label ?? link.label,
          href: override?.href ?? link.href,
        };
      })
    );
  }, [navbarContent]);

  useEffect(() => {
    const services = { ...defaultServicesContent, ...(servicesContent?.content ?? {}) };
    setServicesSubtitle(services.subtitle ?? "");
    setServicesTitle(services.title ?? "");

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
    setAboutStats((about.stats?.length ? about.stats : defaultAboutContent.stats).map((s: (typeof defaultAboutContent.stats)[number]) => ({ ...s })));
  }, [aboutContent]);

  useEffect(() => {
    const awards = { ...defaultAwardsContent, ...(awardsContent?.content ?? {}) };
    setAwardsSubtitle(awards.subtitle ?? "");
    setAwardsTitle(awards.title ?? "");
    setAwardsDescription1(awards.description_1 ?? "");
    setAwardsDescription2(awards.description_2 ?? "");
    setAwardsBadges(
      (awards.badges?.length ? awards.badges : defaultAwardsContent.badges)
        .slice(0, 2)
        .map((badge: (typeof defaultAwardsContent.badges)[number]) => ({
          title: badge?.title ?? "",
          subtitle: badge?.subtitle ?? "",
          year: badge?.year ?? "",
        }))
    );
  }, [awardsContent]);

  useEffect(() => {
    const pricing = { ...defaultPricingContent, ...(pricingContent?.content ?? {}) };
    setPricingSubtitle(pricing.subtitle ?? "");
    setPricingTitle(pricing.title ?? "");
    setPricingDescription(pricing.description ?? "");
    setPricingPlans(
      (pricing.plans?.length ? pricing.plans : defaultPricingContent.plans).slice(0, 2).map((plan: (typeof defaultPricingContent.plans)[number]) => ({
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
      (courses.features?.length ? courses.features : defaultCoursesContent.features).map((feature: (typeof defaultCoursesContent.features)[number]) => ({
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
      (opinions.items?.length ? opinions.items : defaultOpinionsContent.items).map((item: (typeof defaultOpinionsContent.items)[number]) => ({
        text: item?.text ?? "",
        author: item?.author ?? "",
      }))
    );
  }, [opinionsContent]);

  useEffect(() => {
    const enrollment = { ...defaultEnrollmentContent, ...(enrollmentContent?.content ?? {}) };
    setEnrollmentSubtitle(enrollment.subtitle ?? "");
    setEnrollmentTitle(enrollment.title ?? "");
    setEnrollmentDescription(enrollment.description ?? "");
    setEnrollmentNote(enrollment.note ?? "");
    setEnrollmentCards(
      (enrollment.cards?.length ? enrollment.cards : defaultEnrollmentContent.cards).slice(0, 3).map((card: (typeof defaultEnrollmentContent.cards)[number]) => ({
        title: card?.title ?? "",
        description: card?.description ?? "",
      }))
    );
    setEnrollmentCtaText(enrollment.cta_text ?? "");
    setEnrollmentCtaUrl(enrollment.cta_url ?? "");
  }, [enrollmentContent]);

  useEffect(() => {
    const location = { ...defaultLocationContent, ...(locationContent?.content ?? {}) };
    setLocationSubtitle(location.subtitle ?? "");
    setLocationTitle(location.title ?? "");
    setLocationDescription(location.description ?? "");
    setLocationNote(location.note ?? "");
    setLocationCards(
      defaultLocationContent.cards.map((defaultCard, index) => {
        const override = location.cards?.[index];
        return {
          title: override?.title ?? defaultCard.title,
          description: override?.description ?? defaultCard.description,
          status: override?.status ?? defaultCard.status,
        };
      })
    );
    setLocationCtaText(location.cta_text ?? "");
    setLocationCtaUrl(location.cta_url ?? "");
  }, [locationContent]);

  useEffect(() => {
    const freeMaterials = { ...defaultFreeMaterialsContent, ...(freeMaterialsContent?.content ?? {}) };
    setFreeMaterialsSubtitle(freeMaterials.subtitle ?? "");
    setFreeMaterialsTitle(freeMaterials.title ?? "");
    setFreeMaterialsIntroduction(freeMaterials.introduction ?? "");
    setFreeMaterialsItems(
      (freeMaterials.items?.length ? freeMaterials.items : defaultFreeMaterialsContent.items).slice(0, 3).map((item: (typeof defaultFreeMaterialsContent.items)[number]) => ({
        title: item?.title ?? "",
        icon: item?.icon ?? "book",
      }))
    );
    setFreeMaterialsDescription(freeMaterials.description ?? "");
    setYoutubeTitle(freeMaterials.youtube_title ?? "");
    setYoutubeUrl(freeMaterials.youtube_url ?? "");
    setTiktokTitle(freeMaterials.tiktok_title ?? "");
    setTiktokUrl(freeMaterials.tiktok_url ?? "");
  }, [freeMaterialsContent]);

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

  useEffect(() => {
    const footer = { ...defaultFooterContent, ...(footerContent?.content ?? {}) };
    setFooterBrandText(footer.brand_text ?? "");
    setFooterDescription(footer.description ?? "");
    setFooterFacebookUrl(footer.facebook_url ?? "");
    setFooterCopyright(footer.copyright ?? "");
    setFooterQuickLinks(
      defaultFooterContent.quick_links.map((link, index) => {
        const override = footer.quick_links?.[index];
        return {
          label: override?.label ?? link.label,
          hash: override?.hash ?? link.hash,
        };
      })
    );
  }, [footerContent]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Panel admin</h2>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
          Zapisz wszystko (Ctrl+S)
        </Button>
      </div>

      <section id="nawigacja" className="space-y-6">
        <h3 className="text-xl font-bold">Nawigacja</h3>

        {navbarLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Menu górne</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="navbar-brand">Nazwa</Label>
                  <Input
                    id="navbar-brand"
                    value={navbarBrandText}
                    onChange={(e) => setNavbarBrandText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="navbar-cta-text">Tekst CTA</Label>
                  <Input
                    id="navbar-cta-text"
                    value={navbarCtaText}
                    onChange={(e) => setNavbarCtaText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="navbar-cta-href">Link CTA</Label>
                  <Input
                    id="navbar-cta-href"
                    value={navbarCtaHref}
                    onChange={(e) => setNavbarCtaHref(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {navbarLinks.map((link, index) => (
                  <div key={`navbar-link-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                    <div>
                      <Label htmlFor={`navbar-link-label-${index}`}>Etykieta</Label>
                      <Input
                        id={`navbar-link-label-${index}`}
                        value={link.label}
                        onChange={(e) => {
                          const next = [...navbarLinks];
                          next[index] = { ...next[index], label: e.target.value };
                          setNavbarLinks(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`navbar-link-href-${index}`}>Link</Label>
                      <Input
                        id={`navbar-link-href-${index}`}
                        value={link.href}
                        onChange={(e) => {
                          const next = [...navbarLinks];
                          next[index] = { ...next[index], href: e.target.value };
                          setNavbarLinks(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveNavbar} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {navbarError && <p className="text-red-500 text-sm">{navbarError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

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
        <h3 className="text-xl font-bold">Przedmioty</h3>

        {servicesLoading ? (
          <p>Ładowanie usług...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Przedmioty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="services-subtitle">Podtytuł</Label>
                  <Input
                    id="services-subtitle"
                    value={servicesSubtitle}
                    onChange={(e) => setServicesSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="services-title">Tytuł</Label>
                  <Input
                    id="services-title"
                    value={servicesTitle}
                    onChange={(e) => setServicesTitle(e.target.value)}
                  />
                </div>
              </div>

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
        <h3 className="text-xl font-bold">O nas</h3>

        {aboutLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>O nas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-label">O nas</Label>
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

      <section id="wyroznienia" className="space-y-6">
        <h3 className="text-xl font-bold">Wyróżnienia</h3>

        {awardsLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Orły Edukacji</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="awards-subtitle">Podtytuł</Label>
                  <Input
                    id="awards-subtitle"
                    value={awardsSubtitle}
                    onChange={(e) => setAwardsSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="awards-title">Tytuł</Label>
                  <Input
                    id="awards-title"
                    value={awardsTitle}
                    onChange={(e) => setAwardsTitle(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="awards-description-1">Opis 1</Label>
                <Textarea
                  id="awards-description-1"
                  value={awardsDescription1}
                  onChange={(e) => setAwardsDescription1(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="awards-description-2">Opis 2</Label>
                <Textarea
                  id="awards-description-2"
                  value={awardsDescription2}
                  onChange={(e) => setAwardsDescription2(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {awardsBadges.map((badge, index) => (
                  <div key={`awards-badge-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                    <div>
                      <Label htmlFor={`awards-badge-title-${index}`}>Nazwa odznaki</Label>
                      <Input
                        id={`awards-badge-title-${index}`}
                        value={badge.title}
                        onChange={(e) => {
                          const next = [...awardsBadges];
                          next[index] = { ...next[index], title: e.target.value };
                          setAwardsBadges(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`awards-badge-subtitle-${index}`}>Podpis odznaki</Label>
                      <Input
                        id={`awards-badge-subtitle-${index}`}
                        value={badge.subtitle}
                        onChange={(e) => {
                          const next = [...awardsBadges];
                          next[index] = { ...next[index], subtitle: e.target.value };
                          setAwardsBadges(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`awards-badge-year-${index}`}>Rok</Label>
                      <Input
                        id={`awards-badge-year-${index}`}
                        value={badge.year}
                        onChange={(e) => {
                          const next = [...awardsBadges];
                          next[index] = { ...next[index], year: e.target.value };
                          setAwardsBadges(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveAwards} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {awardsError && <p className="text-red-500 text-sm">{awardsError}</p>}
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

      <section id="nabor" className="space-y-6">
        <h3 className="text-xl font-bold">Nabór 2026/2027</h3>

        {enrollmentLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nabór na rok szkolny 2026/2027</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="enrollment-subtitle">Podtytuł</Label>
                  <Input
                    id="enrollment-subtitle"
                    value={enrollmentSubtitle}
                    onChange={(e) => setEnrollmentSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="enrollment-title">Tytuł</Label>
                  <Input
                    id="enrollment-title"
                    value={enrollmentTitle}
                    onChange={(e) => setEnrollmentTitle(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="enrollment-description">Opis główny</Label>
                <Textarea
                  id="enrollment-description"
                  value={enrollmentDescription}
                  onChange={(e) => setEnrollmentDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="enrollment-note">Druga linia opisu</Label>
                <Input
                  id="enrollment-note"
                  value={enrollmentNote}
                  onChange={(e) => setEnrollmentNote(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {enrollmentCards.map((card, index) => (
                  <div key={`enrollment-card-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                    <div>
                      <Label htmlFor={`enrollment-card-title-${index}`}>Tytuł kafla</Label>
                      <Input
                        id={`enrollment-card-title-${index}`}
                        value={card.title}
                        onChange={(e) => {
                          const next = [...enrollmentCards];
                          next[index] = { ...next[index], title: e.target.value };
                          setEnrollmentCards(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`enrollment-card-desc-${index}`}>Opis kafla</Label>
                      <Textarea
                        id={`enrollment-card-desc-${index}`}
                        value={card.description}
                        onChange={(e) => {
                          const next = [...enrollmentCards];
                          next[index] = { ...next[index], description: e.target.value };
                          setEnrollmentCards(next);
                        }}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="enrollment-cta-text">Tekst przycisku</Label>
                  <Input
                    id="enrollment-cta-text"
                    value={enrollmentCtaText}
                    onChange={(e) => setEnrollmentCtaText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="enrollment-cta-url">Link przycisku</Label>
                  <Input
                    id="enrollment-cta-url"
                    value={enrollmentCtaUrl}
                    onChange={(e) => setEnrollmentCtaUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveEnrollment} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {enrollmentError && <p className="text-red-500 text-sm">{enrollmentError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="lokalizacja" className="space-y-6">
        <h3 className="text-xl font-bold">Lokalizacja</h3>

        {locationLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nasza lokalizacja</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location-subtitle">Podtytuł</Label>
                  <Input
                    id="location-subtitle"
                    value={locationSubtitle}
                    onChange={(e) => setLocationSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location-title">Tytuł</Label>
                  <Input
                    id="location-title"
                    value={locationTitle}
                    onChange={(e) => setLocationTitle(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location-description">Opis główny</Label>
                <Textarea
                  id="location-description"
                  value={locationDescription}
                  onChange={(e) => setLocationDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="location-note">Druga linia opisu</Label>
                <Input
                  id="location-note"
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {locationCards.map((card, index) => (
                  <div key={`location-card-${index}`} className="space-y-3 rounded-lg border border-border p-4">
                    <div>
                      <Label htmlFor={`location-card-title-${index}`}>Tytuł kafla</Label>
                      <Input
                        id={`location-card-title-${index}`}
                        value={card.title}
                        onChange={(e) => {
                          const next = [...locationCards];
                          next[index] = { ...next[index], title: e.target.value };
                          setLocationCards(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`location-card-desc-${index}`}>Opis kafla</Label>
                      <Textarea
                        id={`location-card-desc-${index}`}
                        value={card.description}
                        onChange={(e) => {
                          const next = [...locationCards];
                          next[index] = { ...next[index], description: e.target.value };
                          setLocationCards(next);
                        }}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`location-card-status-${index}`}>Status (active/planned/online)</Label>
                      <Input
                        id={`location-card-status-${index}`}
                        value={card.status ?? ""}
                        onChange={(e) => {
                          const next = [...locationCards];
                          next[index] = { ...next[index], status: e.target.value };
                          setLocationCards(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location-cta-text">Tekst przycisku</Label>
                  <Input
                    id="location-cta-text"
                    value={locationCtaText}
                    onChange={(e) => setLocationCtaText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location-cta-url">Link przycisku</Label>
                  <Input
                    id="location-cta-url"
                    value={locationCtaUrl}
                    onChange={(e) => setLocationCtaUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveLocation} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
            </CardContent>
          </Card>
        )}
      </section>

      <section id="darmowe-materialy" className="space-y-6">
        <h3 className="text-xl font-bold">Darmowe materiały</h3>

        {freeMaterialsLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Darmowe materiały: YouTube i TikTok</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="free-materials-subtitle">Podtytuł</Label>
                  <Input
                    id="free-materials-subtitle"
                    value={freeMaterialsSubtitle}
                    onChange={(e) => setFreeMaterialsSubtitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="free-materials-title">Tytuł</Label>
                  <Input
                    id="free-materials-title"
                    value={freeMaterialsTitle}
                    onChange={(e) => setFreeMaterialsTitle(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="free-materials-introduction">Wprowadzenie</Label>
                <Textarea
                  id="free-materials-introduction"
                  value={freeMaterialsIntroduction}
                  onChange={(e) => setFreeMaterialsIntroduction(e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label>3 punkty materiałów (edytuj poniżej):</Label>
                <div className="space-y-3">
                  {freeMaterialsItems.map((item, index) => (
                    <div key={`free-materials-item-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                      <div>
                        <Label htmlFor={`free-materials-item-title-${index}`}>Punkt {index + 1}</Label>
                        <Input
                          id={`free-materials-item-title-${index}`}
                          value={item.title}
                          onChange={(e) => {
                            const next = [...freeMaterialsItems];
                            next[index] = { ...next[index], title: e.target.value };
                            setFreeMaterialsItems(next);
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`free-materials-item-icon-${index}`}>Ikona (book/graduate/lightbulb)</Label>
                        <Input
                          id={`free-materials-item-icon-${index}`}
                          value={item.icon}
                          onChange={(e) => {
                            const next = [...freeMaterialsItems];
                            next[index] = { ...next[index], icon: e.target.value };
                            setFreeMaterialsItems(next);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="free-materials-description">Opis główny</Label>
                <Textarea
                  id="free-materials-description"
                  value={freeMaterialsDescription}
                  onChange={(e) => setFreeMaterialsDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Kanały mediów społecznościowych</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="youtube-title">Tytuł YouTube</Label>
                      <Input
                        id="youtube-title"
                        value={youtubeTitle}
                        onChange={(e) => setYoutubeTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube-url">URL YouTube</Label>
                      <Input
                        id="youtube-url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/channel/..."
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="tiktok-title">Tytuł TikTok</Label>
                      <Input
                        id="tiktok-title"
                        value={tiktokTitle}
                        onChange={(e) => setTiktokTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tiktok-url">URL TikTok</Label>
                      <Input
                        id="tiktok-url"
                        value={tiktokUrl}
                        onChange={(e) => setTiktokUrl(e.target.value)}
                        placeholder="https://www.tiktok.com/@..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveFreeMaterials} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {freeMaterialsError && <p className="text-red-500 text-sm">{freeMaterialsError}</p>}
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

      <section id="stopka" className="space-y-6">
        <h3 className="text-xl font-bold">Stopka</h3>

        {footerLoading ? (
          <p>Ładowanie...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Treści stopki</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="footer-brand">Nazwa</Label>
                  <Input
                    id="footer-brand"
                    value={footerBrandText}
                    onChange={(e) => setFooterBrandText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="footer-facebook">Facebook URL</Label>
                  <Input
                    id="footer-facebook"
                    value={footerFacebookUrl}
                    onChange={(e) => setFooterFacebookUrl(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="footer-description">Opis</Label>
                <Textarea
                  id="footer-description"
                  value={footerDescription}
                  onChange={(e) => setFooterDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="footer-copyright">Copyright (użyj {"{year}"} jako roku)</Label>
                <Input
                  id="footer-copyright"
                  value={footerCopyright}
                  onChange={(e) => setFooterCopyright(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {footerQuickLinks.map((link, index) => (
                  <div key={`footer-link-${index}`} className="space-y-2 rounded-lg border border-border p-3">
                    <div>
                      <Label htmlFor={`footer-link-label-${index}`}>Etykieta</Label>
                      <Input
                        id={`footer-link-label-${index}`}
                        value={link.label}
                        onChange={(e) => {
                          const next = [...footerQuickLinks];
                          next[index] = { ...next[index], label: e.target.value };
                          setFooterQuickLinks(next);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`footer-link-hash-${index}`}>Sekcja (hash)</Label>
                      <Input
                        id={`footer-link-hash-${index}`}
                        value={link.hash}
                        onChange={(e) => {
                          const next = [...footerQuickLinks];
                          next[index] = { ...next[index], hash: e.target.value };
                          setFooterQuickLinks(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveFooter} className="bg-green-600 hover:bg-green-700">
                  Zapisz
                </Button>
              </div>

              {footerError && <p className="text-red-500 text-sm">{footerError}</p>}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
