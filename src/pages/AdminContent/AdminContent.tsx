import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useCtrlS } from "@/hooks/useCtrlS";

export function AdminContent() {
  const { content, loading, error, saveContent } = useSiteContent("home_hero");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");

  const handleSave = async () => {
    const updatedContent = {
      title: heroTitle,
      subtitle: heroSubtitle,
      cta_text: heroCtaText,
    };
    await saveContent(updatedContent);
    alert("Treść zapisana! (Ctrl+S)");
  };

  useCtrlS(handleSave);

  // Pobierz dane z content gdy się załaduje
  useState(() => {
    if (content?.content) {
      setHeroTitle(content.content.title || "");
      setHeroSubtitle(content.content.subtitle || "");
      setHeroCtaText(content.content.cta_text || "");
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Edycja treści Hero</h2>
      </div>

      {loading ? (
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
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Zapisz (Ctrl+S)
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
