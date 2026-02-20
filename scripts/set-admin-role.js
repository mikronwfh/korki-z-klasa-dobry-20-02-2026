import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cbnvqkbthhjftjlgqfwv.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibnZxa2J0aGhqZnRqbGdxZnd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU3ODQ4MiwiZXhwIjoyMDg3MTU0NDgyfQ.Yo621xlLVKSKO5emAwo-XgFQl_NtCmBI71UhH8o_Fh8';
const EMAIL = 'sandrawilczynska@interia.pl';

async function setAdminRole() {
  try {
    console.log('🔗 Łączenie z Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Step 1: Sprawdzenie current user (jeśli logged in)
    console.log('\n📍 Step 1: Sprawdzanie current user...');
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();
    console.log('Current user:', currentUser?.email || 'niemam zalogowanego user (to OK)');

    // Step 2: Get user ID by email
    console.log('\n📍 Step 2: Szukam user_id dla email:', EMAIL);
    const { data: authUsers, error: userSearchError } = await supabase.auth.admin.listUsers();

    if (userSearchError) {
      console.error('❌ Błąd szukania user:', userSearchError.message);
      process.exit(1);
    }

    const authUser = authUsers?.users?.find((u) => u.email === EMAIL);
    if (!authUser) {
      console.error('❌ Nie znalazłem user z email:', EMAIL);
      console.log('Dostępni users:', authUsers?.users?.map((u) => u.email));
      process.exit(1);
    }

    console.log('✓ Znalazłem user:', {
      user_id: authUser.id,
      email: authUser.email,
    });

    // Step 3: Check current profile
    console.log('\n📍 Step 3: Sprawdzam profile...');
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, role')
      .eq('user_id', authUser.id);

    if (profileError) {
      console.error('❌ Błąd czytania profile:', profileError.message);
      process.exit(1);
    }

    const profile = profiles?.[0];
    console.log('Current profile:', profile);

    // Step 4: Update role to admin
    if (!profile || profile.role !== 'admin') {
      console.log('\n📍 Step 4: Przywracam rolę na "admin"...');
      const { data: updated, error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('user_id', authUser.id)
        .select();

      if (updateError) {
        console.error('❌ Błąd update:', updateError.message);
        process.exit(1);
      }

      console.log('✓ Role zaktualizowany!', updated?.[0]);
    } else {
      console.log('✓ Już ma rolę admin');
    }

    console.log('\n✅ SUKCES! Teraz:');
    console.log('1. Wyloguj się z /admin');
    console.log('2. Zaloguj się ponownie');
    console.log('3. Testuj Ctrl+S - powinno zapisywać!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Nieoczekiwany błąd:', error?.message);
    console.log('\nJeśli widzisz błąd o RLS/permissions - potrzebuję Service Role Key');
    process.exit(1);
  }
}

setAdminRole();
