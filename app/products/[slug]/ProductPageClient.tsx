"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ShoppingCart, Share2, MessageCircle, Shield, Truck, ChevronRight, Check, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart, useToast } from "@/lib/store";
import { products } from "@/lib/products-data";

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

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = products[slug];
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const showToast = useToast((s) => s.show);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Product Not Found</h1>
        <p className="mt-2 text-gray-600 dark:text-slate-400">The product you are looking for does not exist.</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex">Browse Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `${slug}-${selectedSize.size}`,
      name: product.name,
      slug,
      size: selectedSize.size,
      price: selectedSize.price,
    });
    setAdded(true);
    showToast(`${product.name} (${selectedSize.size}) added to cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi RoyalGad! I want to order ${product.name} (${selectedSize.size}) - ${formatPrice(selectedSize.price)}. Please provide more information.`
  );

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
            <Link href="/" className="hover:text-brand-green-600">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-brand-green-600">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span aria-current="page" className="text-gray-900 dark:text-slate-100 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden relative">
              {productImages[slug] ? (
                <Image src={productImages[slug]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 dark:text-slate-600">
                  <Shield className="h-24 w-24" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full text-xs font-semibold">
                  {product.category}
                </span>
                {product.inStock && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">{product.name}</h1>
              <p className="text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">{product.description}</p>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Select Size:</p>
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s)}
                    className={`flex items-center justify-between w-full p-3 border rounded-lg transition-all ${
                      selectedSize.size === s.size
                        ? "border-brand-green-500 bg-brand-green-50 dark:bg-brand-green-900/20 ring-1 ring-brand-green-500"
                        : "border-gray-200 dark:border-slate-700 hover:border-brand-green-300 dark:hover:border-brand-green-600"
                    }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-slate-100">{s.size}</span>
                    <span className="text-lg font-bold text-brand-green-700 dark:text-brand-green-400">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleAddToCart}
                  className={`btn-primary flex-1 transition-all ${added ? "bg-green-600 hover:bg-green-700" : ""}`}
                >
                  {added ? <><Check className="h-5 w-5" /> Added!</> : <><ShoppingCart className="h-5 w-5" /> Add to Cart</>}
                </button>
                <a
                  href={`https://wa.me/2348023282550?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline border-green-500 text-green-600 hover:bg-green-600 hover:text-white flex-1"
                >
                  <MessageCircle className="h-5 w-5" /> Order via WhatsApp
                </a>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast("Link copied to clipboard!");
                  }}
                  className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 hover:text-brand-green-600 dark:hover:text-brand-green-400"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-3">
              <div className="card p-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Key Benefits</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400">
                        <CheckCircle className="h-4 w-4 text-brand-green-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-6 mb-2">How to Use</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{product.howToUse}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-6 mb-2">Ingredients</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{product.ingredients}</p>
                  {product.nafdacNumber !== "NAFDAC REG NO: A7-XXXX" && (
                    <>
                      <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-6 mb-2">NAFDAC Registration</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{product.nafdacNumber}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">Delivery Info</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
                  <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand-green-500" /> Lagos & Ibadan: 2-3 days</li>
                  <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand-green-500" /> Nationwide via courier</li>
                  <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-brand-green-500" /> Secure Paystack payment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(products)
              .filter(([s]) => s !== slug && products[s].category === product.category)
              .slice(0, 4)
              .map(([s, p]) => (
                <Link key={s} href={`/products/${s}`} className="group">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-4 hover:shadow-md transition-shadow">
                    {productImages[s] && (
                      <div className="aspect-square bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden mb-3 relative">
                        <Image src={productImages[s]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      </div>
                    )}
                    <span className="px-2 py-0.5 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full text-xs font-medium">{p.category}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-2 text-sm group-hover:text-brand-green-600 transition-colors">{p.name}</h3>
                    <p className="text-sm font-bold text-brand-green-700 dark:text-brand-green-400 mt-1">{formatPrice(p.sizes[0].price)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
