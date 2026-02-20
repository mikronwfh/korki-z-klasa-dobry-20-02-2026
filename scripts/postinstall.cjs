const fs = require("fs");

const hasEnv = fs.existsSync(".env");
if (hasEnv) process.exit(0);

console.log(`
Brak pliku .env

Zrób teraz (jednorazowo dla danego klienta/projektu):
  npm run setup

Albo ręcznie:
  skopiuj .env.example -> .env
  i wklej swoje VITE_SUPABASE_URL oraz VITE_SUPABASE_ANON_KEY (Supabase: Settings -> API)
`);
