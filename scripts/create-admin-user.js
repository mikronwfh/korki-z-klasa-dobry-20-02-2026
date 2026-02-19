#!/usr/bin/env node

import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function createAdmin() {
  console.log('\n👤 Tworzenie użytkownika admin\n');
  
  const email = await question('Email: ');
  const password = await question('Hasło: ');
  
  console.log('\n📝 Aby utworzyć admina, wykonaj:\n');
  console.log('1. Otwórz Supabase Dashboard');
  console.log('2. Authentication → Users → "Add user"');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
  console.log('\n3. SQL Editor → New query → Wykonaj:\n');
  console.log('```sql');
  console.log(`UPDATE public.profiles`);
  console.log(`SET role = 'admin'`);
  console.log(`WHERE user_id = (SELECT id FROM auth.users WHERE email = '${email}');`);
  console.log('```\n');
  console.log('✅ Gotowe!\n');
  
  rl.close();
}

createAdmin();
