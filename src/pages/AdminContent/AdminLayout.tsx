import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { auth } from "@/services/supabase";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { label: "Treść", path: "/admin/content" },
  { label: "Galeria", path: "/admin/gallery" },
  { label: "Realizacje", path: "/admin/realizations" },
  { label: "Wiadomości", path: "/admin/messages" },
];

export default function AdminLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await auth.signOut();
    window.location.href = "/admin";
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold">Panel Admin</h1>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {adminNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleLogout}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? "Wylogowywanie..." : "Wyloguj"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
