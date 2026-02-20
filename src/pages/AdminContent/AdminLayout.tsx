import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { auth } from "@/services/supabase";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const adminNavItems = [
  { label: "Oferta", hash: "#uslugi" },
  { label: "O mnie", hash: "#o-mnie" },
  { label: "Cennik", hash: "#cennik" },
  { label: "Kursy online", hash: "#kursy" },
  { label: "Kontakt", hash: "#kontakt" },
];

export default function AdminLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await auth.signOut();
      if (error) {
        console.error("Błąd wylogowania:", error);
        alert("Błąd wylogowania: " + error.message);
        setLoading(false);
        return;
      }
      // Wylogowanie udane - przekieruj do logowania
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Błąd wylogowania:", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-card border-b border-border p-4">
        <h1 className="text-lg font-bold">Panel Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-card/50 rounded transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block md:w-64 bg-card border-r border-border w-full md:relative fixed md:static inset-0 top-16 md:top-0 z-40`}
      >
        <div className="hidden md:block p-4 border-b border-border">
          <h1 className="text-xl font-bold">Panel Admin</h1>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {adminNavItems.map((item) => (
            <a
              key={item.label}
              href={item.hash}
              onClick={() => setSidebarOpen(false)}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                location.hash === item.hash
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-border md:absolute md:bottom-4 md:left-4 md:right-4">
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
        <div className="p-3 md:p-4 lg:p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
