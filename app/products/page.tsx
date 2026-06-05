"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FadeInSection from "@/components/ui/FadeInSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const categories = ["All", "Disinfectants", "Antiseptic", "Hand Care", "Germicide", "Toilet Care", "Industrial"];

const allProducts = [
  { name: "RoyalGad Germicide", slug: "royalgad-germicide", description: "Powerful germicide for disinfecting surfaces. Kills 99.9% of germs.", price: 800, category: "Germicide", inStock: true },
  { name: "RoyalGad Antiseptic", slug: "royalgad-antiseptic", description: "Antiseptic solution for wound cleaning and personal hygiene.", price: 900, category: "Antiseptic", inStock: true },
  { name: "RoyalGad Hand Sanitizer", slug: "royalgad-hand-sanitizer", description: "Alcohol-based hand sanitizer for portable protection.", price: 500, category: "Hand Care", inStock: true },
  { name: "RoyalGad Pine Disinfectant", slug: "royalgad-pine-disinfectant", description: "Pine-scented multipurpose disinfectant for homes and offices.", price: 750, category: "Disinfectants", inStock: true },
  { name: "RoyalGad Lysol Disinfectant", slug: "royalgad-lysol-disinfectant", description: "Professional-grade Lysol disinfectant for maximum protection.", price: 1200, category: "Disinfectants", inStock: true },
  { name: "RoyalGad Toilet Cleaner", slug: "royalgad-toilet-cleaner", description: "Powerful toilet cleaner that removes stains and kills germs.", price: 600, category: "Toilet Care", inStock: true },
  { name: "RoyalGad Hand Wash", slug: "royalgad-hand-wash", description: "Gentle antibacterial hand wash for daily use.", price: 550, category: "Hand Care", inStock: true },
  { name: "RoyalGad Industrial Cleaner", slug: "royalgad-industrial-cleaner", description: "Heavy-duty industrial cleaner for commercial use.", price: 2500, category: "Industrial", inStock: true },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-800/90 to-brand-green-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green-200">NAFDAC Approved Products</p>
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="mt-3 text-brand-green-100 max-w-2xl mx-auto">
            NAFDAC-approved hygiene and disinfectant products for every need. Quality you can trust since 2002.
          </p>
        </div>
      </section>

      <section className="py-6 bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    category === cat
                      ? "bg-brand-green-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      <FadeInSection>
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No products match your search.</p>
                <button
                  onClick={() => { setSearch(""); setCategory("All"); }}
                  className="text-brand-green-600 hover:text-brand-green-700 font-medium mt-2 text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {filtered.map((product) => (
                  <motion.div key={product.slug} variants={itemVariants}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
