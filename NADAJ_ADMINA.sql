-- Wykonaj w Supabase Dashboard → SQL Editor

-- Sprawdź swoją rolę (powinno pokazać 'user' lub NULL)
SELECT user_id, role, email 
FROM public.profiles 
JOIN auth.users ON profiles.user_id = auth.users.id
WHERE email = 'TWOJ_EMAIL@example.com';

-- Nadaj sobie rolę admina (zmień email na swój)
UPDATE public.profiles
SET role = 'admin'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'TWOJ_EMAIL@example.com'
);

-- Sprawdź ponownie (powinno pokazać 'admin')
SELECT user_id, role, email 
FROM public.profiles 
JOIN auth.users ON profiles.user_id = auth.users.id
WHERE email = 'TWOJ_EMAIL@example.com';
