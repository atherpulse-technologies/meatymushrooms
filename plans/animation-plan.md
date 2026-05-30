# Site Animation Plan

> Subtle CSS animations only — no JavaScript scroll triggers, no external libraries.
> Uses existing Tailwind CSS setup and the already-working `animate-float` pattern.

---

## Constraints

1. **No AOS/GSAP/ScrollTrigger** — pure CSS only
2. **Must not break existing layout** — additive only
3. **Must respect `prefers-reduced-motion`** — critical for accessibility
4. **Mobile-safe** — no heavy transforms that cause layout shifts

---

## Proposed Animations

| # | Element | Animation Type | CSS | Location |
|---|---------|---------------|-----|----------|
| 1 | Hero image | Gentle float (existing) | `animate-float` | [`src/pages/index.astro`](src/pages/index.astro:126) |
| 2 | Hero heading | Fade-in + slide-up on load | New: `animate-fadeInUp` | [`src/pages/index.astro:100`](src/pages/index.astro:100) |
| 3 | Trust badges | Staggered fade-in | New: `animate-fadeIn` with delay classes | [`src/pages/index.astro:103-116`](src/pages/index.astro:103) |
| 4 | Product cards | Scale-up on hover (existing) | `hover:scale-105` + `hover:shadow-md` | [`src/components/store/ProductCard.astro:11-41`](src/components/store/ProductCard.astro:11) |
| 5 | Benefits cards | Hover lift (existing) | `hover:shadow-lg transition-all` | [`src/pages/index.astro:291-375`](src/pages/index.astro:291) |
| 6 | CTA buttons | Subtle lift + shadow (existing) | `hover:-translate-y-0.5 hover:shadow-xl` | [`src/pages/index.astro:119-127`](src/pages/index.astro:119) |
| 7 | FAQ accordion | Chevron rotation (existing) | `group-open:rotate-180` | [`src/pages/index.astro:559-621`](src/pages/index.astro:559) |
| 8 | Video card overlay | Play button fade (existing) | `opacity-0 group-hover:opacity-100` | [`src/pages/index.astro:190-196`](src/pages/index.astro:190) |
| 9 | Section dividers | Gentle border fade-in | New: not needed (borders are static) | — |
| 10 | Order loading spinner | Rotation (existing) | `order-spinner` + `spin` keyframes | [`src/assets/css/styles.css:4-12`](src/assets/css/styles.css:4) |

---

## New CSS to Add

### In [`src/assets/css/styles.css`](src/assets/css/styles.css):

```css
/* Fade-in Up (for hero heading on load) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out both;
}

/* Staggered fade-in delays */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-fadeInUp,
  .order-spinner {
    animation: none !important;
  }
  .group-hover\:scale-105 {
    transform: none !important;
  }
}
```

---

## What NOT to Do

| Risky Technique | Why |
|----------------|-----|
| Scroll-triggered animations (Intersection Observer) | Requires JS, can cause layout shift, breaks mobile |
| Parallax scrolling | Complex, bad on mobile, causes jank |
| Staggered card loading on scroll | High complexity, poor performance |
| CSS `@keyframes` on expensive properties (width, height, top) | Causes layout reflow |
| Auto-playing transforms on page load (without `@media` guard) | Ignores user motion preferences |

---

## Implementation Steps

1. Add the 3 new CSS keyframes/classes to [`src/assets/css/styles.css`](src/assets/css/styles.css)
2. Add `animate-fadeInUp` class to the hero `<h1>` element in [`src/pages/index.astro:100`](src/pages/index.astro)
3. Add `animate-fadeInUp delay-100`, `delay-200`, `delay-300` to trust badge `<span>` elements at lines 103-116
4. Verify with `npx astro build` that nothing breaks
5. Verify visually that animations are subtle and not distracting

**Total new CSS:** ~25 lines. **Total HTML edits:** ~6 attribute additions. **Zero JS changes.**
