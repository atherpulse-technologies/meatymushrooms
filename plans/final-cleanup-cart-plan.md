# Final Cleanup + Cart Integration Plan

> Compiled from latest stakeholder directives. All items must be implemented before cart/WhatsApp checkout.

---

## 1. Delete Products Page

| Action | Target |
|--------|--------|
| Delete file | [`src/pages/products.astro`](src/pages/products.astro) |
| Remove nav link | [`Head.astro`](src/components/Head.astro) desktop + mobile nav |
| Remove footer link | [`Footer.astro`](src/components/Footer.astro) Quick Links |

**Rationale**: Products will be sold through the store/cart section on the homepage, not a separate page. The cart system replaces the static products page.

---

## 2. Trim Trust Badges (Hero Section)

**Current badges** (4 items):
- 20kg+ Daily Harvest ✅ KEEP
- FSSAI Certified ✅ KEEP
- Same Day Delivery ❌ REMOVE
- Vadakara Grown Locally ❌ REMOVE

**After**: Only 2 factual badges remain. The grid adjusts from 4 columns to 2.

Target: [`index.astro:181-198`](src/pages/index.astro)

---

## 3. Remove SEO Keyword Paragraph from Hero

Remove this from the hero section:
> "Looking for mushrooms in Vadakara, mushrooms in Kozhikode, mushrooms in Calicut, or Kerala mushrooms? We deliver fresh harvests directly from our farm."

Target: [`index.astro:167-169`](src/pages/index.astro)

---

## 4. Remove "Order on WhatsApp" from Navbar

The navbar CTA button (both desktop + mobile) will be replaced by the cart/store button. Remove:
- Desktop nav WhatsApp button ([`Head.astro:101`](src/components/Head.astro))
- Mobile nav WhatsApp button ([`Head.astro:132`](src/components/Head.astro))
- Keep the "Order on WhatsApp" text for the hero CTA only

---

## 5. Remove "Our Products" Section from Index

Delete the entire Featured Products section:
- Section heading + product cards grid
- "View All Products" link

Target: [`index.astro:1036-1071`](src/pages/index.astro)

The store/cart section will replace this.

---

## 6. Remove Recipes Section from Index

Delete the entire Recipes section:
- Recipe cards (Mushroom Biryani, Creamy Soup, Stir Fry)
- "Browse All Recipes" link

Target: [`index.astro:975-1035`](src/pages/index.astro)

The `/recipes` page already has "Coming Soon". No need for duplicate on index.

---

## 7. Move FAQ Section to Bottom

Move the entire "First Time Buying?" FAQ section to after the Safety & Certifications section (just before Footer).

Current position: Line ~286 (3rd section on page)
New position: After Safety & Certifications section, before Footer

Target: [`index.astro:286-502`](src/pages/index.astro) — cut and move

---

## 8. Fix About Page — Remove Duplicate Content

The About page currently has FSSAI/MSME certification cards. These duplicate the Safety section on the index page. Remove the certifications section from [`about.astro`](src/pages/about.astro), keeping only:
- Page header
- Our Story section
- Our Mission / Why Choose Us
- CTA section

The certifications live exclusively on the index page Safety section.

---

## 9. Add FontAwesome CDN Script

Icons (`<i class="fas fa-...">`) are broken because FontAwesome is not loaded. Add the CDN link to [`seo.astro`](src/components/seo.astro):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
      referrerpolicy="no-referrer" />
```

---

## 10. Update Email to support@meatymushrooms.in

Find and replace all instances:
- `info@meatymushrooms.in` → `support@meatymushrooms.in`

Files affected:
- [`Footer.astro`](src/components/Footer.astro)
- [`seo.astro`](src/components/seo.astro) (if present)
- [`contact.astro`](src/pages/contact.astro)

---

## 11. Fix Footer Social Icons

Current social icons use plain text ("WA", "IG", "FB") in circles. Replace with FontAwesome icons:

```astro
<!-- WhatsApp -->
<a href="https://wa.me/918078937260" ...>
    <i class="fab fa-whatsapp"></i>
</a>
<!-- Instagram -->
<a href="https://www.instagram.com/meatymushrooms" ...>
    <i class="fab fa-instagram"></i>
</a>
<!-- Facebook -->
<a href="https://www.facebook.com/meatymushrooms" ...>
    <i class="fab fa-facebook-f"></i>
</a>
```

Target: [`Footer.astro:12-22`](src/components/Footer.astro)

---

## 12. Page Structure After Cleanup

```
index.astro sections (in order):
1. Hero + Trust Badges (2 items: Daily Harvest, FSSAI)
2. Hook Banner ("Have You Tasted Vegetarian Meat?")
3. Quick Navigation
4. Health Benefits (trimmed)
5. Nutrition Facts  
6. Cooking Videos
7. Safety & Certifications
8. Why Choose Us
9. FAQ (moved to bottom)
10. Footer

Navbar links: Home | Recipes | About | Contact
(No Products link, no WhatsApp CTA button)
```

---

## 13. Cart System Implementation (After Cleanup)

Once cleanup is complete, implement the WhatsApp cart checkout system per [`storeplan.md`](plans/storeplan.md):

1. Copy `storeplan-ref/site-ui.js` → `public/js/site-ui.js` (modify 6 lines)
2. Create `src/data/products.ts` with 4-product catalog
3. Create `src/components/store/CartDrawer.astro`
4. Create `src/components/store/ProductCard.astro`
5. Create `src/components/layout/BaseLayout.astro`
6. Create `src/components/layout/SiteHeader.astro`
7. Create `src/pages/products/[slug].astro`
8. Add store section + cart to index page

---

*Plan compiled 2026-05-29 from stakeholder directives.*
