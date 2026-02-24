import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteContentPayload = Record<string, unknown>;

interface SiteContentRow<T extends SiteContentPayload = SiteContentPayload> {
  id: string;
  key: string;
  content: T;
  published: boolean;
  updated_at: string;
}

const toFriendlyErrorMessage = (err: unknown, action: "INSERT" | "UPDATE") => {
  const normalizedError = err as { code?: string; message?: string };
  const code = normalizedError.code ?? "";
  const message = normalizedError.message ?? "Nieznany błąd zapisu.";

  if (code === "42501") {
    return "Brak uprawnień do zapisu. Zaloguj się kontem z rolą admin.";
  }

  return `Błąd ${action}: ${message}`;
};

export function useSiteContent<T extends SiteContentPayload = SiteContentPayload>(key: string) {
  const [content, setContent] = useState<SiteContentRow<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);

      const { data, error: err } = await supabase
        .from("site_content")
        .select("*")
        .eq("key", key)
        .maybeSingle();

      if (err) {
        console.error(`[useSiteContent] Błąd ładowania ${key}:`, err);
        setError(err.message);
        setLoading(false);
        return;
      }

      console.log(`[useSiteContent] Załadowano ${key}:`, data);
      setContent(data);
      setLoading(false);
    };

    void loadContent();
  }, [key]);

  const saveContent = async (updatedContent: T) => {
    setError(null);

    if (!content) {
      console.log(`[useSiteContent] INSERT ${key}:`, updatedContent);
      const { data, error: err } = await supabase.from("site_content").insert({
        key,
        content: updatedContent,
        published: true,
      }).select().single();

      if (err) {
        console.error(`[useSiteContent] Błąd INSERT ${key}:`, err);
        const friendlyMessage = toFriendlyErrorMessage(err, "INSERT");
        setError(friendlyMessage);
        throw new Error(friendlyMessage);
      }

      console.log(`[useSiteContent] Zapisano (INSERT) ${key}:`, data);
      setContent(data);
    } else {
      console.log(`[useSiteContent] UPDATE ${key}:`, updatedContent);
      const { data, error: err } = await supabase
        .from("site_content")
        .update({ content: updatedContent })
        .eq("id", content.id)
        .select()
        .single();

      if (err) {
        console.error(`[useSiteContent] Błąd UPDATE ${key}:`, err);
        const friendlyMessage = toFriendlyErrorMessage(err, "UPDATE");
        setError(friendlyMessage);
        throw new Error(friendlyMessage);
      }

      console.log(`[useSiteContent] Zapisano (UPDATE) ${key}:`, data);
      setContent(data);
    }
  };

  return { content, loading, error, saveContent };
}
