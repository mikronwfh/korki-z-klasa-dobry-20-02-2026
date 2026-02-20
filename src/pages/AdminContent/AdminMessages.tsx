import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setMessages(data || []);
      setLoading(false);
    };

    void loadMessages();
  }, []);

  const markAsRead = async (id: string) => {
    await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);

    setMessages(
      messages.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const deleteMessage = async (id: string) => {
    if (confirm("Usunąć?")) {
      await supabase.from("contact_messages").delete().eq("id", id);
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wiadomości z formularza</h2>

      {loading ? (
        <p>Ładowanie...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">Brak wiadomości</p>
      ) : (
        <div className="grid gap-3">
          {messages.map((msg) => (
            <Card key={msg.id} className={msg.is_read ? "" : "border-primary"}>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{msg.name}</p>
                      <p className="text-sm text-muted-foreground">{msg.email}</p>
                      {msg.phone && (
                        <p className="text-sm text-muted-foreground">{msg.phone}</p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        msg.is_read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {msg.is_read ? "Przeczytane" : "Nowe"}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleString("pl-PL")}
                  </p>
                </div>

                <div className="flex gap-2 mt-3">
                  {!msg.is_read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsRead(msg.id)}
                    >
                      Oznacz jako przeczytane
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Usuń
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
