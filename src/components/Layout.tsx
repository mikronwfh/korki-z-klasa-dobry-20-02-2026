import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">O nas</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2026 Projekt Template Clean</p>
      </footer>
    </div>
  );
}
