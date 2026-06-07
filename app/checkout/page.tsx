"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, CreditCard, Building2, Trash2, Plus, Minus, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useCart, useToast } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import FadeInSection from "@/components/ui/FadeInSection";

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function CheckoutPage() {
  useEffect(() => { document.title = "Checkout | RoyalGad AG Industries Ltd"; }, []);
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart();
  const showToast = useToast((s) => s.show);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  const goNext = () => {
    if (step === 1) {
      if (!name || !email || !phone) {
        showToast("Please fill in all required fields.");
        return;
      }
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 2));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast("Your cart is empty. Add items before checkout.");
      return;
    }
    if (!name || !email || !phone) {
      showToast("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);

    try {
      const cartItems = items.map((item) => ({
        productId: item.slug,
        quantity: item.quantity,
      }));

      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          deliveryAddress: address || undefined,
          deliveryMethod,
          deliveryFee: 0,
          items: cartItems,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Payment initiation failed");
      }

      window.location.href = data.authorization_url;
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-slate-800/50 py-16">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Checkout</h1>
            <p className="text-gray-600 dark:text-slate-400 mt-2">Complete your order securely.</p>
            <div className="flex items-center gap-3 mt-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= s ? "bg-brand-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}>
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline ${step >= s ? "text-brand-green-600 dark:text-brand-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {s === 1 ? "Details" : "Pay"}
                  </span>
                  {s < 2 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-12">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6">
                          <h2 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-4">Customer Details</h2>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Full Name *</label>
                              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email *</label>
                              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone Number *</label>
                              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Delivery Address</label>
                              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6">
                          <h2 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-4">Delivery Method</h2>
                          <div className="space-y-3">
                            {[
                              { value: "pickup", label: "Pickup (Free)", desc: "Collect at our Ibadan facility" },
                              { value: "lagos", label: "Lagos Delivery", desc: "2-3 business days" },
                              { value: "nationwide", label: "Nationwide Courier", desc: "Delivery via courier service" },
                            ].map((method) => (
                              <label key={method.value} className="flex items-center gap-3 p-3 border dark:border-slate-700 rounded-lg cursor-pointer hover:border-brand-green-300 dark:hover:border-brand-green-600 transition-colors">
                                <input type="radio" name="delivery" value={method.value} checked={deliveryMethod === method.value} onChange={() => setDeliveryMethod(method.value)} className="text-brand-green-600 focus:ring-brand-green-500" />
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{method.label}</p>
                                  <p className="text-xs text-gray-500 dark:text-slate-400">{method.desc}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button type="button" onClick={goNext} className="btn-primary">
                            Continue to Payment <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6">
                          <h2 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-4">Payment Method</h2>
                          <div className="flex items-center gap-3 p-3 border dark:border-slate-700 rounded-lg bg-brand-green-50 dark:bg-brand-green-900/20 border-brand-green-200 dark:border-brand-green-800">
                            <CreditCard className="h-6 w-6 text-brand-green-600" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">Paystack Secure Payment</p>
                              <p className="text-xs text-gray-500 dark:text-slate-400">Pay with Card, Bank Transfer, or USSD</p>
                            </div>
                            <Lock className="h-4 w-4 text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-slate-400">
                            <Shield className="h-3 w-3" /> Secured by Paystack. We do not store your card details.
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={submitting || items.length === 0}
                          className="btn-primary w-full text-lg !py-4"
                        >
                          {submitting ? (
                            <><div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                          ) : (
                            <><Lock className="h-5 w-5" /> Pay {formatPrice(getTotal())}</>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={goBack}
                          disabled={submitting}
                          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mx-auto"
                        >
                          <ChevronLeft className="h-4 w-4" /> Back to Details
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 lg:sticky lg:top-28">
                <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-4">Order Summary</h3>
                {items.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 dark:text-slate-500">
                    <Building2 className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Your cart is empty</p>
                    <Link href="/products" className="text-brand-green-600 text-sm font-medium mt-2 inline-block hover:underline">
                      Browse Products →
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="p-2 border dark:border-slate-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{item.name}</p>
                              <p className="text-xs text-gray-500 dark:text-slate-400">{item.size} - {formatPrice(item.price)}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-gray-900 dark:text-slate-100">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <span className="ml-auto text-xs font-medium text-gray-900 dark:text-slate-100">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="my-4 dark:border-slate-700" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600 dark:text-slate-400">
                        <span>Subtotal ({getItemCount()} items)</span>
                        <span className="text-gray-900 dark:text-slate-100 font-medium">{formatPrice(getTotal())}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-slate-400">
                        <span>Delivery</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <hr className="dark:border-slate-700" />
                      <div className="flex justify-between font-bold text-gray-900 dark:text-slate-100 text-base">
                        <span>Total</span>
                        <span>{formatPrice(getTotal())}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </FadeInSection>
      </section>
    </>
  );
}
