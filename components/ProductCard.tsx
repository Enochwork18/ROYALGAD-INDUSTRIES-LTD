"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, ShieldCheck, MessageCircle, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart, useToast } from "@/lib/store";
import { products } from "@/lib/products-data";

interface ProductCardProps {
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  inStock?: boolean;
}

const productImages: Record<string, string> = {
  "royalgad-germicide": "/images/073A8055.jpg",
  "royalgad-antiseptic": "/images/073A8070.jpg",
  "royalgad-hand-sanitizer": "/images/073A8090.jpg",
  "royalgad-pine-disinfectant": "/images/073A8118.jpg",
  "royalgad-lysol-disinfectant": "/images/073A8120.jpg",
  "royalgad-toilet-cleaner": "/images/073A8141.jpg",
  "royalgad-hand-wash": "/images/073A8151.jpg",
  "royalgad-industrial-cleaner": "/images/073A8158.jpg",
};

export default function ProductCard({ name, slug, description, price, image, category, inStock = true }: ProductCardProps) {
  const imgSrc = image || productImages[slug];
  const addItem = useCart((s) => s.addItem);
  const showToast = useToast((s) => s.show);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = products[slug];
    const size = product?.sizes[0] || { size: "1L", price };
    addItem({ id: `${slug}-${size.size}`, name, slug, size: size.size, price: size.price });
    setAdded(true);
    showToast(`${name} added to cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${slug}`} className="group card overflow-hidden hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 block bg-white dark:bg-gray-800">
      <div className="relative h-[220px] bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {imgSrc ? (
          <Image src={imgSrc} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-green-700 dark:text-brand-green-400 shadow-sm">
          {category}
        </div>
        <div className="absolute top-3 right-3">
          <ShieldCheck className="h-5 w-5 text-brand-green-600 drop-shadow-sm" aria-label="NAFDAC Approved" />
        </div>
        {!inStock && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-green-600 dark:group-hover:text-brand-green-400 transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-brand-green-600 dark:text-brand-green-400">{formatPrice(price)}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex-1 text-sm !px-3 !py-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              added
                ? "bg-green-600 text-white"
                : inStock
                  ? "bg-brand-green-600 text-white hover:bg-brand-green-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://wa.me/2348023282550?text=${encodeURIComponent(`Hi, I'm interested in ${name}`)}`, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-brand-green-600 text-brand-green-600 hover:bg-brand-green-600 hover:text-white rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
