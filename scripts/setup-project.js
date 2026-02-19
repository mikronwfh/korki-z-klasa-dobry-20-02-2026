#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { createInterface } from 'readline';
import { execSync } from 'child_process';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function setup() {
  console.log('\n🚀 Automatyczna konfiguracja projektu\n');
  console.log('Ten skrypt skonfiguruje:');
  console.log('- Supabase connection (.env.local)');
  console.log('- Database migrations');
  console.log('- README.md');
  console.log('\n---\n');

  // 1. Supabase credentials
  console.log('📌 Potrzebuję danych z Supabase Dashboard');
  console.log('   (Settings → API)\n');
  
  const supabaseUrl = await question('Supabase Project URL: ');
  const supabaseKey = await question('Supabase Anon Key: ');
  
  // Extract project ID from URL
  const projectId = supabaseUrl.match(/https:\/\/(.+)\.supabase\.co/)?.[1];
  
  if (!projectId) {
    console.error('❌ Nieprawidłowy URL Supabase');
    rl.close();
    return;
  }

  // 2. Create .env.local
  const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# App Configuration
VITE_APP_NAME=${getPackageName()}
`;
  
  writeFileSync('.env.local', envContent);
  console.log('\n✅ Utworzono .env.local');
  
  // 3. Update .gitignore
  if (existsSync('.gitignore')) {
    const gitignore = readFileSync('.gitignore', 'utf8');
    if (!gitignore.includes('.env.local')) {
      appendFileSync('.gitignore', '\n# Environment variables\n.env.local\n');
      console.log('✅ Dodano .env.local do .gitignore');
    }
  }

  // 4. Initialize Supabase
  console.log('\n🔧 Inicjalizacja Supabase CLI...');
  
  try {
    if (!existsSync('supabase/config.toml')) {
      execSync('supabase init', { stdio: 'inherit' });
      console.log('✅ Supabase zainicjalizowany');
    }
    
    execSync(`supabase link --project-ref ${projectId}`, { stdio: 'inherit' });
    console.log('✅ Połączono z projektem Supabase');
    
    // 5. Run migrations
    console.log('\n🗄️ Wykonywanie migracji bazy danych...');
    execSync('supabase db push', { stdio: 'inherit' });
    console.log('✅ Migracje wykonane');
    
  } catch (error) {
    console.error('\n⚠️ Błąd podczas konfiguracji Supabase');
    console.error('Możesz spróbować ręcznie:');
    console.error('  supabase link --project-ref ' + projectId);
    console.error('  supabase db push');
  }

  // 6. Generate README
  generateReadme(supabaseUrl, supabaseKey);
  console.log('✅ Wygenerowano README.md');

  // 7. Vercel info
  console.log('\n---\n');
  console.log('🚀 VERCEL DEPLOYMENT\n');
  console.log('Aby wdrożyć na Vercel:');
  console.log('\n1. Zacommituj zmiany:');
  console.log('   git add .');
  console.log('   git commit -m "feat: initial setup"');
  console.log('   git push origin main');
  console.log('\n2. Połącz z Vercel:');
  console.log('   → https://vercel.com/new');
  console.log('   → Import this repository');
  console.log('\n3. Dodaj zmienne środowiskowe:');
  console.log(`   VITE_SUPABASE_URL = ${supabaseUrl}`);
  console.log(`   VITE_SUPABASE_ANON_KEY = ${supabaseKey}`);
  console.log('\n4. Deploy!');
  console.log('\n💡 URL dla klienta:');
  console.log(`   https://${getPackageName()}.vercel.app`);

  console.log('\n🎉 Setup zakończony!\n');
  console.log('Następne kroki:');
  console.log('  npm run dev              # Uruchom dev server');
  console.log('  npm run create-admin     # Utwórz admina');
  console.log('\n');
  
  rl.close();
}

function getPackageName() {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    return pkg.name || 'app';
  } catch {
    return 'app';
  }
}

function generateReadme(supabaseUrl, supabaseKey) {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  
  const readme = `# ${pkg.name}

> Aplikacja webowa z Supabase i Vercel

## 🚀 Quick Start

\`\`\`bash
npm install
npm run setup    # Automatyczna konfiguracja
npm run dev      # Development server
\`\`\`

## ⚙️ Konfiguracja

Projekt skonfigurowany przez \`npm run setup\`.

### Ręczna konfiguracja (opcjonalnie):
1. Skopiuj \`.env.example\` → \`.env.local\`
2. Wypełnij wartości Supabase
3. \`npm run db:migrate\`

## 🗄️ Baza danych

Schema zawiera:
- **profiles** - role użytkowników (admin/editor)
- **site_content** - treści wielojęzyczne (JSONB)
- **gallery_items** - galeria
- **realizations_items** - portfolio
- **contact_messages** - formularze
- **Storage**: \`gallery\`, \`realizations\`

## 🔐 Tworzenie admina

\`\`\`bash
npm run create-admin
\`\`\`

## 🚢 Deployment na Vercel

### Pierwszy raz:
1. Push do GitHub: \`git push origin main\`
2. https://vercel.com/new → Import repo
3. Dodaj env variables:
   - \`VITE_SUPABASE_URL\`
   - \`VITE_SUPABASE_ANON_KEY\`
4. Deploy!

### Kolejne aktualizacje:
\`\`\`bash
git push origin main  # Automatyczny redeploy
\`\`\`

**URL dla klienta:** \`https://${pkg.name}.vercel.app\`

## 🛠️ Komendy

\`\`\`bash
npm run dev             # Dev server
npm run build           # Build produkcyjny
npm run setup           # Auto-setup
npm run db:migrate      # Uruchom migracje
npm run create-admin    # Stwórz admina
\`\`\`

## 📝 Licencja

MIT
`;

  writeFileSync('README.md', readme);
}

setup().catch(console.error);
