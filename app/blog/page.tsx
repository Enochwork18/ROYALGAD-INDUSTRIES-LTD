"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  image?: string;
}

const posts: BlogPost[] = [
  { title: "EID MUBARAK — RoyalGad Wishes You a Blessed Celebration", slug: "eid-mubarak-2026", excerpt: "RoyalGad AG Industries Ltd celebrates Eid with you. Wishing you peace, blessings, and joy this festive season.", date: "2026-06-03", category: "Company News", author: "RoyalGad", image: "/images/EID MUBARAK.png" },
  { title: "RoyalGad Lysol Disinfectant for Farmers — Protect Your Livestock", slug: "lysol-disinfectant-for-farmers", excerpt: "Farmers, keep your livestock and farm environment safe with RoyalGad Lysol Disinfectant. NAFDAC-approved and highly effective.", date: "2026-05-30", category: "Product Updates", author: "RoyalGad", image: "/images/lysol-for-farmers.png" },
  { title: "Happy Children's Day — RoyalGad Celebrates Every Child", slug: "happy-childrens-day-2026", excerpt: "RoyalGad celebrates the joy and promise of every child. Happy Children's Day from all of us!", date: "2026-05-27", category: "Company News", author: "RoyalGad", image: "/images/happy-childrens-day.png" },
  { title: "5 Hidden Germ Spots in Your Home You're Ignoring", slug: "5-hidden-germ-spots-in-your-home", excerpt: "Think your home is clean? These 5 hidden germ hotspots might surprise you. Learn how to disinfect them properly.", date: "2026-05-20", category: "Hygiene Tips", author: "RoyalGad", image: "/images/5-hidden-germ-spots.png" },
  { title: "How to Properly Disinfect Your Home Against Germs", slug: "how-to-disinfect-home", excerpt: "Learn the correct techniques for disinfecting your home to eliminate 99.9% of harmful bacteria and viruses.", date: "2026-05-15", category: "Hygiene Tips", author: "RoyalGad" },
  { title: "The Difference Between Antiseptic and Disinfectant", slug: "antiseptic-vs-disinfectant", excerpt: "Understanding when to use antiseptic vs disinfectant is crucial for effective hygiene.", date: "2026-05-08", category: "Hygiene Tips", author: "RoyalGad" },
  { title: "Why NAFDAC Registration Matters for Hygiene Products", slug: "why-nafdac-registration-matters", excerpt: "NAFDAC registration ensures your hygiene products meet Nigerian safety standards.", date: "2026-04-28", category: "Industry", author: "RoyalGad" },
  { title: "The Importance of Hand Hygiene in Healthcare Settings", slug: "importance-hand-hygiene-healthcare", excerpt: "Hand hygiene is the single most important measure to prevent healthcare-associated infections.", date: "2026-04-15", category: "Hygiene Tips", author: "RoyalGad" },
  { title: "Contract Manufacturing vs Private Labelling: Which Is Right for Your Business?", slug: "contract-manufacturing-vs-private-labelling", excerpt: "Understand the key differences between contract manufacturing and private labelling.", date: "2026-04-01", category: "Company News", author: "RoyalGad" },
  { title: "RoyalGad Receives NAFDAC Renewal for All Products", slug: "royalgad-nafdac-renewal-2026", excerpt: "We are proud to announce that all RoyalGad products have successfully renewed NAFDAC registration.", date: "2026-03-20", category: "Company News", author: "RoyalGad" },
];

const categories = ["All", "Hygiene Tips", "Company News", "Product Updates", "Industry"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-800/90 to-brand-green-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold">Our Blog</h1>
          <p className="mt-3 text-brand-green-100 max-w-2xl mx-auto">
            Hygiene tips, product news, and educational content from the RoyalGad team.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat ? "bg-brand-green-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative aspect-video bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-500 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <Shield className="h-12 w-12" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400 mb-3">
                      <span className="px-2 py-1 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-brand-green-600 dark:group-hover:text-brand-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                        <User className="h-3 w-3" /> {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-600 dark:text-brand-green-400 group-hover:underline">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
