import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GalleryItem {
  id: string;
  title: string;
  image_path: string;
  description: string | null;
  sort_order: number;
  published: boolean;
}

export function useGalleryItems() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from("gallery_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  };

  const addItem = async (item: Omit<GalleryItem, "id">) => {
    setError(null);

    const { data, error: err } = await supabase
      .from("gallery_items")
      .insert(item)
      .select()
      .single();

    if (err) {
      setError(err.message);
      return;
    }

    setItems([...items, data]);
  };

  const updateItem = async (id: string, updates: Partial<GalleryItem>) => {
    setError(null);

    const { error: err } = await supabase
      .from("gallery_items")
      .update(updates)
      .eq("id", id);

    if (err) {
      setError(err.message);
      return;
    }

    setItems(
      items.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = async (id: string) => {
    setError(null);

    const { error: err } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", id);

    if (err) {
      setError(err.message);
      return;
    }

    setItems(items.filter((item) => item.id !== id));
  };

  return { items, loading, error, loadItems, addItem, updateItem, deleteItem };
}
