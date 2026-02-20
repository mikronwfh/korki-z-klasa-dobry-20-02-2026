import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGalleryItems } from "@/hooks/useGalleryItems";
import { useCtrlS } from "@/hooks/useCtrlS";

export function AdminGallery() {
  const { items, loading, error, loadItems, addItem, updateItem, deleteItem } =
    useGalleryItems();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);

  const handleSave = async () => {
    if (!title || !imagePath) {
      alert("Uzupełnij tytuł i ścieżkę zdjęcia");
      return;
    }

    if (editingId) {
      await updateItem(editingId, {
        title,
        image_path: imagePath,
        description,
        published,
      });
      alert("Zaktualizowano");
    } else {
      await addItem({
        title,
        image_path: imagePath,
        description,
        sort_order: items.length,
        published,
      } as Omit<any, "id">);
      alert("Dodano");
    }

    resetForm();
    await loadItems();
  };

  const resetForm = () => {
    setTitle("");
    setImagePath("");
    setDescription("");
    setPublished(true);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title);
    setImagePath(item.image_path);
    setDescription(item.description || "");
    setPublished(item.published);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Czy na pewno usunąć?")) {
      await deleteItem(id);
      await loadItems();
    }
  };

  useCtrlS(handleSave);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Edycja galerii</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edytuj" : "Dodaj"} element galerii</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gal-title">Tytuł</Label>
            <Input
              id="gal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Np. Zdjęcie pracy nr 1"
            />
          </div>

          <div>
            <Label htmlFor="gal-image">Ścieżka zdjęcia</Label>
            <Input
              id="gal-image"
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              placeholder="Np. /images/work1.jpg"
            />
          </div>

          <div>
            <Label htmlFor="gal-desc">Opis</Label>
            <Input
              id="gal-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Krótki opis"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="gal-published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <Label htmlFor="gal-published">Opublikowane</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Zapisz (Ctrl+S)
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
            >
              Anuluj
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-2">Elementy galerii</h3>
        {loading ? (
          <p>Ładowanie...</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">Brak elementów</p>
        ) : (
          <div className="grid gap-3">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.image_path}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.published ? "✓ Opublikowane" : "⊘ Ukryte"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        Edytuj
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        Usuń
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
