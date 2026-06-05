"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, ArrowRight, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/store";
import FadeInSection from "@/components/ui/FadeInSection";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const isEmpty = items.length === 0;

  return (
    <>
      <section className="bg-gray-50 dark:bg-slate-800/50 border-b dark:border-slate-800 py-12">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1">
              {isEmpty ? "Your cart is empty" : `${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="py-12">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isEmpty ? (
            <div className="card p-12 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-slate-400 mb-6">Looks like you haven&apos;t added any products yet.</p>
              <Link href="/products" className="btn-primary inline-flex">
                <ArrowLeft className="h-4 w-4" /> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 dark:text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.slug}`} className="font-semibold text-gray-900 dark:text-slate-100 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors line-clamp-1 text-sm sm:text-base">
                          {item.name}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">{item.size}</p>
                        <p className="text-xs sm:text-sm font-medium text-brand-green-700 dark:text-brand-green-400 mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-slate-100">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="font-bold text-gray-900 dark:text-slate-100">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-slate-100">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-slate-100 text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-28">
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-4">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-slate-400">
                      <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span className="font-medium text-gray-900 dark:text-slate-100">{formatPrice(getTotal())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-slate-400">
                      <span>Delivery</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <hr className="dark:border-slate-700" />
                    <div className="flex justify-between font-bold text-gray-900 dark:text-slate-100 text-base">
                      <span>Total</span>
                      <span>{formatPrice(getTotal())}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="btn-primary w-full mt-6">
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/products" className="block text-center text-sm text-brand-green-600 dark:text-brand-green-400 hover:text-brand-green-700 mt-3">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        </FadeInSection>
      </section>
    </>
  );
}
