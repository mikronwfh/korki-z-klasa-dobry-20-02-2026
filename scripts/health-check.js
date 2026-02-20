#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";

const appPath = "src/App.tsx";
const envPath = ".env.local";

let hasFailure = false;

function pass(message) {
  console.log(`✅ ${message}`);
}

function fail(message) {
  console.error(`❌ ${message}`);
  hasFailure = true;
}

function parseEnvFile(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf("=");
      if (separatorIndex === -1) {
        return acc;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      acc[key] = value;
      return acc;
    }, {});
}

async function checkRouting() {
  if (!existsSync(appPath)) {
    fail(`Brak pliku ${appPath}`);
    return;
  }

  const appSource = readFileSync(appPath, "utf8");
  const hasBrowserRouter = /BrowserRouter/.test(appSource);
  const hasRoutes = /<Routes>|\bRoutes\b/.test(appSource);
  const hasRoute = /<Route\b|\bRoute\b/.test(appSource);

  if (hasBrowserRouter && hasRoutes && hasRoute) {
    pass("Routing (BrowserRouter/Routes/Route) wykryty.");
  } else {
    fail("Routing nie wygląda na poprawnie skonfigurowany w src/App.tsx.");
  }
}

async function checkSupabaseConnection() {
  if (!existsSync(envPath)) {
    fail("Brak .env.local.");
    return;
  }

  const env = parseEnvFile(readFileSync(envPath, "utf8"));
  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey =
    env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    fail("Brak VITE_SUPABASE_URL lub VITE_SUPABASE_ANON_KEY.");
    return;
  }

  if (
    supabaseUrl.includes("your-project-ref") ||
    supabaseAnonKey.includes("your-anon-key")
  ) {
    fail("W .env.local są placeholdery. Uzupełnij dane Supabase.");
    return;
  }

  try {
    const healthUrl = `${supabaseUrl.replace(/\/$/, "")}/auth/v1/settings`;
    const response = await fetch(healthUrl, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!response.ok) {
      fail(`Supabase zwrócił status ${response.status} dla auth settings.`);
      return;
    }

    pass("Połączenie z Supabase działa.");
  } catch (error) {
    fail(`Błąd połączenia z Supabase: ${error.message}`);
  }
}

async function main() {
  console.log("\n🔎 Health-check projektu\n");

  await checkRouting();
  await checkSupabaseConnection();

  if (hasFailure) {
    console.error("\n❌ Health-check zakończony błędami.\n");
    process.exit(1);
  }

  console.log("\n✅ Health-check zakończony sukcesem.\n");
}

main();
