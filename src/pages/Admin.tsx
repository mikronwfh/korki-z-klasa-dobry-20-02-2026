import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/services/supabase";

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await auth.getSession();

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session?.user.email) {
        setSessionEmail(data.session.user.email);
        navigate("/admin");
      }
    };

    void loadSession();
  }, [navigate]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await auth.signIn(email, password);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setSessionEmail(data.user?.email ?? data.session?.user.email ?? null);
    setTimeout(() => navigate("/admin"), 500);
  };

  const handleSignOut = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await auth.signOut();

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setSessionEmail(null);
    setMessage("Wylogowano.");
    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle>Panel admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessionEmail ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Zalogowany użytkownik: <span className="font-medium text-foreground">{sessionEmail}</span>
              </p>
              <Button type="button" onClick={handleSignOut} disabled={loading}>
                {loading ? "Wylogowywanie..." : "Wyloguj"}
              </Button>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSignIn}>
              <div className="space-y-1.5">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-password">Hasło</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Logowanie..." : "Zaloguj"}
              </Button>
            </form>
          )}

          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}