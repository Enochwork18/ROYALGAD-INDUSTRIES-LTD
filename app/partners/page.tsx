"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Factory, School, Hotel, Store, Users, Stethoscope, ArrowRight, Send, CheckCircle, Shield, TrendingUp, Package, Award } from "lucide-react";
import { useToast } from "@/lib/store";
import FadeInSection from "@/components/ui/FadeInSection";

export default function PartnersPage() {
  const showToast = useToast((s) => s.show);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement).value,
      contactPerson: (form.elements.namedItem("contactPerson") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      partnershipType: (form.elements.namedItem("partnershipType") as HTMLSelectElement).value,
      productInterest: (form.elements.namedItem("productInterest") as HTMLInputElement).value,
      monthlyVolume: (form.elements.namedItem("monthlyVolume") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      showToast("Quote request submitted! Our team will contact you within 24 hours.");
      form.reset();
    } catch {
      showToast("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-800/90 to-brand-green-700/90" />
        </div>
        <FadeInSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold">Grow Your Business With RoyalGad</h1>
            <p className="mt-3 text-brand-green-100 max-w-2xl mx-auto">
              Join hundreds of businesses that partner with RoyalGad for quality hygiene products and manufacturing services.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Partners</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Who We Work With</h2>
              <p className="section-subtitle">RoyalGad partners with a wide range of businesses and institutions across Nigeria.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Stethoscope, label: "Hospitals & Clinics" },
                { icon: School, label: "Schools & Universities" },
                { icon: Hotel, label: "Hotels & Hospitality" },
                { icon: Store, label: "Supermarkets & Retail Chains" },
                { icon: Building2, label: "Government Institutions" },
                { icon: Building2, label: "Real Estate & Facility Mgmt" },
                { icon: Users, label: "Small Business Resellers" },
                { icon: Package, label: "Entrepreneurs & Startups" },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 text-center hover:shadow-lg hover:border-brand-green-200 dark:hover:border-brand-green-800 transition-all">
                  <item.icon className="h-10 w-10 text-brand-green-600 mx-auto mb-3" />
                  <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Options</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Partnership Options</h2>
              <p className="section-subtitle">Choose the partnership model that works best for your business.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Factory, title: "Contract Manufacturing", desc: "We produce your hygiene products to your specifications." },
                { icon: Package, title: "Private Labelling", desc: "Sell our products under your own brand name." },
                { icon: TrendingUp, title: "Wholesale Distribution", desc: "Become an authorized distributor of RoyalGad products." },
                { icon: Shield, title: "Product Branding", desc: "Let us help you build your hygiene product brand." },
              ].map((opt) => (
                <div key={opt.title} className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 hover:shadow-md transition-shadow">
                  <opt.icon className="h-10 w-10 text-brand-green-600 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">{opt.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Benefits</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Why Partner With RoyalGad</h2>
              <p className="section-subtitle">What makes us the right partner for your business.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "20+ Years Experience", desc: "Over two decades of manufacturing excellence." },
                { icon: Shield, title: "NAFDAC Certified", desc: "All products meet national regulatory standards." },
                { icon: TrendingUp, title: "Competitive Pricing", desc: "Best value for quality hygiene products." },
                { icon: CheckCircle, title: "Reliable & Trusted", desc: "Trusted by hospitals, schools, and businesses nationwide." },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <item.icon className="h-12 w-12 text-brand-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Get Started</p>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Request a Quote</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-3">
                  Ready to partner? Fill out this form and our team will get back to you within 24 hours.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Custom quote tailored to your business needs",
                    "Volume-based pricing for maximum value",
                    "Dedicated account manager for B2B partners",
                    "Fast response and delivery timelines",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-green-500 mt-0.5 shrink-0" />
                      <p className="text-gray-600 dark:text-slate-400">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 p-6 lg:p-8 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Company Name *</label>
                      <input type="text" id="companyName" name="companyName" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Contact Person *</label>
                      <input type="text" id="contactPerson" name="contactPerson" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email Address *</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Type of Partnership *</label>
                    <select id="partnershipType" name="partnershipType" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent">
                      <option value="">Select partnership type</option>
                      <option value="contract">Contract Manufacturing</option>
                      <option value="private-label">Private Labelling</option>
                      <option value="branding">Product Branding</option>
                      <option value="distribution">Wholesale Distribution</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Product Interest</label>
                      <input type="text" id="productInterest" name="productInterest" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" placeholder="e.g. Germicide, Hand Wash" />
                    </div>
                    <div>
                      <label htmlFor="monthlyVolume" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Monthly Volume Estimate</label>
                      <input type="text" id="monthlyVolume" name="monthlyVolume" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" placeholder="e.g. 1000 units" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Message</label>
                    <textarea id="message" name="message" rows={3} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
                    {loading ? "Submitting..." : "Submit Quote Request"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
