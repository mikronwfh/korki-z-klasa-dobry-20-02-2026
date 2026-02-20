import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
        setError(err.message);
        setLoading(false);
        return;
      }

      setContent(data);
      setLoading(false);
    };

    void loadContent();
  }, [key]);

  const saveContent = async (updatedContent: any) => {
    setError(null);

    if (!content) {
      const { error: err } = await supabase.from("site_content").insert({
        key,
        content: updatedContent,
      });

      if (err) {
        setError(err.message);
        return;
      }
    } else {
      const { error: err } = await supabase
        .from("site_content")
        .update({ content: updatedContent })
        .eq("id", content.id);

      if (err) {
        setError(err.message);
        return;
      }
    }

    setContent({ ...content, content: updatedContent });
  };

  return { content, loading, error, saveContent };
}
