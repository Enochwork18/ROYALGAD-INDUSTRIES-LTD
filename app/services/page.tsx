import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Factory, Tag, FlaskConical, CheckCircle, ArrowRight, Minus, Plus } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

export const metadata: Metadata = {
  title: "Services",
  description: "RoyalGad offers Contract Manufacturing, Private Labelling, and Product Branding services for businesses across Nigeria.",
};

const faqs = [
  { q: "What is the minimum order quantity for Contract Manufacturing?", a: "Minimum 500 litres per product run for Contract Manufacturing." },
  { q: "What is the minimum order for Private Labelling?", a: "Minimum 200 units for Private Labelling services." },
  { q: "How long does a production run take?", a: "Lead time is typically 2-4 weeks from order confirmation to delivery." },
  { q: "Do you handle label design and branding?", a: "Yes, our Product Branding service includes label design, color scheme, brand name development, and market positioning." },
  { q: "What products are available for Private Labelling?", a: "Hand Wash, Germicide, Antiseptic, and other hygiene products in our catalog." },
  { q: "Are your facilities NAFDAC certified?", a: "Yes, all our production facilities are NAFDAC registered and Pharmaceutical Council of Nigeria approved." },
  { q: "Do you deliver nationwide?", a: "Yes, we deliver to all 36 states in Nigeria through our logistics partners." },
  { q: "What is the pricing structure for bulk orders?", a: "Pricing depends on volume, product type, and packaging requirements. Contact us for a custom quote." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-800/90 to-brand-green-700/90" />
        </div>
        <FadeInSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold">Our Services</h1>
            <p className="mt-3 text-brand-green-100 max-w-2xl mx-auto">
              Beyond manufacturing, we partner with businesses to bring their hygiene product visions to life.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section id="contract-manufacturing" className="py-16 lg:py-24 scroll-mt-20">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Service</p>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-brand-green-100 dark:bg-brand-green-900/40 rounded-2xl flex items-center justify-center mb-6">
                  <Factory className="h-8 w-8 text-brand-green-600" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">Contract Manufacturing</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">
                  We produce and package hygiene products for other companies according to their specifications.
                  We have the equipment, staff, and NAFDAC certification to manufacture on behalf of businesses
                  that do not have their own factory.
                </p>
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">How It Works</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Consultation", desc: "We discuss your product requirements, specifications, and volume needs." },
                      { step: "2", title: "Agreement", desc: "We agree on formulation, packaging, timeline, and pricing." },
                      { step: "3", title: "Production", desc: "Our NAFDAC-certified facility produces your product to specification." },
                      { step: "4", title: "Delivery", desc: "Quality checked and delivered to your location nationwide." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <div className="w-8 h-8 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                          {s.step}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-slate-100">{s.title}</p>
                          <p className="text-sm text-gray-600 dark:text-slate-400">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 p-5 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Minimum Order</p>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">500 litres</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Lead Time</p>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">2-4 weeks</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Pricing From</p>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">₦500,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">NAFDAC Certified</p>
                    <p className="font-semibold text-green-600">✓ Yes</p>
                  </div>
                </div>
                <Link href="/contact" className="btn-primary mt-6 inline-flex">
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/images/services-professional-cleaning.jpg" alt="Contract Manufacturing" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section id="private-labelling" className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50 scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image src="/images/services-clorox.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <p className="eyebrow">Service</p>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/images/services-octomaids.jpg" alt="Private Labelling" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="w-16 h-16 bg-brand-green-100 dark:bg-brand-green-900/40 rounded-2xl flex items-center justify-center mb-6">
                  <Tag className="h-8 w-8 text-brand-green-600" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">Private Labelling</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">
                  We produce our products and package them under your brand name and label. Ideal for
                  businesses that want to sell hygiene products without building a factory. You get
                  quality products with your branding, packaged and ready for sale.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8 p-5 bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Minimum Order</p>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">200 units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Products Available</p>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">Hand Wash, Germicide, Antiseptic</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  {[
                    "Your brand, our quality manufacturing",
                    "NAFDAC compliant production",
                    "Custom packaging and labeling",
                    "Fast turnaround times",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                      <CheckCircle className="h-4 w-4 text-brand-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 inline-flex">
                  Start Private Labelling <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section id="product-branding" className="py-16 lg:py-24 scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image src="/images/services-best-cleaning.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <p className="eyebrow">Service</p>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-brand-green-100 dark:bg-brand-green-900/40 rounded-2xl flex items-center justify-center mb-6">
                  <FlaskConical className="h-8 w-8 text-brand-green-600" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">Product Branding</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">
                  We help businesses develop their brand identity for hygiene products — including label
                  design, color scheme, brand name development, and market positioning. From concept to
                  shelf-ready product, we guide you through the entire branding process.
                </p>
                <ul className="mt-6 space-y-2">
                  {[
                    "Label design and development",
                    "Brand color scheme and identity",
                    "Product naming and positioning",
                    "Market-ready packaging design",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                      <CheckCircle className="h-4 w-4 text-brand-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 inline-flex">
                  Discuss Your Brand <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/images/services-clean-house.jpg" alt="Product Branding" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">FAQ</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Common questions about our services.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 open:border-brand-green-300 dark:open:border-brand-green-700 open:ring-1 open:ring-brand-green-300 dark:open:ring-brand-green-700 transition-all">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-gray-900 dark:text-slate-100 font-medium hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
                    {faq.q}
                    <Plus className="h-4 w-4 shrink-0 group-open:hidden" />
                    <Minus className="h-4 w-4 shrink-0 hidden group-open:block" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
