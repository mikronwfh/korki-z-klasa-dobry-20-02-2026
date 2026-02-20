import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useCtrlS } from "@/hooks/useCtrlS";

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

export function AdminContent() {
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
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [serviceItems, setServiceItems] = useState(
    defaultServiceItems.map((item) => ({ ...item }))
  );

  const handleSaveHero = async () => {
    const updatedContent = {
      title: heroTitle,
      subtitle: heroSubtitle,
      cta_text: heroCtaText,
    };
    await saveHeroContent(updatedContent);
  };

  const handleSaveServices = async () => {
    const updatedContent = {
      items: serviceItems,
    };
    await saveServicesContent(updatedContent);
  };

  const handleSaveAll = async () => {
    await handleSaveHero();
    await handleSaveServices();
    alert("Treść zapisana! (Ctrl+S)");
  };

  useCtrlS(handleSaveAll);

  useEffect(() => {
    if (heroContent?.content) {
      setHeroTitle(heroContent.content.title || "");
      setHeroSubtitle(heroContent.content.subtitle || "");
      setHeroCtaText(heroContent.content.cta_text || "");
    }
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
    }
  }, [servicesContent]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Edycja treści Hero</h2>
      </div>

      {heroLoading ? (
        <p>Ładowanie...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Tytuł</Label>
              <Input
                id="hero-title"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Główny tytuł strony"
              />
            </div>

            <div>
              <Label htmlFor="hero-subtitle">Podtytuł</Label>
              <Input
                id="hero-subtitle"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Krótka charakterystyka"
              />
            </div>

            <div>
              <Label htmlFor="hero-cta">Tekst przycisku CTA</Label>
              <Input
                id="hero-cta"
                value={heroCtaText}
                onChange={(e) => setHeroCtaText(e.target.value)}
                placeholder="Np. Zacznij teraz"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveHero} className="bg-green-600 hover:bg-green-700">
                Zapisz (Ctrl+S)
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
            <CardTitle>Usługi (sekcja "Nasze usługi")</CardTitle>
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
                  <Textarea
                    id={`service-desc-${index}`}
                    value={item.description}
                    onChange={(e) => {
                      const next = [...serviceItems];
                      next[index] = { ...next[index], description: e.target.value };
                      setServiceItems(next);
                    }}
                    rows={3}
                  />
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button onClick={handleSaveServices} className="bg-green-600 hover:bg-green-700">
                Zapisz usługi
              </Button>
            </div>

            {servicesError && <p className="text-red-500 text-sm">{servicesError}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
