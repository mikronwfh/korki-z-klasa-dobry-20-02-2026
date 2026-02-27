-- Usuń wpis site_navbar z bazy, aby używać domyślnej nawigacji z kodu
DELETE FROM public.site_content WHERE key = 'site_navbar';
