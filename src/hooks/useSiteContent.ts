import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const toFriendlyErrorMessage = (err: any, action: "INSERT" | "UPDATE") => {
  const code = err?.code ?? "";
  const message = err?.message ?? "Nieznany błąd zapisu.";

  if (code === "42501") {
    return "Brak uprawnień do zapisu. Zaloguj się kontem z rolą admin.";
  }

  return `Błąd ${action}: ${message}`;
};

export function useSiteContent(key: string) {
  const [content, setContent] = useState<any>(null);
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

  const saveContent = async (updatedContent: any) => {
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
