-- POPRAWKA: Wstaw PRAWIDŁOWE dane nawigacji z ALL 11 LINKAMI
-- Uruchom to w Supabase SQL Editor

DELETE FROM public.site_content WHERE key = 'site_navbar';

INSERT INTO public.site_content (key, content, published)
VALUES (
  'site_navbar',
  '{
    "brand_text": "Korki z Klasą",
    "cta_text": "Umów się",
    "cta_href": "#kontakt",
    "links": [
      {"label": "Oferta", "href": "#oferta"},
      {"label": "Nabór 2026/2027", "href": "#nabor"},
      {"label": "Lokalizacja", "href": "#lokalizacja"},
      {"label": "Przedmioty", "href": "#uslugi"},
      {"label": "O nas", "href": "#o-mnie"},
      {"label": "Cennik", "href": "#cennik"},
      {"label": "Kursy online", "href": "#kursy"},
      {"label": "Social media", "href": "#social"},
      {"label": "Opinie", "href": "#opinie"},
      {"label": "Darmowe materiały", "href": "#darmowe-materialy"},
      {"label": "Kontakt", "href": "#kontakt"}
    ]
  }'::jsonb,
  true
);
