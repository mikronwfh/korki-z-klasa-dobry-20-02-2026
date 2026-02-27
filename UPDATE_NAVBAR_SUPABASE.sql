-- Zaktualizuj dane nawigacji w Supabase
-- Uruchom to zapytanie w Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Opcja 1: UPDATE (jeśli rekord już istnieje)
UPDATE public.site_content
SET content = '{
  "brand_text": "Korki z Klasą",
  "cta_text": "Umów się",
  "cta_href": "#kontakt",
  "links": [
    { "label": "Oferta", "href": "#oferta" },
    { "label": "Nabór 2026/2027", "href": "#nabor" },
    { "label": "Lokalizacja", "href": "#lokalizacja" },
    { "label": "Przedmioty", "href": "#uslugi" },
    { "label": "O nas", "href": "#o-mnie" },
    { "label": "Cennik", "href": "#cennik" },
    { "label": "Kursy online", "href": "#kursy" },
    { "label": "Social media", "href": "#social" },
    { "label": "Opinie", "href": "#opinie" },
    { "label": "Darmowe materiały", "href": "#darmowe-materialy" },
    { "label": "Kontakt", "href": "#kontakt" }
  ]
}'::jsonb,
    published = true
WHERE key = 'site_navbar';

-- Jeśli powyższe nie zadziała, uruchom to (INSERT):
INSERT INTO public.site_content (key, content, published)
VALUES (
  'site_navbar',
  '{
    "brand_text": "Korki z Klasą",
    "cta_text": "Umów się",
    "cta_href": "#kontakt",
    "links": [
      { "label": "Oferta", "href": "#oferta" },
      { "label": "Nabór 2026/2027", "href": "#nabor" },
      { "label": "Lokalizacja", "href": "#lokalizacja" },
      { "label": "Przedmioty", "href": "#uslugi" },
      { "label": "O nas", "href": "#o-mnie" },
      { "label": "Cennik", "href": "#cennik" },
      { "label": "Kursy online", "href": "#kursy" },
      { "label": "Social media", "href": "#social" },
      { "label": "Opinie", "href": "#opinie" },
      { "label": "Darmowe materiały", "href": "#darmowe-materialy" },
      { "label": "Kontakt", "href": "#kontakt" }
    ]
  }'::jsonb,
  true
)
ON CONFLICT (key) DO UPDATE
SET content = excluded.content,
    published = excluded.published;

-- Także zaktualizuj footer (quick_links)
UPDATE public.site_content
SET content = jsonb_set(
  content,
  '{quick_links}',
  '[
    { "label": "Oferta", "hash": "oferta" },
    { "label": "Nabór 2026/2027", "hash": "nabor" },
    { "label": "Lokalizacja", "hash": "lokalizacja" },
    { "label": "Przedmioty", "hash": "uslugi" },
    { "label": "O nas", "hash": "o-mnie" },
    { "label": "Cennik", "hash": "cennik" },
    { "label": "Kursy online", "hash": "kursy" },
    { "label": "Social media", "hash": "social" },
    { "label": "Opinie", "hash": "opinie" },
    { "label": "Darmowe materiały", "hash": "darmowe-materialy" },
    { "label": "Kontakt", "hash": "kontakt" }
  ]'::jsonb
)
WHERE key = 'site_footer';
