# Comprehensive Redesign Plan

Based on stakeholder feedback and design suggestions.

---

## Proposed New Hierarchy (index.astro)

```
1. Hero (overhauled)
2. Why Oyster Mushrooms (burgundy banner)
3. Store  ← MOVED UP
4. Recipe Videos  ← MOVED DOWN
5. Health Benefits (2-col zigzag, not grid)
6. FAQ (4 visible + overlay)
7. The Meaty Difference (compact banner, not grid)
8. Safety & Certifications + Storage (stark bg)
9. Contact Form
10. Footer
```

**Key Goal:** Reduce grid fatigue, increase whitespace variety, move store higher.

---

## Itemized Changes

### 1. Hero Overhaul

- **Headline:** "Farm-Fresh Oyster Mushrooms in Vadakara." (font-weight 700-800)
- **Subtext:** Keep as-is or simplify.
- **3 Badges:** Indoor Farmed, FSSAI Registered, Hygienic Packaging — inline pills.
- **Background:** Add subtle cream/off-white (`#FDFBF7` or similar) to separate from navbar.
- **Buttons:** 
  - Primary (Order Fresh Now): solid maroon (`bg-primary`), bold.
  - Secondary (Watch Videos): ghost button — maroon outline, transparent bg, no bg fill.
- **Alignment:** Vertically center text with image (use `items-center` — already done).

### 2. Store Moved Up

Swap with Recipe Videos. New position is directly after Why Oyster Mushrooms.
- Keep product grid, scarcity badge, how-to steps.
- Elevate cards with subtle drop shadow.

### 3. Recipe Videos Moved Down

Now at position 4 (after Store). Same content.

### 4. Health Benefits: Grid → Zigzag

Replace the 8-card uniform grid with a 2-column alternating layout:

```
[Icon + Title]  |  Description
Description     |  [Icon + Title]
[Icon + Title]  |  Description
```

Use `fa-shield-virus`, `fa-dumbbell`, `fa-sun`, `fa-heart`, `fa-brain`, `fa-seedling`, `fa-fire`, `fa-star`.

Benefit 1, 3, 5, 7: Icon left, text right
Benefit 2, 4, 6, 8: Text left, icon right

### 5. The Difference → Compact Banner

Collapse the 6-card "Why Meaty Mushrooms" grid into a horizontal banner with 3-4 icon+text items. Also merge the key points from Health Benefits + Difference into ONE section to reduce redundancy.

Actually per suggestion: "Merge the strongest points into one section" — keep the 8 benefits as zigzag, then put a slim difference banner just above footer.

### 6. Contact Form

Simple 3-field form (Name, Email, Message) + Submit button, right alongside contact info cards (WhatsApp, Phone, Email, Address).

### 7. Alternating Backgrounds

Use `#F9F9F9` (light gray) for alternating sections:
- Hero: `#FDFBF7` (cream)  
- Why Oyster: `bg-primary` (maroon)
- Store: `bg-white`
- Videos: `bg-[#F9F9F9]`
- Benefits: `bg-white`
- FAQ: `bg-[#F9F9F9]`
- Difference banner: `bg-primary` (maroon)
- Safety: `bg-white`
- Storage: `bg-[#F9F9F9]` (stark)
- Contact: `bg-white`

### 8. Storage Redesign

Use stark background color (`#F9F9F9` or `#F0F0F0`) to break up whitespace. Bold the 4-day fridge limit.

---

## Execution Order

1. Update truth.md with new hierarchy
2. Rewrite index.astro:
   a. Hero section (headline, bg, buttons, alignment)
   b. Store section (moved up, elevated cards)
   c. Videos section (moved down)
   d. Benefits section (zigzag layout)
   e. Difference section (compact banner)
   f. Safety + Storage (stark bg)
   g. Contact form section (new)
3. Build and verify
