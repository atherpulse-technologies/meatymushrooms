export type ProductCategory = "veg" | "nonveg";

export interface Product {
  slug: string;
  name: string;
  malayalam: string;
  category: ProductCategory;
  price: number;
  unit: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  pairings: string[];
  spiceLevel: "Mild" | "Medium" | "Hot";
  shelfLife: string;
}

export const products: Product[] = [
  {
    slug: "classic-mango",
    name: "Classic Mango",
    malayalam: "മാങ്ങാ",
    category: "veg",
    price: 100,
    unit: "100g",
    tagline: "Kerala classic with tangy heat",
    shortDescription: "Tangy mango pieces blended with authentic Kerala spice mix.",
    longDescription:
      "Our signature mango achar is made in small batches using hand-cut raw mangoes, roasted spices, and traditional oil tempering for the familiar homemade finish.",
    highlights: ["No artificial preservatives", "Small batch preparation", "Traditional spice tempering"],
    pairings: ["Matta rice", "Curd rice", "Kanji"],
    spiceLevel: "Hot",
    shelfLife: "3 months refrigerated",
  },
  {
    slug: "spicy-garlic",
    name: "Spicy Garlic",
    malayalam: "വെളുത്തുള്ളി",
    category: "veg",
    price: 100,
    unit: "100g",
    tagline: "Bold garlic with deep masala",
    shortDescription: "Garlic cloves slow-cooked in roasted masala for a bold flavor.",
    longDescription:
      "Fresh garlic cloves are cooked slowly in our house masala to create a balanced achar that is punchy but smooth, perfect for daily meals.",
    highlights: ["Roasted masala profile", "Rich aroma", "Balanced heat"],
    pairings: ["Chapathi", "Dosa", "Steamed rice"],
    spiceLevel: "Medium",
    shelfLife: "3 months refrigerated",
  },
  {
    slug: "elephant-foot-yam",
    name: "Elephant Foot Yam",
    malayalam: "ചേന",
    category: "veg",
    price: 100,
    unit: "100g",
    tagline: "Rustic texture, festive flavor",
    shortDescription: "Traditional chena achar with earthy taste and robust seasoning.",
    longDescription:
      "A nostalgic Kerala favorite prepared with tender chena pieces, slow spice infusion, and classic seasoning for a rich earthy profile.",
    highlights: ["Traditional recipe", "Earthy and hearty", "Handcrafted texture"],
    pairings: ["Rice and curry", "Puttu", "Porridge"],
    spiceLevel: "Medium",
    shelfLife: "2 months refrigerated",
  },
  {
    slug: "vibrant-beetroot",
    name: "Vibrant Beetroot",
    malayalam: "ബീറ്റ്റൂട്ട്",
    category: "veg",
    price: 100,
    unit: "100g",
    tagline: "Sweet-spicy modern favorite",
    shortDescription: "A mildly sweet and spicy variant with striking color and taste.",
    longDescription:
      "Made with fresh beetroot, aromatic spice mix, and controlled heat, this achar delivers a sweet-spicy balance loved by all age groups.",
    highlights: ["Naturally vibrant", "Mild sweetness", "Family-friendly spice"],
    pairings: ["Ghee rice", "Appam", "Sandwiches"],
    spiceLevel: "Mild",
    shelfLife: "2 months refrigerated",
  },
  {
    slug: "royal-date-mix",
    name: "Royal Date Mix",
    malayalam: "ഇന്തപ്പഴം മിക്സ്‌",
    category: "veg",
    price: 100,
    unit: "100g",
    tagline: "Sweet, tangy, aromatic",
    shortDescription: "Dates blended with aromatic spices for sweet and tangy notes.",
    longDescription:
      "A festive-style date achar featuring premium dates, subtle heat, and warm spices that pair beautifully with both rice dishes and breads.",
    highlights: ["Sweet-tangy profile", "Premium date blend", "Balanced spice"],
    pairings: ["Biryani", "Malabar parotta", "Neychoru"],
    spiceLevel: "Mild",
    shelfLife: "2 months refrigerated",
  },
  {
    slug: "tender-jackfruit",
    name: "Tender Jackfruit",
    malayalam: "ചക്ക",
    category: "veg",
    price: 100,
    unit: "100g",
    tagline: "Seasonal rustic specialty",
    shortDescription: "Raw jackfruit pickle with meaty texture and traditional masala.",
    longDescription:
      "Prepared using tender jackfruit and robust Kerala spices, this achar gives a firm bite and earthy finish ideal for hearty meals.",
    highlights: ["Seasonal specialty", "Meaty texture", "Traditional preparation"],
    pairings: ["Rice meals", "Dosa", "Chapathi"],
    spiceLevel: "Medium",
    shelfLife: "2 months refrigerated",
  },
  {
    slug: "malabar-beef",
    name: "Malabar Beef",
    malayalam: "ബീഫ്",
    category: "nonveg",
    price: 100,
    unit: "100g",
    tagline: "Rich, intense Malabar profile",
    shortDescription: "Tender beef cuts in rich, slow-roasted Malabar spice blend.",
    longDescription:
      "Slow-cooked beef achar with dark roasted spices and traditional oil curing for a deep flavor profile that elevates every plate.",
    highlights: ["Slow-cooked spice depth", "Tender cuts", "High flavor intensity"],
    pairings: ["Porotta", "Ghee rice", "Kappa"],
    spiceLevel: "Hot",
    shelfLife: "1.5 months refrigerated",
  },
  {
    slug: "homestyle-chicken",
    name: "Homestyle Chicken",
    malayalam: "ചിക്കെൻ",
    category: "nonveg",
    price: 100,
    unit: "100g",
    tagline: "Comforting, spicy, satisfying",
    shortDescription: "Spicy chicken achar that pairs perfectly with rice and porotta.",
    longDescription:
      "Our chicken achar balances savory notes and classic Kerala heat, made in controlled small batches for consistency and freshness.",
    highlights: ["House signature blend", "Small batch freshness", "Consistent taste"],
    pairings: ["Rice", "Porotta", "Chapathi"],
    spiceLevel: "Medium",
    shelfLife: "1.5 months refrigerated",
  },
  {
    slug: "roasted-prawns",
    name: "Roasted Prawns",
    malayalam: "ചെമ്മീൻ",
    category: "nonveg",
    price: 100,
    unit: "100g",
    tagline: "Seafood-forward premium achar",
    shortDescription: "Premium prawns coated in roasted masala for deep seafood flavor.",
    longDescription:
      "Fresh prawns are cleaned, marinated, and roasted with masala to deliver a concentrated seafood taste with traditional achar punch.",
    highlights: ["Premium seafood", "Roasted masala", "Rich umami finish"],
    pairings: ["Steamed rice", "Appam", "Neychoru"],
    spiceLevel: "Medium",
    shelfLife: "1 month refrigerated",
  },
  {
    slug: "netholi",
    name: "Netholi",
    malayalam: "നെത്തോലി",
    category: "nonveg",
    price: 100,
    unit: "100g",
    tagline: "Coastal anchovy classic",
    shortDescription: "Anchovy achar with bold spice profile and signature coastal taste.",
    longDescription:
      "A coastal favorite made with netholi and robust spice curing, crafted for strong flavor lovers who want authentic fish achar notes.",
    highlights: ["Authentic coastal style", "Bold spice profile", "Handcrafted batches"],
    pairings: ["Kanji", "Rice and curry", "Tapioca"],
    spiceLevel: "Hot",
    shelfLife: "1 month refrigerated",
  },
  {
    slug: "kondattam",
    name: "Kondattam",
    malayalam: "കൊണ്ടാട്ടം",
    category: "nonveg",
    price: 100,
    unit: "100g",
    tagline: "Crunchy and tangy Kerala staple",
    shortDescription: "Sun-dried Kerala specialty finished with tangy and crunchy spice mix.",
    longDescription:
      "Traditional kondattam preparation with sun-dried elements and curated spices creates a crunchy, tangy side that lifts simple meals.",
    highlights: ["Traditional sun-dried method", "Crunch-forward texture", "Tangy finish"],
    pairings: ["Curd rice", "Plain rice", "Chapathi"],
    spiceLevel: "Medium",
    shelfLife: "2 months refrigerated",
  },
];

export const vegProducts = products.filter((p) => p.category === "veg");
export const nonVegProducts = products.filter((p) => p.category === "nonveg");

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
