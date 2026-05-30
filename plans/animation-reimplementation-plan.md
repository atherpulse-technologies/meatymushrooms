# Animation Reimplementation Plan

> Current state: `animate-float` and `order-spinner` exist but may not be working in Tailwind v4.
> This plan reimplements ALL animations cleanly in `styles.css` with Tailwind v4 compatibility.

---

## Root Cause Analysis

The existing `animate-float` class is defined in [`src/components/Head.astro`](src/components/Head.astro) inside a `<style is:global>` block. The `order-spinner` is in [`src/assets/css/styles.css`](src/assets/css/styles.css). Both use standard `@keyframes` and should work. However, Tailwind v4 uses a new CSS-first configuration and some utility classes like `hover:scale-105` rely on the Tailwind `transform` and `transition` utilities being properly loaded.

---

## Implementation: 4 Animations, All in `styles.css`

### Where to add: [`src/assets/css/styles.css`](src/assets/css/styles.css)

### No changes needed to: any `.astro` file — animations will be applied via existing Tailwind classes and utility additions.

---

### Animation 1: Hero Image Float (already exists)

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}
```

**Status: Already in Head.astro.** If not working, move to `styles.css`.

---

### Animation 2: Order Spinner (already exists)

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.order-spinner {
  border-top-color: #8B1E3F;
  animation: spin 0.8s linear infinite;
}
```

**Status: Already in styles.css.** Confirm the `border-top-color` renders with Tailwind v4 (hex values are fine in CSS).

---

### Animation 3: Hover Scale on Product Card Images

Currently uses `group-hover:scale-105 transition-transform duration-300` on the `<img>` tag in [`src/components/store/ProductCard.astro:14`](src/components/store/ProductCard.astro).

**If not working:** The `group-hover` and `transition-transform` utilities need the parent to have `class="group"`, which already exists on the `<a>` tag at line 13. This should work natively with Tailwind.

**Fix if broken:** Remove `group-hover:scale-105` and use CSS instead:
```css
.product-card-img {
  transition: transform 0.3s ease;
}
.product-card:hover .product-card-img {
  transform: scale(1.05);
}
```

---

### Animation 4: Fade-in Section Entries (NEW)

**Add to `styles.css`:**

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply to hero heading */
.animate-hero-title {
  animation: fadeInUp 0.5s ease-out both;
}

/* Apply to hero badges with stagger */
.animate-hero-badge-1 { animation: fadeInUp 0.4s ease-out 0.1s both; }
.animate-hero-badge-2 { animation: fadeInUp 0.4s ease-out 0.2s both; }
.animate-hero-badge-3 { animation: fadeInUp 0.4s ease-out 0.3s both; }
```

---

### Animation 5: Card Hover Lift

**Add to `styles.css`:**

```css
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
```

**Or use existing Tailwind classes** (preferred):
- `hover:-translate-y-0.5` → already on CTA buttons
- `hover:shadow-xl` → already on benefits cards
- `transition-all` → already on all animated elements

---

## Verification Checklist

| Animation | Where Applied | Current Status | Fix |
|-----------|--------------|---------------|-----|
| Hero image float | `index.astro:126` `.animate-float` | May not work | Move `@keyframes float` to `styles.css` |
| Card hover scale | `ProductCard.astro:14` `group-hover:scale-105` | Should work (Tailwind native) | Verify `group` class on parent |
| CTA button lift | `index.astro:119` `hover:-translate-y-0.5` | Should work (Tailwind native) | Verify Tailwind includes `translate` utilities |
| Benefits card shadow | `index.astro:296` `hover:shadow-lg` | Should work (Tailwind native) | Already working |
| Order spinner | `CartDrawer.astro` `.order-spinner` | Works (CSS in styles.css) | OK |
| Hero fade-in | `index.astro` heading | NEW | Add CSS + class |

---

## Files to Modify

1. **`src/assets/css/styles.css`** — Move `@keyframes float` here, add `fadeInUp` and stagger classes
2. **`src/pages/index.astro`** — Add `animate-hero-title`, `animate-hero-badge-1/2/3` classes to hero elements
3. **`src/components/Head.astro`** — Remove `@keyframes float` and `.animate-float` from the global style block (moved to styles.css)

---

## Execution Order

1. Move `@keyframes float` from Head.astro to styles.css
2. Add `fadeInUp` animation classes to styles.css
3. Add animation class names to hero heading + badges in index.astro
4. Build and verify
