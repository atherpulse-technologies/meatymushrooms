# Meaty Mushrooms — Store & WhatsApp Checkout Plan

> Derived from the MaasMagic WhatsApp checkout reference architecture (`storeplan-ref/`), adapted for Meaty Mushrooms' 3-product catalog.

---

## Table of Contents
1. [Reference Architecture: How MaasMagic Works](#reference-architecture-how-maasmagic-works)
2. [Adaptation for Meaty Mushrooms](#adaptation-for-meaty-mushrooms)
3. [Data Model](#data-model)
4. [Component Architecture](#component-architecture)
5. [Cart-to-WhatsApp Flow](#cart-to-whatsapp-flow)
6. [WhatsApp Message Template](#whatsapp-message-template)
7. [Pages & Routes](#pages--routes)
8. [Client-Side JavaScript Architecture](#client-side-javascript-architecture)
9. [Integration with Redesign Plan](#integration-with-redesign-plan)

---

## Reference Architecture: How MaasMagic Works

The MaasMagic system (`storeplan-ref/`) implements a **cart-to-WhatsApp checkout** — no payment gateway, no backend database, no user accounts. All state is client-side via `localStorage`.

### Core Loop

```
User browses products → Adds to cart → Reviews cart drawer → 
Enters delivery details → Clicks "Order on WhatsApp" → 
WhatsApp opens with pre-filled order message → User sends → 
Confirmation overlay asks "Did you send?" → Cart clears
```

### Key Files & Their Roles

| File | Role |
|------|------|
| [`data/products.ts`](storeplan-ref/data/products.ts) | Single source of truth — typed `Product` interface, 11 products, helper functions (`getProductBySlug`, `vegProducts`, `nonVegProducts`) |
| [`components/ProductCard.astro`](storeplan-ref/components/ProductCard.astro) | Reusable product card with `data-add-to-cart` attributes for cart JS to read |
| [`components/CartDrawer.astro`](storeplan-ref/components/CartDrawer.astro) | Slide-out cart panel with item list, total, delivery form, WhatsApp button, loading/confirmation overlays |
| [`components/SiteHeader.astro`](storeplan-ref/components/SiteHeader.astro) | Sticky header with cart icon + count badge, mobile menu, CTA button |
| [`layouts/BaseLayout.astro`](storeplan-ref/layouts/BaseLayout.astro) | Full `<head>` with SEO, fonts, JSON-LD. References `/js/site-ui.js` |
| [`pages/index.astro`](storeplan-ref/pages/index.astro) | Landing page: hero, product grid (veg/nonveg), about, how-to-order, contact |
| [`pages/products/[slug].astro`](storeplan-ref/pages/products/[slug].astro) | Dynamic product detail page using `getStaticPaths()`, quantity input, add-to-cart |
| [`site-ui.js`](storeplan-ref/site-ui.js) | ✅ **Now available** — 411 lines of vanilla JS handling cart state, WhatsApp message generation, drawer toggle, order confirmation, mobile menu, desktop fallback |

### Cart State (Inferred from `data-*` Attributes)

```javascript
// Cart stored in localStorage
{
  items: [
    { slug: "classic-mango", name: "Classic Mango", price: 100, qty: 2, image: "/productmockup.jpg" }
  ],
  customer: { name: "", address: "", phone: "" }
}
```

### WhatsApp Message Generation Pattern

The "Order on WhatsApp" button constructs a message like:
```
🛒 *New Order - Maa's Magic*

*Customer Details:*
Name: [name]
Address: [address]
Phone: [phone]

*Order Items:*
• Classic Mango × 2 = ₹200
• Spicy Garlic × 1 = ₹100

*Total: ₹300*

Please confirm availability and delivery estimate.
```

### Post-Order Confirmation Flow

This is a critical UX pattern from MaasMagic:

1. User clicks "Order on WhatsApp" → Loading overlay appears ("Preparing your WhatsApp order...")
2. WhatsApp opens (or desktop fallback shown)
3. After returning to site, confirmation overlay appears: "Did you place the WhatsApp order?"
4. Desktop users get fallback buttons: "Open WhatsApp Web" | "Copy Order Text"
5. "Yes, order placed" → Cart clears, overlay dismisses
6. "Not yet" → Overlay dismisses, cart preserved

---

## Adaptation for Meaty Mushrooms

### What Stays the Same
- Cart-to-WhatsApp model (no payment gateway)
- Client-side cart state via `localStorage`
- `data-*` attribute pattern for product data
- Slide-out cart drawer UX
- Post-order confirmation flow
- `getStaticPaths()` for product detail pages

### What Changes

| MaasMagic | Meaty Mushrooms |
|-----------|-----------------|
| 11 pickle products (veg + nonveg) | 4 mushroom products (fresh in 2 sizes + powder + achar) |
| Uniform ₹100/100g pricing | Varied pricing per weight (₹50, ₹100, ₹200, ₹150) |
| Product-specific fields: `spiceLevel`, `pairings`, `shelfLife` in weeks | Product-specific fields: `form` (fresh/dried/pickled), `weight`, `usage`, `storage` |
| Amber/gold brand color (`#C89A2C`) | Burgundy/berry brand color (`#8B1E3F`) — **entire cart UI must match** |
| `productmockup.jpg` placeholder for all | Real product images (oyster.jpg, powder.png, placeholder for achar) |
| "Pickle Solution" tagline | "Premium Mushrooms from Vadakara" |
| Veg/NonVeg category split | Form-based grouping (Fresh Produce / Dried & Powder / Pickled) |
| `fa-solid` Font Awesome icons | Same icon library (already used in current site) |

### Cart Theme Matching (Critical)

The MaasMagic cart system uses amber/gold (`#C89A2C`) as its brand accent. Every visual element must be remapped to Meaty's burgundy (`#8B1E3F`):

| Element | MaasMagic (Amber) | Meaty (Burgundy) |
|---------|-------------------|------------------|
| Cart header, buttons, badges | `bg-brand-500` → `#C89A2C` | `bg-primary` → `#8B1E3F` |
| Hover states | `hover:bg-brand-600` → `#A77F20` | `hover:bg-primary-dark` → `#6D1530` |
| Accent backgrounds | `bg-brand-50` → `#FFFAF0` | `bg-primary-light` → `#F6E6EB` |
| Accent borders | `border-brand-200` | `border-primary/20` |
| Text on primary | White | White |
| Loading spinner | `border-top-color: #C89A2C` | `border-top-color: #8B1E3F` |
| Cart count badge | `bg-slate-900` (black) | `bg-primary` → `#8B1E3F` |
| WhatsApp order button | `bg-brand-500` amber | `bg-primary` burgundy |
| "Available" badge | `bg-emerald-100` green | `bg-primary/10` burgundy tint |
| Trust bar background | `bg-brand-50/45` amber tint | `bg-primary/5` burgundy tint |

---

## Data Model

### Product Interface (`src/data/products.ts`)

```typescript
export type ProductForm = "fresh" | "dried" | "pickled";

export interface Product {
  slug: string;
  name: string;
  form: ProductForm;
  price: number;
  unit: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  usage: string[];       // "Add to curries", "Blend in smoothies", etc.
  storage: string;       // "4 days refrigerated", "6 months cool dry place"
  image: string;         // Path to image in src/assets/images/
}
```

### Product Catalog (4 Products)

Fresh Oyster Mushrooms come in two packet sizes. These are separate cart items (not variants) for simplicity in the WhatsApp checkout flow.

```typescript
export const products: Product[] = [
  {
    slug: "fresh-oyster-100g",
    name: "Fresh Oyster Mushroom",
    form: "fresh",
    price: 50,
    unit: "100g",
    tagline: "Trial pack. Harvested daily. Firm, meaty texture.",
    shortDescription: "100g trial pack of premium oyster mushrooms harvested fresh every morning from our Vadakara farm. Perfect for first-time buyers.",
    longDescription: "Our signature fresh oyster mushrooms are grown on sterilized natural substrate with zero chemicals. Known for their firm, meaty texture that holds shape during cooking. This 100g pack is ideal for trying oyster mushrooms for the first time or for small households. Tear by hand — no cutting needed.",
    highlights: [
      "Harvested same morning",
      "Firm texture, doesn't shrink while cooking",
      "Zero chemicals or pesticides",
      "Tear by hand — no cutting needed"
    ],
    usage: ["Kerala curries", "Stir-fries", "Pepper fry", "Soups"],
    storage: "4 days refrigerated (do not wash before storing)",
    image: "oyster.jpg"
  },
  {
    slug: "fresh-oyster-200g",
    name: "Fresh Oyster Mushroom",
    form: "fresh",
    price: 100,
    unit: "200g",
    tagline: "Value pack. Harvested daily. Firm, meaty texture.",
    shortDescription: "200g value pack of premium oyster mushrooms harvested fresh every morning. Best value for families and regular cooking.",
    longDescription: "Our signature fresh oyster mushrooms are grown on sterilized natural substrate with zero chemicals. Known for their firm, meaty texture that holds shape during cooking. The 200g value pack is perfect for families, meal prep, and those who cook regularly with mushrooms. Each pack contains approximately 200g of hand-picked mushrooms.",
    highlights: [
      "Harvested same morning",
      "Firm texture, doesn't shrink while cooking",
      "Zero chemicals or pesticides",
      "Tear by hand — no cutting needed",
      "Best value — ₹50/100g vs ₹50 for trial pack"
    ],
    usage: ["Kerala curries", "Stir-fries", "Pepper fry", "Soups", "Biryani"],
    storage: "4 days refrigerated (do not wash before storing)",
    image: "oyster.jpg"
  },
  {
    slug: "mushroom-powder",
    name: "Oyster Mushroom Powder",
    form: "dried",
    price: 200,
    unit: "100g",
    tagline: "100% pure dehydrated mushroom. Shelf-stable nutrition.",
    shortDescription: "Pure oyster mushroom powder — dehydrated and finely ground. Add to anything for an umami nutrition boost.",
    longDescription: "Made from 100% oyster mushrooms with nothing added. Slow-dehydrated to preserve nutrients and natural umami flavor. Add a spoonful to smoothies, soups, curries, doughs, or sprinkle on salads. Each 100g pack contains concentrated mushroom goodness with a 6-month shelf life.",
    highlights: [
      "100% pure mushroom — no fillers",
      "6-month shelf life",
      "Adds natural umami to any dish",
      "Rich in natural vitamins and minerals"
    ],
    usage: ["Smoothies", "Soups & broths", "Roti/chapati dough", "Seasoning sprinkle", "Curry thickener"],
    storage: "6 months in a cool, dry place",
    image: "powder.png"
  },
  {
    slug: "mushroom-achar",
    name: "Oyster Mushroom Achar",
    form: "pickled",
    price: 150,
    unit: "250g",
    tagline: "Traditional Kerala-style mushroom pickle.",
    shortDescription: "Homemade oyster mushroom pickle with authentic Kerala spices. Tangy, spicy, and full of flavor.",
    longDescription: "A traditional Kerala-style achar made with fresh oyster mushrooms, slow-cooked in authentic spice blend and gingelly oil. No artificial preservatives — preserved naturally through traditional oil-curing. Pairs perfectly with rice, curd rice, kanji, or as a side for any meal.",
    highlights: [
      "Traditional Kerala recipe",
      "No artificial preservatives",
      "Small-batch preparation",
      "Pairs with rice, kanji, and curd rice"
    ],
    usage: ["Side for rice meals", "With curd rice", "With kanji/porridge", "As a sandwich spread"],
    storage: "3 months refrigerated after opening",
    image: "oyster.jpg" // Placeholder until achar photo available
  }
];

export const freshProducts = products.filter(p => p.form === "fresh");
export const driedProducts = products.filter(p => p.form === "dried");
export const pickledProducts = products.filter(p => p.form === "pickled");
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
```

---

## Component Architecture

### 1. [`CartDrawer.astro`](src/components/CartDrawer.astro) (Adapted from MaasMagic)

Keep the same structure as the reference but adapt:
- Brand colors: `bg-brand-500` → `bg-primary` (`#8B1E3F`)
- Headline: "Your Cart" (keep)
- Delivery form: Name, Address, Phone (keep — uses `localStorage` for persistence)
- WhatsApp button: "Order on WhatsApp" → "Order on WhatsApp" (keep, change WhatsApp number)
- Loading overlay: Change "packaging your cart details" to "preparing your order details"
- Confirmation: Keep the exact flow — "Did you place the WhatsApp order?" / "Yes, order placed" / "Not yet"
- Desktop fallback: Keep "Open WhatsApp Web" and "Copy Order Text"

### 2. [`ProductCard.astro`](src/components/ProductCard.astro) (Adapted)

Changes from MaasMagic reference:
- Remove `product.malayalam` display (English-only per stakeholder directive)
- Replace "Available" badge (all 3 products are available) 
- Replace `product.tagline` and `product.shortDescription` with mushroom-specific content
- Price format: "₹100 | 200g" (varied pricing, not uniform)
- Keep `data-add-to-cart` attributes — same contract
- "View Details" → links to `/products/[slug]`
- "Add to Cart" → same button pattern
- Image: Use Astro `Image` component for optimization (unlike MaasMagic's raw `<img>`)

### 3. [`SiteHeader.astro`](src/components/SiteHeader.astro) (Adapted)

Changes:
- Logo: "Meaty Mushrooms" with burgundy branding (replace the existing Head.astro navbar)
- Navigation: Home | Products | Recipes (placeholder) | Contact
- Cart icon with count badge (`data-cart-count`) — NEW addition
- Mobile: Hamburger menu + cart toggle
- CTA: "Order Now" with WhatsApp link (keep from existing)

### 4. [`BaseLayout.astro`](src/layouts/BaseLayout.astro) (Adapted)

Based on MaasMagic's `BaseLayout.astro` but replacing the current Meaty Mushrooms `Head.astro` + `Footer.astro` pattern:
- Full SEO meta + OG tags + JSON-LD
- Font Awesome CDN (already using `fa-solid` classes in MaasMagic)
- Google Fonts: Inter + Montserrat + Pattaya (existing) — keep, add Manrope/Playfair only if needed
- Skip-to-content link
- References `/js/site-ui.js` for cart logic

### 5. Store Section on Homepage

Instead of the current "Our Products" section in `index.astro`:
- Embed 3 `ProductCard` components inline
- Grouped by form: "Fresh Produce", "Dried & Powder", "Pickles & Preserves"
- Each card has "Add to Cart" button
- Above the product grid: a "How to Order" teaser in 3 steps

---

## Cart-to-WhatsApp Flow

```
                  ┌─────────────────┐
                  │  User browses   │
                  │  product cards  │
                  └───────┬─────────┘
                          │
                    [Add to Cart]
                          │
                          ▼
                  ┌─────────────────┐
                  │  Cart Drawer    │
                  │  slides open    │
                  │  • Item list    │
                  │  • Qty adjust   │
                  │  • Total calc   │
                  └───────┬─────────┘
                          │
                    [Enter delivery details]
                    (cached in localStorage)
                          │
                          ▼
                  ┌─────────────────┐
                  │  "Order on      │
                  │  WhatsApp" tap  │
                  └───────┬─────────┘
                          │
                          ▼
                  ┌─────────────────┐
                  │  Loading overlay│
                  │  (0.5-1.5s)    │
                  └───────┬─────────┘
                          │
                    ┌─────┴─────┐
                    │           │
               [Mobile]    [Desktop]
                    │           │
                    ▼           ▼
            WhatsApp app   ┌──────────────────┐
            opens with     │ Fallback options: │
            prefilled msg  │ • WhatsApp Web    │
                           │ • Copy Order Text │
                           └──────────────────┘
                                    │
                          User sends message
                                    │
                                    ▼
                           ┌─────────────────┐
                           │  Confirmation   │
                           │  overlay:       │
                           │  "Did you place │
                           │  the order?"    │
                           │                 │
                           │  [Yes]  [Not Yet]│
                           └────┬────────────┘
                                │
                          ┌─────┴─────┐
                          │           │
                        [Yes]     [Not Yet]
                          │           │
                          ▼           ▼
                    Cart cleared   Overlay closes
                    Overlay closes Cart preserved
```

---

## WhatsApp Message Template (from actual `site-ui.js`)

The actual `site-ui.js` at [`storeplan-ref/site-ui.js:219-255`](storeplan-ref/site-ui.js) generates a simpler format than my earlier speculation:

**URL-encoded version** (for `wa.me` link):
```
Hi, I want to order:%0A%0A1. Fresh Oyster Mushroom - 2 x ₹100 = ₹200%0A2. Mushroom Powder - 1 x ₹200 = ₹200%0A%0ATotal: ₹400%0A%0AName: Bindu%20N%20K%0AAddress: Keethadi%20Road%2C%20Makkoolpeedika%0APhone: 918078937260%0A
```

**Plain text version** (for clipboard copy on desktop):
```
Hi, I want to order:

1. Fresh Oyster Mushroom - 2 x ₹100 = ₹200
2. Mushroom Powder - 1 x ₹200 = ₹200

Total: ₹400

Name: Bindu N K
Address: Keethadi Road, Makkoolpeedika
Phone: 918078937260
```

### Key Implementation Details from Actual JS

| Detail | Value in Reference | Change for Meaty |
|--------|-------------------|------------------|
| WhatsApp number | `"910000000000"` (line 3) | → `"918078937260"` |
| localStorage cart key | `"maasmagic_cart"` (line 1) | → `"meaty_cart"` |
| localStorage customer key | `"maasmagic_customer"` (line 2) | → `"meaty_customer"` |
| Loading overlay timeout | `2600ms` (line 338) | Keep (proven UX timing) |
| Desktop detection | `/Android\|iPhone\|iPad\|iPod\|Mobile/i` (line 29) | Keep |
| Checkout validation | Requires name + address + phone all filled (lines 316-322) | Keep |
| Popup blocker detection | Checks `window.open()` returns `null` (line 336) | Keep |
| Message format | `item.name - qty x ₹price = ₹lineTotal` | **Add unit**: `item.name (item.unit) - qty x ...` |
| Cart item shape | `{ slug, name, price, image, qty }` | **Add unit**: `{ slug, name, price, image, unit, qty }` |

### What's NOT in the Message (Should We Add?)

The current format omits:
- **Product unit/weight** — critical for mushrooms since pricing varies (200g vs 100g vs 250g). Recommended: add `item.unit` to cart item and message.
- **Business name** — message starts with "Hi, I want to order:" with no business identifier. OK for WhatsApp since the number identifies the business.

### Message Enhancement Decision

**Add `unit` to cart items and message format.** The modified `addToCart` must accept `unit` from the `data-product-unit` attribute on ProductCard buttons, and `buildWhatsappMessage` must include it in output.

---

## Pages & Routes

| Route | Page | Content |
|-------|------|---------|
| `/` | `index.astro` | Hero, trust bar, product cards (add-to-cart), how-to-order, FAQ, cooking videos, contact/map |
| `/products` | `products.astro` | Full product listing with category grouping |
| `/products/[slug]` | `products/[slug].astro` | Individual product detail with quantity selector, add-to-cart, related products |
| `/recipes` | `recipes.astro` | Placeholder "Coming Soon" with newsletter signup |
| `/about` | `about.astro` | Real about page (farm story, founder, FSSAI/MSME certs) |
| `/contact` | `contact.astro` | Map, directions (train/bus/road), phone, email, WhatsApp |
| `/404` | `404.astro` | Custom 404 with navigation |

### Removed Routes (per stakeholder)
- `/farm` — removed
- `/cooking-videos` — merged into homepage section
- `/recipes/recipe-1` through `/recipes/recipe-6` — removed (fake content)

---

## Client-Side JavaScript Architecture

The reference [`site-ui.js`](storeplan-ref/site-ui.js) is now available (411 lines). Here is the confirmed architecture:

### Cart State Management (lines 1-3, 31-58)
```javascript
const CART_KEY = "maasmagic_cart";
const CUSTOMER_KEY = "maasmagic_customer";
const WHATSAPP_NUMBER = "910000000000";  // ← CHANGE for Meaty

// Cart item shape: { slug, name, price, image, qty }
// Customer shape: { name, address, phone }
```

The JS module handles these confirmed capabilities:

| Function | Lines | Trigger | Behavior |
|----------|-------|---------|----------|
| `getCart()` / `setCart()` | 31-41 | Internal | Read/write cart from `localStorage` |
| `getCustomer()` / `setCustomer()` | 43-58 | Internal | Read/write customer from `localStorage` |
| `readCustomerFromInputs()` | 60-65 | Internal | Read form fields into customer object |
| `renderCustomerPreview()` | 67-80 | After input change | Show "Name: ... \| Address: ... \| Phone: ..." |
| `hydrateCustomerInputs()` | 82-88 | On page load | Populate form fields from localStorage |
| `persistCustomerFromInputs()` | 90-95 | On input/blur | Save form fields to localStorage |
| `openCart()` | 102-107 | `[data-open-cart]` click | Slide drawer in, show overlay |
| `closeCart()` | 109-113 | `[data-close-cart]` click, overlay click, Escape | Slide drawer out |
| `showOrderLoading()` | 126-127 | After WhatsApp button click | Show "Preparing your WhatsApp order..." |
| `showOrderConfirm()` | 129-137 | After loading timeout (2600ms) | Show "Did you place the WhatsApp order?" |
| `addToCart(product, qty)` | 187-200 | `[data-add-to-cart]` click | Add or increment. Auto-opens cart. |
| `updateQty(slug, delta)` | 202-211 | +/- buttons in cart | Increment/decrement, remove if qty=0 |
| `removeItem(slug)` | 213-217 | Remove button in cart | Filter out item |
| `buildWhatsappMessage()` | 219-233 | "Order on WhatsApp" click | URL-encoded message for wa.me link |
| `buildWhatsappPlainText()` | 235-255 | Desktop fallback | Plain text for clipboard copy |
| `renderCart()` | 148-185 | Any cart mutation | Rebuild cart HTML, update total, update count badges |
| `updateCartCount(cart)` | 141-146 | After `renderCart()` | Update all `[data-cart-count]` badges |

### Modifications Needed for Meaty Mushrooms

| # | Line(s) in Ref | Change |
|---|---------------|--------|
| 1 | 1, 2 | Rename `CART_KEY` → `"meaty_cart"`, `CUSTOMER_KEY` → `"meaty_customer"` |
| 2 | 3 | Change `WHATSAPP_NUMBER` → `"918078937260"` |
| 3 | 194 | In `addToCart()`, accept `unit` field: `cart.push({ ...product, unit, qty })` |
| 4 | 227, 243 | In message builders, include unit: `${item.name} (${item.unit}) - ${item.qty} x ₹${item.price} = ₹${lineTotal}` |
| 5 | 167 | In `renderCart()`, show unit in cart item display |
| 6 | 285 | In `[data-add-to-cart]` click handler, read `unit` from `data-product-unit` attribute |
| 7 | — | Add `data-product-unit` attribute to `ProductCard.astro` add-to-cart button |

### Original Inferences vs Actual Code

| My Earlier Inference | Actual Implementation | Status |
|---------------------|----------------------|--------|
| Message uses emojis and bold formatting | Plain text: "Hi, I want to order:" | ✅ Simpler is better |
| Loading timeout ~0.5-1.5s | Fixed 2600ms | ✅ Adjusted |
| "Packaging your cart details" copy | "Preparing your WhatsApp order..." (in CartDrawer HTML) | ✅ Close match |
| Separate `generateWhatsAppMessage()` | Combined with button click handler | ✅ Single function |
| `confirmOrder()` clears cart and closes | `orderConfirmYesBtn` handler: `setCart([])`, `renderCart()`, `hideOrderConfirm()`, `closeCart()` | ✅ Matched |

### JS Implementation Strategy

Since the full [`site-ui.js`](storeplan-ref/site-ui.js) (411 lines) is now available, the implementation approach is:

1. **Copy** the reference `site-ui.js` to Meaty's `public/js/site-ui.js`
2. **Modify** 3 constants: `CART_KEY`, `CUSTOMER_KEY`, `WHATSAPP_NUMBER`
3. **Extend** cart item shape to include `unit` field
4. **Update** message builders to display `(unit)` after product name
5. **Add** `data-product-unit` attribute to `ProductCard.astro` add-to-cart buttons
6. **No structural changes needed** — the architecture maps perfectly

This means item #4 in the Action Items table below changes from "Build from scratch" to "Copy + modify 6 lines."

---

## Integration with Redesign Plan

### Updates to the Original Redesign Plan

| Original Plan Item | Store Integration |
|--------------------|-------------------|
| Phase 2: Architecture — `BaseLayout.astro` | Adopt MaasMagic's BaseLayout as the standard layout |
| Phase 2: Content data layer | Use `src/data/products.ts` pattern (TypeScript, typed interfaces) |
| Phase 2: UI components | Add `ProductCard.astro`, `CartDrawer.astro` to component library |
| Phase 3: Conversion optimization | Cart-to-WhatsApp becomes the primary conversion mechanism |
| Phase 3: Pre-filled WhatsApp templates | Implemented via the cart message generator |
| Phase 4: Missing pages | Product detail pages (`[slug].astro`) added to page inventory |

### Updated File Structure (Store-Specific)

```
src/
├── data/
│   ├── products.ts              # Product catalog (3 products)
│   └── site.ts                  # Site constants (phone, address, wa number)
├── components/
│   ├── store/
│   │   ├── CartDrawer.astro     # Cart slide-out + WhatsApp checkout
│   │   ├── ProductCard.astro    # Reusable product card
│   │   └── StoreSection.astro   # Homepage store section wrapper
│   ├── layout/
│   │   ├── BaseLayout.astro     # SEO, fonts, global structure
│   │   ├── SiteHeader.astro     # Nav + cart icon + mobile menu
│   │   └── SiteFooter.astro     # Footer
│   └── ui/
│       ├── Button.astro
│       └── Badge.astro
├── pages/
│   ├── index.astro
│   ├── products.astro
│   └── products/
│       └── [slug].astro         # Dynamic product detail page
├── utils/
│   └── whatsapp.ts              # WhatsApp URL builder helper
└── public/
    └── js/
        └── site-ui.js           # Cart state + WhatsApp checkout logic
```

### Color Token Mapping (MaasMagic → Meaty)

| MaasMagic Token | Meaty Mushrooms Equivalent |
|-----------------|---------------------------|
| `--color-brand-50` | `--color-primary-light` (`#F6E6EB`) |
| `--color-brand-100` | `rgba(139, 30, 63, 0.1)` |
| `--color-brand-500` | `--color-primary` (`#8B1E3F`) |
| `--color-brand-600` | `--color-primary-dark` (`#6D1530`) |
| `--color-brand-900` | `#4A1025` (darkest variant) |

---

## Key Differences: MaasMagic vs Meaty Mushrooms Store

| Aspect | MaasMagic | Meaty Mushrooms |
|--------|-----------|-----------------|
| **WhatsApp number** | `+91 91000 00000` (placeholder) | `+91 80789 37260` (real) |
| **Product count** | 11 (6 veg, 5 nonveg) | 4 (fresh 100g, fresh 200g, powder, achar) |
| **Pricing model** | Uniform ₹100/100g | Varied: ₹50/100g, ₹100/200g, ₹200/100g, ₹150/250g |
| **Product grouping** | Veg / Non-Veg tabs | Fresh Produce (2 sizes) / Dried & Powder / Pickled |
| **Images** | Single `productmockup.jpg` | Real product photos (3 distinct images) |
| **Detailed product pages** | Full spec sheet (spice, shelf life, pairings) | Adapted: form, weight, usage, storage |
| **Hero section** | Pickle-focused | Mushroom-focused (existing hero kept) |
| **Additional page content** | Minimal (about + how-to-order) | Extensive (health benefits sub-page, cooking videos, FAQ, food safety certs) |
| **Language** | English + Malayalam (`malayalam` fields) | English-only initially (per stakeholder) |
| **Font Awesome** | CDN in BaseLayout | Same CDN approach |
| **JS file** | `site-ui.js` (✅ now in ref, 411 lines) | Copy + modify 6 lines (keys, phone, unit) |

---

## Action Items

| # | Task | Priority | Dependency |
|---|------|----------|------------|
| 1 | Create `src/data/products.ts` with the 3-product catalog | 🔴 P0 | None |
| 2 | Create `src/data/site.ts` with phone, address, WhatsApp number constants | 🔴 P0 | None |
| 3 | Create `src/utils/whatsapp.ts` — WhatsApp URL builder helper | 🔴 P0 | #1, #2 |
| 4 | Create `public/js/site-ui.js` — Full cart state + checkout logic | 🔴 P0 | #1, #2 |
| 5 | Create `src/components/store/CartDrawer.astro` — Adapted from MaasMagic | 🔴 P0 | #1 |
| 6 | Create `src/components/store/ProductCard.astro` — Adapted from MaasMagic | 🔴 P0 | #1 |
| 7 | Create `src/components/layout/BaseLayout.astro` — Adapted (references site-ui.js) | 🔴 P0 | #4 |
| 8 | Create `src/components/layout/SiteHeader.astro` with cart count badge | 🔴 P0 | None |
| 9 | Create `src/pages/products/[slug].astro` — Dynamic product detail | 🔴 P0 | #1, #5, #6 |
| 10 | Update `src/pages/index.astro` to use ProductCard + CartDrawer | 🔴 P0 | #5, #6 |
| 11 | Update `src/pages/products.astro` to use shared data + ProductCard | 🟡 P1 | #1, #6 |
| 12 | Copy `storeplan-ref/site-ui.js` → `public/js/site-ui.js`, modify keys/phone/unit | 🔴 P0 | #1, #2, #3 |
| 13 | Integration test: Add to cart → WhatsApp message → Confirmation flow | 🟡 P1 | All above |

---

*Analyzed from `storeplan-ref/` MaasMagic reference on 2026-05-29. The complete `site-ui.js` (411 lines) is now available in the reference, confirming all inferred behavior. Only 6 lines need modification for Meaty Mushrooms: localStorage key names (2), WhatsApp number (1), and unit field in addToCart + message builders (3).*
