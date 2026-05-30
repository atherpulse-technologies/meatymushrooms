# User-Verified Flaws & Requirements

> Compiled from stakeholder (Bindu N K) verbal feedback transcript, cross-referenced against codebase analysis. Each item includes the stakeholder directive, the code reference confirming the issue, and the prescribed action.

---

## 1. Language & Redesign Strategy

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 1.1 | Drop Malayalam support for now. Focus strictly on English. Translate everything later in one pass. | [`Head.astro:82-149`](src/components/Head.astro) — inline language toggle JS, `data-ml` attributes throughout every page and component | ✅ Confirmed | Remove all `data-ml` attributes, the language toggle buttons, and the `updateLanguageText()` / `toggleLanguage()` functions. Strip the `lang-ml` class logic. Keep only English text. |
| 1.2 | Redesign English-first, then translate later. | Every `.astro` file has dual-language text via `data-ml` | ✅ Confirmed | Redesign with English-only content. Malayalam translation is a separate future task. |

---

## 2. Hero Section

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 2.1 | "Fresh mushroom harvested daily from Vadakara. A complete guide — those seems fine." | [`index.astro:162-167`](src/pages/index.astro) — headline + subheadline | ✅ Confirmed | Keep headline and SEO text largely as-is. Suggestions welcome but not mandatory. |
| 2.2 | Remove proprietor photo (Bindu N K) and name card. Replace with mushroom image only. | [`index.astro:206-209`](src/pages/index.astro) — `<div class="absolute bottom-8...">` with "Bindu N K, Proprietor, Meaty Mushrooms" | ✅ Confirmed | Remove the proprietor name overlay entirely. Keep only the hero mushroom image. |

---

## 3. Trust Badges — REMOVE OR REPLACE

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 3.1 | **"100% Organic" claim is NOT permitted.** Remove it. | [`index.astro:185-186`](src/pages/index.astro) — `"100% Organic"` badge | ✅ Confirmed — also appears in [`farm.astro:37`](src/pages/farm.astro) and [`Navbar.astro:116`](src/components/Navbar.astro) and Why Choose Us section | Remove ALL "100% Organic" claims across every file. |
| 3.2 | **"10kg+ Daily Harvest"** → Change to **"20kg"** (or keep as "Daily Harvest" with no number if unsure). | [`index.astro:189-190`](src/pages/index.astro) — `"10kg+ Daily Harvest"` badge | ✅ Confirmed | Update to "20kg+ Daily Harvest". Also fix contradictions: [`Navbar.astro:119`](src/components/Navbar.astro) says `50kg+` and [`farm.astro:32`](src/pages/farm.astro) says `50kg+`. Unify to 20kg. |
| 3.3 | **"4.9 Star Rating"** — stakeholder doesn't know where this comes from. Remove it. | [`index.astro:197-198`](src/pages/index.astro) — `"4.9 Star Rating"` badge | ✅ Confirmed — no verifiable source for this number | Remove the 4.9 star rating badge. |
| 3.4 | **Replace all badges with "sensible" alternatives.** | All 4 trust badges at [`index.astro:183-200`](src/pages/index.astro) | ✅ Confirmed | Proposed replacements: "Fresh Daily Harvest", "FSSAI Certified", "Same Day Delivery", "Grown in Vadakara" — these are factual and verifiable. |

---

## 4. FAQ / "First Time Buying?" Section — MISPLACED

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 4.1 | "No hesitation, that at the top itself is I don't feel right. Common questions shouldn't be at top." | [`index.astro:286-360`](src/pages/index.astro) — FAQ section appears as the 3rd major section on the page, before health benefits and recipes | ✅ Confirmed — FAQ is too early in the page flow | Move FAQ to after products/cooking videos. It should serve as a final objection-handler, not an early trust-builder. |
| 4.2 | "Relevant questions we have to check." | FAQ modal at [`index.astro:363-502`](src/pages/index.astro) with 10 questions | ✅ Confirmed | Review and prune FAQ questions. Remove any that make unverifiable claims. |

---

## 5. Product Naming — "ELM" OYSTER IS WRONG

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 5.1 | "We are not having elm oyster. It is just oysters. Just remove this elm oyster." | [`index.astro:116`](src/pages/index.astro) — `'Elm Oyster Mushrooms'`, [`products.astro:11`](src/pages/products.astro) — `'Elm Oyster Mushrooms'`, and references throughout health benefits sections | ✅ Confirmed | Global find-and-replace: "Elm Oyster" → "Oyster". Remove all references to `Hypsizygus ulmarius` (the scientific name for Elm Oyster). Use generic "Oyster Mushroom". |

---

## 6. Health Benefits Section — TOO EXTENSIVE FOR INDEX PAGE

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 6.1 | "Too much health benefits before conversion. In index page having this much benefit section is not sensible. People are emotional beings, not scientific thinking beings." | [`index.astro:536-696`](src/pages/index.astro) — 7-card health benefits grid + Vitamin D banner; [`index.astro:699-933`](src/pages/index.astro) — Complete nutritional facts section with macro/micro nutrients | ✅ Confirmed — ~400 lines of dense nutritional science before the products/recipes sections | Move detailed health benefits to a separate `/benefits` sub-page. Keep only a 2-3 line summary teaser on the index with a "Learn More →" link. |
| 6.2 | "Vitamin D all those things fine, but not in this depth." | [`index.astro:652-694`](src/pages/index.astro) — Vitamin D & Anti-Aging section | ✅ Confirmed | Move to `/benefits` sub-page. |

---

## 7. DANGEROUS CLAIMS — REMOVE IMMEDIATELY

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 7.1 | **"High Protein" is a bogus claim** for fresh-weight mushrooms. "It only works when it is dry weight. Usually you sell fresh ones." | Multiple locations: protein claims of 23-39% appear in product descriptions, benefits cards, and nutrition sections | ✅ Confirmed — 23-39% protein is dry-weight basis. Fresh mushrooms are ~3.3g protein per 100g (7% RDA). The "39% protein" claim is misleading for fresh product. | Remove all "High Protein" / "39% protein" claims from product cards and marketing copy. Only mention protein with proper context (e.g., "Contains 3.3g protein per 100g serving"). |
| 7.2 | **"Facing These Issues? Find Your Natural Solution" — ENTIRE SECTION IS DANGEROUS.** | [`Solutions.astro`](src/components/Solutions.astro) — 6 cards claiming mushrooms as "The Solution" for: muscle building, joint pain, diabetes/sugar spikes, low energy, boredom with veggies, high cholesterol | ✅ Confirmed — This is a medical claims liability. "The solution" implies therapeutic treatment. | **DELETE the entire [`Solutions.astro`](src/components/Solutions.astro) component and its usage in [`index.astro:936`](src/pages/index.astro).** Do not replace. |
| 7.3 | "These are very dangerous claims. We are not supposed to give solutions for joint pain or sugar spikes. 'The solution' — that word itself is dangerous. I wouldn't recommend this." | Each card in Solutions.astro ends with "The Solution" header | ✅ Confirmed | Remove without replacement. |
| 7.4 | Health benefit cards claiming: natural COX-2 inhibitor (like Ibuprofen), natural Lovastatin (cholesterol drug), protects pancreatic beta cells, neuro-protective, anti-tumor properties | [`index.astro:550-628`](src/pages/index.astro) — benefits cards with pharmaceutical comparisons | ✅ Confirmed — These are drug-efficacy claims without disclaimer or citation | Remove all drug-comparison language. If health information is kept on a sub-page, add a clear "These statements have not been evaluated by FDA/FSSAI. Not intended to diagnose, treat, cure, or prevent any disease" disclaimer. |

---

## 8. Cooking Videos — KEEP AS-IS

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 8.1 | "Cooking videos and tutorials are very much fine, that's a good one." | [`index.astro:939-978`](src/pages/index.astro) and [`cooking-videos.astro`](src/pages/cooking-videos.astro) | ✅ No issues | Keep the cooking videos section. Real YouTube video IDs are used, thumbnails come from YouTube CDN. This section is authentic. |

---

## 9. Recipes — FAKE, KEEP AS PLACEHOLDER

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 9.1 | "Recipes are basically fake right now. While we are doing the redesign now, you are completely free to just keep the recipes section empty but placeholdered." | [`index.astro:981-1040`](src/pages/index.astro) — 3 recipe cards with stock images; [`recipes.astro`](src/pages/recipes.astro) — 6 recipes with fake reviews and ratings; 3 individual recipe pages exist | ✅ Confirmed — ratings, reviews counts, descriptions are fabricated | Replace recipe cards with placeholder UI: "Recipes Coming Soon — We're preparing authentic mushroom recipes from our kitchen. Subscribe to get notified." Include newsletter/WhatsApp opt-in. Remove fake ratings, reviews, and placeholder images. |
| 9.2 | "This is literally fake. So don't improvise on it." | Recipe data arrays with made-up review counts (24, 18, 31, 15, 12, 8) | ✅ Confirmed | Remove all fake recipe data. Do not create new fake recipes. |

---

## 10. Product Line — ONLY 3 REAL PRODUCTS

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 10.1 | **Only 3 products exist:** Oyster Mushroom, Oyster Mushroom Powder, Oyster Mushroom Achar. | [`products.astro`](src/pages/products.astro) lists 8 products; [`index.astro:114-148`](src/pages/index.astro) lists 3 but includes Pink Oyster as a variant | ✅ Confirmed — 5 of 8 products are marked "Future product" / "ഉടൻ വരുന്നു" | Remove these products entirely: Pink Oyster Mushrooms, Mushroom Biscuits, Mushroom Biryani Mix, Mushroom Papad, Mushroom Curry Paste. Keep only: Oyster Mushroom, Oyster Mushroom Powder, Oyster Mushroom Achar. |
| 10.2 | **Pricing:** Oyster Mushroom ₹100/200g, Powder ₹200/100g, Achar — sensible placeholder. | [`index.astro:121`](src/pages/index.astro) says ₹80/200g; [`products.astro:17`](src/pages/products.astro) says ₹80/200g; [`Navbar.astro:399`](src/components/Navbar.astro) says ₹60/250g | ✅ Confirmed — pricing is inconsistent across files | Set definitive prices: ₹100/200g for fresh Oyster, ₹200/100g for Powder, ₹150/250g for Achar (suggested placeholder). Update in ALL locations. |

---

## 11. "The Meaty Mushrooms Difference" — FIX CLAIMS

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 11.1 | **"100% Organic" is bogus.** Remove. | [`index.astro:1099`](src/pages/index.astro) — first feature card | ✅ Confirmed | Remove or replace with "Chemical-Free Growing" or "No Pesticides Used" if verifiable. |
| 11.2 | **"Lab Tested" is not true.** Remove. | [`index.astro:1117`](src/pages/index.astro) — third feature card | ✅ Confirmed | Remove. Replace with "FSSAI Registered" (which IS verified — registration number exists at line 1169). |
| 11.3 | **"Same Day Delivery"** — can claim. | [`index.astro:1108`](src/pages/index.astro) | ✅ Keep | Keep this claim. |
| 11.4 | **"Local Community"** — "We are not supporting local farmers, we are a standalone farm." Remove or rephrase. | [`index.astro:1127`](src/pages/index.astro) | ✅ Confirmed | Remove "Supporting local farmers" language. Rephrase to "Vadakara-Based Farm" or "Proudly Local, Grown in Kerala." |
| 11.5 | **"Sustainable Farming"** — right. | [`index.astro:1136`](src/pages/index.astro) | ✅ Keep | Keep with current wording. |
| 11.6 | **"Expert Support"** — fine. | [`index.astro:1144`](src/pages/index.astro) | ✅ Keep | Keep. |

---

## 12. Food Safety & Certifications — ADJUST DETAILS

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 12.1 | FSSAI and MSME registrations are good. Keep them. | [`index.astro:1152-1197`](src/pages/index.astro) | ✅ Keep | Keep the FSSAI and MSME registration cards. Verify the registration numbers displayed match actual certificates. |
| 12.2 | **Cold storage: 7 days → 4 days.** "People sometimes overstock or overkeep." | [`index.astro:1213`](src/pages/index.astro) — "7 Days In Refrigerator" | ✅ Confirmed | Change shelf life claim from "7 days" to "4 days" for refrigerator storage. |

---

## 13. Farm Page — REMOVE

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 13.1 | "Our farm better you remove this thing it is not required." | [`farm.astro`](src/pages/farm.astro) — full farm page with cultivation process, climate control details, community section | ✅ Confirmed | Remove the `/farm` route. Remove the "Our Farm" link from navigation. If farm information is needed, integrate a brief paragraph into the About page. |

---

## 14. Contact Section — REDESIGN

| # | Stakeholder Directive | Code Reference | Verified? | Action |
|---|----------------------|----------------|-----------|--------|
| 14.1 | "Contact section should have our maps location and tips to reach from, by train, by bus etc. Then after that contact numbers, email." | Current contact section in [`index.astro:1008-1055`](src/pages/index.astro) via Navbar.astro has: phone/WhatsApp/email icons, Google Maps iframe with **wrong location (Melbourne, Australia)** | ✅ Confirmed — maps location is completely wrong | Build a proper contact section with: (1) Google Maps embed with correct Vadakara coordinates (~11.6085, 75.5917), (2) Written directions: "By Train: Nearest station is Vadakara Railway Station (2 km). By Bus: Vadakara KSRTC Bus Stand (1.5 km). By Road: Located on Keethadi Road, Makkoolpeedika.", (3) Phone + WhatsApp + Email below the directions. |
| 14.2 | "Instead of just clicking on contact button directly going to whatsapp." | Navigation bar CTA at [`Head.astro:180`](src/components/Head.astro) links directly to `wa.me/918078937260` for both "Order Now" and "Contact" | ✅ Confirmed | Change the nav "Contact" link to point to `#contact` (the contact section on the page) or `/contact`. Keep "Order Now" as WhatsApp but add a dedicated Contact page/section. |

---

## 15. Additional Code-Level Issues (Verified by Zoo)

| # | Issue | Code Reference | Action |
|---|-------|----------------|--------|
| 15.1 | **robots.txt is empty** — needs sitemap URL and crawl directives. | [`robots.txt`](public/robots.txt) | Add `Sitemap: https://meatymushrooms.in/sitemap-index.xml` and `Allow: /` |
| 15.2 | **Backup files pollute repo** — `index.astro.bak`, `index.astro.v2.bak`, `Head.astro.v2.bak` | Root of `src/pages/` and `src/components/` | Delete all `.bak` and `.v2.bak` files. |
| 15.3 | **`receipemal.md` in pages directory** generates an unintended route at `/receipemal`. | [`receipemal.md`](src/pages/receipemal.md) | Move to `src/content/` or delete. |
| 15.4 | **Two navbar color schemes** — `Head.astro` uses burgundy (`#8B1E3F`), `Navbar.astro` uses forest green (`#3A493E`). | Both files | Consolidate to ONE. Since stakeholder didn't object to the burgundy, standardize on `#8B1E3F`. |
| 15.5 | **About and Contact pages are stubs** with placeholder text. | [`about.astro`](src/pages/about.astro), [`contact.astro`](src/pages/contact.astro) | Build real content. About page: farm story, founder story, mission, certifications. Contact page: map, directions, phone, email, WhatsApp. |
| 15.6 | **Footer links to non-existent pages**: Privacy Policy, Terms of Service, Shipping Info. | [`Footer.astro:90-92`](src/components/Footer.astro) | Create these pages or remove the links. |

---

## Revised Product Catalog

| # | Product | Price | Status |
|---|---------|-------|--------|
| 1 | Fresh Oyster Mushroom (Trial Pack) | ₹50 / 100g | ✅ Available |
| 2 | Fresh Oyster Mushroom (Value Pack) | ₹100 / 200g | ✅ Available |
| 3 | Oyster Mushroom Powder (Dried) | ₹200 / 100g | ✅ Available |
| 4 | Oyster Mushroom Achar (Pickle) | ₹150 / 250g | ✅ Available |

> The 100g and 200g fresh packs are separate cart items. The 200g pack offers the same unit price as the trial pack but in a larger quantity for regular users.

All other products (Pink Oyster, Biscuits, Biryani Mix, Papad, Curry Paste) are **removed**.

---

## Revised Page Structure

```
/                         Homepage (redesigned per this doc)
/about                    Real about page (farm story, founder, certifications)
/contact                  Real contact page (map, directions, phone, email)
/products                 Product listing (4 products in 3 categories)
/products/[slug]          Individual product detail pages
/recipes                  Placeholder "Coming Soon" with newsletter signup
/recipes/recipe-*         REMOVE all individual recipe pages (fake content)
/cooking-videos           Keep as-is
/benefits                 NEW: Health & nutrition sub-page (moved from index)
/farm                     REMOVE
/privacy                  NEW (or remove footer link)
/terms                    NEW (or remove footer link)
/shipping                 NEW (or remove footer link)
```

---

*Cross-referenced against codebase by Zoo on 2026-05-29. Stakeholder feedback transcript provided by Bindu N K.*
