# Plan Budowania Strony — Sekcja Po Sekcji

## Status: ANALIZA I PORÓWNANIE

**Data:** 27 luty 2026  
**Strona:** https://korki-z-klasa.vercel.app/  
**Panel Admin:** https://korki-z-klasa.vercel.app/admin

---

## PROBLEM

Liczba i porządek sekcji na stronie głównej **NIE ZGADZAJĄ SIĘ** z tym co jest zdefiniowane w panelu admin.

### Aktualna sytuacja

**Sekcje w panelu admin (lista całkowita):**
1. ✅ Nawigacja (Menu górne)
2. ✅ Oferta (Hero)
3. ✅ Przedmioty (Services)
4. ✅ O nas (About)
5. ✅ Wyróżnienia (Awards)
6. ✅ Cennik (Pricing)
7. ✅ Kursy online (Courses)
8. ✅ Social media
9. ✅ Opinie (Opinions)
10. ✅ Nabór 2026/2027 (Enrollment)
11. ✅ Lokalizacja (Location)
12. ✅ Darmowe materiały (Free Materials)
13. ✅ Kontakt (Contact)
14. ✅ Stopka (Footer)

**Obecny porządek na stronie głównej (Index.tsx):**
1. Navbar
2. HeroSection (Oferta)
3. EnrollmentSection (Nabór 2026/2027)
4. LocationSection (Lokalizacja)
5. ServicesSection (Przedmioty)
6. AboutSection (O nas)
7. AwardsSection (Wyróżnienia)
8. PricingSection (Cennik)
9. CoursePlatformSection (Kursy online)
10. FreeMaterialsSection (Darmowe materiały)
11. OpinionsSection (Opinie)
12. SocialSection (Social media)
13. ContactSection (Kontakt)
14. Footer

---

## CO ZMIENIĆ?

### Linki w nawigacji (Menu górne)

**Obecnie w nawigacji:**
- Oferta → `#uslugi` (Services)
- Nabór 2026/2027 → `#nabor` (Enrollment)
- Lokalizacja → `#lokalizacja` (Location)
- O nas → `#o-mnie` (About)
- Wyróżnienia → `#wyroznienia` (Awards)
- Cennik → `#cennik` (Pricing)
- Darmowe materiały → `#darmowe-materialy` (Free Materials)
- Opinie → `#opinie` (Opinions)
- Kontakt → `#kontakt` (Contact)

**Brakuje w navbarze:**
- ❌ "Kursy online" (powinno być)

---

## PROPONOWANY PORZĄDEK NA STRONIE (SPÓJNY Z ADMINEM)

### Opcja 1: Spójne z listą admin panelu

```
1. Hero Section (Oferta)
   ↓
2. Enrollment Section (Nabór 2026/2027)
   ↓
3. Location Section (Lokalizacja)
   ↓
4. Services Section (Przedmioty)
   ↓
5. About Section (O nas)
   ↓
6. Awards Section (Wyróżnienia)
   ↓
7. Pricing Section (Cennik)
   ↓
8. Courses Section (Kursy online)
   ↓
9. Social Section (Social media)
   ↓
10. Opinions Section (Opinie)
    ↓
11. Free Materials Section (Darmowe materiały)
    ↓
12. Contact Section (Kontakt)
    ↓
13. Footer
```

---

## PLAN DZIAŁAŃ KROK PO KROKU

### FAZA 1: USTALENIE Z KLIENTKĄ
- [ ] Potwierdzić porządek sekcji z klientką
- [ ] Ustalić czy wszystkie 12 sekcji mają być na stronie
- [ ] Sprawdzić czy może brakować jakichś sekcji
- [ ] Zdecydować o ostatecznym porządku

### FAZA 2: KONFIGURACJA NAWIGACJI
- [ ] Zaktualizować nazwy i linki w menu (navbar)
- [ ] Dodać brakujące linki (np. "Kursy online" jeśli ma być)
- [ ] Upewnić się że każdy link wskazuje na poprawny anchor (`#id`)

### FAZA 3: ZMIANA PORZĄDKU NA STRONIE
- [ ] Zmienić porządek sekcji w `Index.tsx`
- [ ] Upewnić się że każda sekcja ma prawidłowy `id` dla anchorów

### FAZA 4: TESTY
- [ ] Sprawdzić linki w navbar
- [ ] Sprawdzić smooth scrolling do sekcji
- [ ] Przetestować responsywność
- [ ] Sprawdzić SEO anchory

---

## MAPOWANIE: Admin → Komponenty

| Admin Panel | ID | Komponent React | Anchor ID |
|---|---|---|---|
| Nawigacja | navigation | Navbar | - |
| Oferta | oferta | HeroSection | `#hero` lub brak |
| Przedmioty | uslugi | ServicesSection | `#uslugi` |
| O nas | o-mnie | AboutSection | `#o-mnie` |
| Wyróżnienia | wyroznienia | AwardsSection | `#wyroznienia` |
| Cennik | cennik | PricingSection | `#cennik` |
| Kursy online | kursy | CoursePlatformSection | `#kursy` |
| Social media | social | SocialSection | `#social` |
| Opinie | opinie | OpinionsSection | `#opinie` |
| Nabór 2026/2027 | nabor | EnrollmentSection | `#nabor` |
| Lokalizacja | lokalizacja | LocationSection | `#lokalizacja` |
| Darmowe materiały | darmowe-materialy | FreeMaterialsSection | `#darmowe-materialy` |
| Kontakt | kontakt | ContactSection | `#kontakt` |
| Stopka | - | Footer | - |

---

## PYTANIA DO KLIENTKI

### Pytanie 1: Porządek sekcji
**Czy ten porządek jest prawidłowy?**
1. Oferta
2. Nabór 2026/2027
3. Lokalizacja
4. Przedmioty
5. O nas
6. Cennik
7. Kursy online
8. Social media
9. Opinie
10. Darmowe materiały
11. Kontakt

### Pytanie 2: Wyróżnienia
**Sekcja "Wyróżnienia" (Orły Edukacji) - gdzie powinna być?**
- [ ] Między "O nas" a "Cennik"
- [ ] Nel innym miejscu
- [ ] Powinna być schowana/niewidoczna w tym mofmencie

### Pytanie 3: Navigacja
**Które sekcje powinny być dostępne z menu górnego (navbar)?**
- [ ] Wszystkie z góry wymienione
- [ ] Tylko najważniejsze
- [ ] Inne

---

## UWAGI TECHNICZNE

- **Brakuje anchor ID** na HeroSection - powinno być `id="oferta"` lub `id="hero"`
- **Linki w navbarze** - obecnie wskazują na ID sekcji w backend (admin)
- **Responsywność menu** - na mobile menu powinno być zwinięte
- **Smooth scroll** - zadbać aby przejścia były płynne

---

## NASTĘPNE KROKI

1. ✏️ Wydrukuj ten dokument i omów z klientką
2. 📋 Wypełnij odpowiedzi na pytania
3. 🔄 Po ustaleniu - dostosuj porządek w kodzie
4. ✅ Wdróż zmiany na produkcji
