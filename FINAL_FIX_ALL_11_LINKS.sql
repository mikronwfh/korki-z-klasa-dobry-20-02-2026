-- FIX: Wstaw ALL 11 LINKÓW do navbar i footer
-- Uruchom w Supabase SQL Editor

-- 1. NAVBAR - 11 linków
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

-- 2. FOOTER - 11 quick_links
DELETE FROM public.site_content WHERE key = 'site_footer';

INSERT INTO public.site_content (key, content, published)
VALUES (
  'site_footer',
  '{
    "brand_text": "Korki z Klasą",
    "description": "Profesjonalne korepetycje i kursy maturalne w Bolesławcu i online.",
    "quick_links": [
      {"label": "Oferta", "hash": "oferta"},
      {"label": "Nabór 2026/2027", "hash": "nabor"},
      {"label": "Lokalizacja", "hash": "lokalizacja"},
      {"label": "Przedmioty", "hash": "uslugi"},
      {"label": "O nas", "hash": "o-mnie"},
      {"label": "Cennik", "hash": "cennik"},
      {"label": "Kursy online", "hash": "kursy"},
      {"label": "Social media", "hash": "social"},
      {"label": "Opinie", "hash": "opinie"},
      {"label": "Darmowe materiały", "hash": "darmowe-materialy"},
      {"label": "Kontakt", "hash": "kontakt"}
    ],
    "facebook_url": "https://www.facebook.com/korkizklasa.boleslawiec",
    "copyright": "© {year} Korki z Klasą — Sandra Wilczyńska. Wszelkie prawa zastrzeżone."
  }'::jsonb,
  true
);
