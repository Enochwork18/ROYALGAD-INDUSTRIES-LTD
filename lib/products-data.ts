export interface ProductSize {
  size: string;
  price: number;
}

export interface ProductData {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  nafdacNumber: string;
  sizes: ProductSize[];
  inStock: boolean;
}

export const products: Record<string, ProductData> = {
  "royalgad-germicide": {
    name: "RoyalGad Germicide",
    category: "Germicide",
    description: "Powerful disinfectant solution that kills 99.9% of germs. Ideal for hospitals, homes, offices, and commercial spaces.",
    benefits: ["Kills 99.9% of germs", "NAFDAC approved", "Safe for home and professional use", "Broad-spectrum pathogen protection", "Long-lasting antimicrobial protection"],
    ingredients: "Chloroxylenol, fragrance, water, and other inactive ingredients",
    howToUse: "Dilute 1:10 with water. Apply to surface and leave for 10 minutes. Wipe clean or allow to air dry.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "500ml", price: 800 }, { size: "1L", price: 1400 }, { size: "5L", price: 5000 }, { size: "25L", price: 20000 }],
    inStock: true,
  },
  "royalgad-antiseptic": {
    name: "RoyalGad Antiseptic",
    category: "Antiseptic",
    description: "Trusted antiseptic solution for wound cleaning and personal hygiene. Used by healthcare professionals across Nigeria.",
    benefits: ["Antiseptic protection for wounds", "NAFDAC registered", "Gentle on skin", "Trusted by healthcare professionals", "Multipurpose household use"],
    ingredients: "Chloroxylenol 4.8% w/v, isopropyl alcohol, excipients",
    howToUse: "Apply directly to wounds after cleaning. For general disinfection, dilute as directed on the label.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "500ml", price: 900 }, { size: "1L", price: 1600 }, { size: "5L", price: 6000 }],
    inStock: true,
  },
  "royalgad-hand-sanitizer": {
    name: "RoyalGad Hand Sanitizer",
    category: "Hand Care",
    description: "Quick and effective hand hygiene on the go. Alcohol-based formula that kills 99.9% of germs without water.",
    benefits: ["Kills 99.9% of germs instantly", "Portable and convenient", "Moisturizing formula", "NAFDAC registered", "No water needed"],
    ingredients: "Ethyl alcohol 70% v/v, glycerin, hydrogen peroxide, purified water",
    howToUse: "Apply a palm-sized amount to dry hands. Rub hands together covering all surfaces until dry.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "100ml", price: 500 }, { size: "250ml", price: 1000 }, { size: "500ml", price: 1800 }],
    inStock: true,
  },
  "royalgad-pine-disinfectant": {
    name: "RoyalGad Pine Disinfectant",
    category: "Disinfectant",
    description: "Multipurpose disinfectant with a fresh pine fragrance. Perfect for homes, offices, and commercial spaces.",
    benefits: ["Fresh pine scent", "Powerful disinfectant action", "NAFDAC approved", "Multipurpose surface cleaning", "Concentrated formula"],
    ingredients: "Pine oil, disinfectant agents, water, fragrance",
    howToUse: "Dilute according to instructions on label. Apply to surfaces with a cloth or mop. No rinsing required.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "500ml", price: 750 }, { size: "1L", price: 1300 }, { size: "5L", price: 4800 }],
    inStock: true,
  },
  "royalgad-lysol-disinfectant": {
    name: "RoyalGad Lysol Disinfectant",
    category: "Disinfectant",
    description: "Premium-grade disinfectant for maximum protection. Professional strength for demanding environments.",
    benefits: ["Professional-grade protection", "Broad-spectrum germ kill", "NAFDAC registered", "Hospital-tested", "Long-lasting disinfection"],
    ingredients: "Benzalkonium chloride, water, surfactants, fragrance",
    howToUse: "Use undiluted for maximum protection. Spray on surfaces and let air dry. For general cleaning, dilute 1:5 with water.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "500ml", price: 1200 }, { size: "1L", price: 2000 }, { size: "5L", price: 7500 }],
    inStock: true,
  },
  "royalgad-toilet-cleaner": {
    name: "RoyalGad Toilet Cleaner",
    category: "Toilet Care",
    description: "Effectively removes stains, limescale, and kills germs in your toilet bowl. Thick formula clings for maximum cleaning.",
    benefits: ["Removes tough stains", "Kills germs", "Thick clinging formula", "NAFDAC registered", "Pleasant fragrance"],
    ingredients: "Hydrochloric acid, thickeners, fragrance, water",
    howToUse: "Apply under the rim and around the bowl. Leave for 10-15 minutes. Scrub and flush.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "500ml", price: 600 }, { size: "1L", price: 1000 }, { size: "5L", price: 3800 }],
    inStock: true,
  },
  "royalgad-hand-wash": {
    name: "RoyalGad Hand Wash",
    category: "Hand Care",
    description: "Gentle yet effective antibacterial hand wash for daily use. Leaves hands clean, soft, and fresh.",
    benefits: ["Antibacterial protection", "Gentle on skin", "Moisturizing formula", "NAFDAC registered", "Pleasant fragrance"],
    ingredients: "Water, sodium laureth sulfate, cocamidopropyl betaine, glycerin, fragrance",
    howToUse: "Apply to wet hands, lather well, rinse thoroughly.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "250ml", price: 550 }, { size: "500ml", price: 900 }, { size: "1L", price: 1600 }],
    inStock: true,
  },
  "royalgad-industrial-cleaner": {
    name: "RoyalGad Industrial Cleaner",
    category: "Industrial",
    description: "Heavy-duty cleaning solution designed for commercial and industrial environments. Cost-effective concentrate.",
    benefits: ["Heavy-duty cleaning power", "Industrial strength", "NAFDAC registered", "Cost-effective concentrate", "Versatile application"],
    ingredients: "Surfactants, solvents, water, chelating agents",
    howToUse: "Dilute according to the cleaning requirement. Apply with mop, cloth, or pressure washer. Rinse thoroughly.",
    nafdacNumber: "NAFDAC REG NO: A7-XXXX",
    sizes: [{ size: "1L", price: 2500 }, { size: "5L", price: 10000 }, { size: "25L", price: 40000 }],
    inStock: true,
  },
};
