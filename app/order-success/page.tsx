"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import FadeInSection from "@/components/ui/FadeInSection";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) {
      setLoading(false);
      return;
    }
    fetch(`/api/payment/verify?reference=${reference}`)
      .then((res) => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then((data) => {
        setOrder(data.order);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not verify payment. Please contact support.");
        setLoading(false);
      });
  }, [reference]);

  return (
    <section className="py-20">
      <FadeInSection>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">
            {loading ? "Verifying Payment..." : error ? "Payment Verification" : "Thank You! Your Order Has Been Received."}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-4 text-lg">
            {loading
              ? "Please wait while we verify your payment..."
              : error
              ? error
              : "A confirmation email has been sent to your email address. You will also receive a WhatsApp notification with your order details."}
          </p>

          {order && (
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 mt-8 text-left">
              <h2 className="font-bold text-gray-900 dark:text-slate-100 mb-3">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Order Reference</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">{order.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Customer</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Email</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">{order.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Total Paid</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Estimated Delivery</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">3-5 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Payment Status</span>
                  <span className="font-medium text-green-600">Paid ✓</span>
                </div>
              </div>
            </div>
          )}

          {!reference && !loading && (
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 mt-8 text-left">
              <h2 className="font-bold text-gray-900 dark:text-slate-100 mb-3">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Order Reference</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">RG-20260603-XXXXXXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Estimated Delivery</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">3-5 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Payment Status</span>
                  <span className="font-medium text-green-600">Paid ✓</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/products" className="btn-primary">
              <Package className="h-4 w-4" /> Continue Shopping
            </Link>
            <a
              href="https://wa.me/2348023282550"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Track via WhatsApp
            </a>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-5 w-5 border-2 border-brand-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </section>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
