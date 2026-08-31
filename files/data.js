// ============================================================
// data.js — product catalog.
// In a real deployment this would come from a CMS or commerce
// API; it's inlined here so the app has zero network dependency
// and stays instantly fast on first load.
// ============================================================

export const CATEGORIES = [
  { slug: "film", label: "Film" },
  { slug: "cameras", label: "Cameras" },
  { slug: "chemistry", label: "Chemistry" },
  { slug: "paper", label: "Paper" },
  { slug: "accessories", label: "Accessories" },
];

export const PRODUCTS = [
  {
    id: "tri-x-400",
    name: "Tri-X 400, 35mm",
    category: "film",
    kicker: "36 EXP · ISO 400",
    price: 950,
    was: null,
    stock: 42,
    blurb: "The reference black-and-white stock. Wide latitude, a grain structure people push a full stop just to get.",
    specs: [["Format", "35mm"], ["ISO", "400"], ["Exposures", "36"], ["Process", "B&W"]],
  },
  {
    id: "portra-400",
    name: "Portra 400, 120",
    category: "film",
    kicker: "5 ROLL · ISO 400",
    price: 6800,
    was: 7400,
    stock: 15,
    blurb: "Warm, forgiving color negative built for skin tones. The medium-format roll most portrait shooters reach for.",
    specs: [["Format", "120"], ["ISO", "400"], ["Rolls", "5"], ["Process", "C-41"]],
  },
  {
    id: "ektar-100",
    name: "Ektar 100, 35mm",
    category: "film",
    kicker: "36 EXP · ISO 100",
    price: 1050,
    was: null,
    stock: 28,
    blurb: "Saturated, fine-grained color for landscape and product work. The closest 35mm gets to slide-film punch.",
    specs: [["Format", "35mm"], ["ISO", "100"], ["Exposures", "36"], ["Process", "C-41"]],
  },
  {
    id: "instax-mini",
    name: "Square Instant Pack",
    category: "film",
    kicker: "10 SHEETS",
    price: 1400,
    was: null,
    stock: 3,
    blurb: "Square-format instant film for cameras that develop on the spot. Ten sheets, consistent white borders.",
    specs: [["Format", "Square instant"], ["Sheets", "10"], ["Develop time", "~90 sec"]],
  },
  {
    id: "field-slr",
    name: "Meridian Field SLR",
    category: "cameras",
    kicker: "35MM · MANUAL",
    price: 42000,
    was: null,
    stock: 6,
    blurb: "Fully mechanical body with a match-needle meter. No battery required for the shutter — it will outlive you.",
    specs: [["Format", "35mm"], ["Metering", "Match-needle"], ["Shutter", "Mechanical, 1–1/1000"], ["Mount", "M42"]],
  },
  {
    id: "twin-lens",
    name: "Rollei-style Twin Lens",
    category: "cameras",
    kicker: "120 · WAIST-LEVEL",
    price: 68000,
    was: 74000,
    stock: 2,
    blurb: "Waist-level twin-lens reflex for square-format medium format. Quiet leaf shutter, built for the street.",
    specs: [["Format", "120, 6×6"], ["Viewfinder", "Waist-level"], ["Shutter", "Leaf"], ["Lens", "75mm f/3.5"]],
  },
  {
    id: "pocket-instant",
    name: "Pocket Instant Camera",
    category: "cameras",
    kicker: "INSTANT · AUTO",
    price: 9800,
    was: null,
    stock: 19,
    blurb: "Point-and-shoot instant body sized for a jacket pocket. Automatic exposure, selfie mirror, that's it.",
    specs: [["Format", "Square instant"], ["Exposure", "Automatic"], ["Flash", "Built-in"], ["Weight", "306g"]],
  },
  {
    id: "developer-concentrate",
    name: "Print Developer, Concentrate",
    category: "chemistry",
    kicker: "1 L · MAKES 10 L",
    price: 1800,
    was: null,
    stock: 34,
    blurb: "General-purpose paper developer. Dilutes 1:9, gives warm-black tones on most fiber and RC papers.",
    specs: [["Volume", "1 L concentrate"], ["Dilution", "1:9"], ["Yield", "~10 L working solution"], ["Use", "Paper"]],
  },
  {
    id: "film-developer",
    name: "Film Developer, Powder",
    category: "chemistry",
    kicker: "MAKES 5 L",
    price: 2200,
    was: null,
    stock: 21,
    blurb: "Classic powder film developer for black-and-white negatives. Long shelf life once mixed, if you're tidy about it.",
    specs: [["Form", "Powder"], ["Yield", "5 L"], ["Use", "B&W negative film"], ["Shelf life", "~6 months mixed"]],
  },
  {
    id: "fixer",
    name: "Rapid Fixer",
    category: "chemistry",
    kicker: "1 L · MAKES 6 L",
    price: 1500,
    was: null,
    stock: 8,
    blurb: "Fast-acting fixer for both film and paper. Two minutes with agitation, then wash as usual.",
    specs: [["Volume", "1 L concentrate"], ["Dilution", "1:4"], ["Fix time", "~2 min"], ["Use", "Film & paper"]],
  },
  {
    id: "stop-bath",
    name: "Indicator Stop Bath",
    category: "chemistry",
    kicker: "500 ML",
    price: 900,
    was: null,
    stock: 40,
    blurb: "Changes color as it exhausts, so you always know when to mix a fresh batch instead of guessing.",
    specs: [["Volume", "500 mL"], ["Dilution", "1:19"], ["Indicator", "Color-change"]],
  },
  {
    id: "fiber-paper",
    name: "Fiber-Base Paper, 8×10",
    category: "paper",
    kicker: "25 SHEETS · GLOSSY",
    price: 5200,
    was: null,
    stock: 11,
    blurb: "Double-weight fiber paper for prints meant to last. Deep blacks, a surface worth the extra wash time.",
    specs: [["Size", "8×10 in"], ["Sheets", "25"], ["Surface", "Glossy"], ["Base", "Fiber"]],
  },
  {
    id: "rc-paper",
    name: "RC Paper, 8×10",
    category: "paper",
    kicker: "100 SHEETS · PEARL",
    price: 4400,
    was: 4900,
    stock: 24,
    blurb: "Resin-coated paper that washes and dries fast — the paper to learn on before fiber gets expensive.",
    specs: [["Size", "8×10 in"], ["Sheets", "100"], ["Surface", "Pearl"], ["Base", "Resin-coated"]],
  },
  {
    id: "contact-sheet-paper",
    name: "Contact Sheet Paper, 8×10",
    category: "paper",
    kicker: "50 SHEETS",
    price: 3200,
    was: null,
    stock: 17,
    blurb: "Budget RC paper sized for full-roll contact sheets — the first print you make from every new roll.",
    specs: [["Size", "8×10 in"], ["Sheets", "50"], ["Surface", "Matte"], ["Base", "Resin-coated"]],
  },
  {
    id: "changing-bag",
    name: "Film Changing Bag",
    category: "accessories",
    kicker: "DOUBLE ZIP",
    price: 3800,
    was: null,
    stock: 13,
    blurb: "Light-tight bag for loading film onto reels without a darkroom. Double-zip seam, elastic sleeve cuffs.",
    specs: [["Interior", "24×24 in"], ["Seams", "Double zip"], ["Use", "Daylight loading"]],
  },
  {
    id: "steel-tank",
    name: "Stainless Development Tank",
    category: "accessories",
    kicker: "2-REEL",
    price: 5600,
    was: null,
    stock: 9,
    blurb: "Two-reel stainless tank that pours and drains fast, so your timing stays consistent roll to roll.",
    specs: [["Reels", "2"], ["Material", "Stainless steel"], ["Formats", "35mm & 120"]],
  },
  {
    id: "grain-focuser",
    name: "Grain Focuser",
    category: "accessories",
    kicker: "2X MIRROR",
    price: 4200,
    was: null,
    stock: 1,
    blurb: "Mirror focuser that lets you check grain sharpness at the easel before committing to a full print.",
    specs: [["Magnification", "2×"], ["Type", "Mirror"], ["Use", "Enlarger focusing"]],
  },
  {
    id: "print-tongs",
    name: "Print Tongs, Set of 3",
    category: "accessories",
    kicker: "COLOR-CODED",
    price: 1600,
    was: null,
    stock: 30,
    blurb: "One tong per tray, color-coded so developer never touches your fixer. The cheapest habit worth building.",
    specs: [["Set size", "3"], ["Coding", "Color-matched to trays"], ["Material", "Bamboo tip"]],
  },
];

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

export function productsByCategory(slug) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.blurb.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}
