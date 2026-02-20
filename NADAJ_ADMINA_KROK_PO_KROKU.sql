-- =====================================================
-- KROK 1: Sprawdź czy masz konto (zmień email!)
-- =====================================================
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'TWOJ_EMAIL@example.com';

-- Jeśli nie ma wyniku - musisz się najpierw zarejestrować w panelu


-- =====================================================
-- KROK 2: Sprawdź czy masz profil
-- =====================================================
SELECT p.user_id, p.role, u.email
FROM public.profiles p
JOIN auth.users u ON p.user_id = u.id
WHERE u.email = 'TWOJ_EMAIL@example.com';

-- Jeśli nie ma wyniku lub role = 'user' → brak uprawnień admin


-- =====================================================
-- KROK 3: Nadaj rolę admin (ZMIEŃ EMAIL!)
-- =====================================================
UPDATE public.profiles
SET role = 'admin'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'TWOJ_EMAIL@example.com'
);

-- Powinieneś zobaczyć: "UPDATE 1"


-- =====================================================
-- KROK 4: Sprawdź czy zadziałało
-- =====================================================
SELECT p.user_id, p.role, u.email
FROM public.profiles p
JOIN auth.users u ON p.user_id = u.id
WHERE u.email = 'TWOJ_EMAIL@example.com';

-- Powinno pokazać: role = 'admin'


-- =====================================================
-- KROK 5: Sprawdź czy funkcja is_admin() działa
-- =====================================================
-- (wykonaj to BĘDĄC ZALOGOWANYM w panelu admin)
SELECT public.is_admin();

-- Powinno zwrócić: true
