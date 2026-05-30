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
  usage: string[];
  storage: string;
  image: string;
  comingSoon?: boolean;
}

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
    image: "/productimages/100gramfresh.png"
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
      "Best value: ₹50/100g"
    ],
    usage: ["Kerala curries", "Stir-fries", "Pepper fry", "Soups", "Biryani"],
    storage: "4 days refrigerated (do not wash before storing)",
    image: "/productimages/200gramfresh.png"
  },
  {
    slug: "mushroom-powder",
    name: "Oyster Mushroom Powder",
    form: "dried",
    price: 350,
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
    image: "/productimages/100grampowder.png",
    comingSoon: true
  },
  {
    slug: "mushroom-achar",
    name: "Oyster Mushroom Achar",
    form: "pickled",
    price: 200,
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
    image: "/productimages/200gramachar.png",
    comingSoon: true
  }
];

export const freshProducts = products.filter(p => p.form === "fresh");
export const driedProducts = products.filter(p => p.form === "dried");
export const pickledProducts = products.filter(p => p.form === "pickled");
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

export const SITE = {
  name: "Meaty Mushrooms",
  whatsapp: "918078937260",
  phone: "+91 80789 37260",
  email: "support@meatymushrooms.in",
  address: "Keethadi Road, Makkoolpeedika, Vadakara, Kozhikode, Kerala 673104",
  tagline: "Premium Mushrooms from Vadakara"
};
