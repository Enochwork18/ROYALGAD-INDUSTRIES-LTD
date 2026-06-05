import type { Metadata } from "next";
import Image from "next/image";
import { Award, Target, Eye, Shield, CheckCircle } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import TimelineSection from "@/components/TimelineSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the inspiring story of RoyalGad AG Industries Ltd — from ₦10,000 seed capital to a nationally recognized disinfectant brand.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-900 to-brand-green-800 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-900/90 to-brand-green-800/90" />
        </div>
        <FadeInSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="eyebrow text-brand-green-200">About Us</p>
            <h1 className="text-4xl lg:text-5xl font-bold">Our Story</h1>
            <p className="mt-4 text-brand-green-100 max-w-2xl mx-auto text-lg">
              From ₦10,000 to a nationally trusted brand — the RoyalGad story of grit, quality, and Nigerian enterprise.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800">
                <Image
                  src="/images/about.jpg"
                  alt="RoyalGad AG Industries Ltd - Factory and Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full text-sm font-medium mb-4">
                  <Award className="h-4 w-4" /> The Founder&apos;s Story
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                  From ₦10,000 to a National Brand
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    Mr. Lawal started RoyalGad AG Industries Ltd in 2002 with just ₦10,000 and an unshakeable
                    vision: to provide quality, affordable hygiene products to Nigerian homes and businesses.
                  </p>
                  <p>
                    What began as a small operation has grown into one of Nigeria&apos;s most trusted manufacturers
                    and distributors of disinfectants, antiseptics, germicides, hand wash, and hygiene products.
                  </p>
                  <p>
                    Today, RoyalGad serves hospitals, schools, hotels, government institutions, and thousands of
                    Nigerian homes with NAFDAC-approved products. We also partner with businesses through our
                    Contract Manufacturing, Private Labelling, and Product Branding services.
                  </p>
                  <p>
                    Our journey is proof that with quality products, integrity, and hard work, Nigerian businesses
                    can compete with the best in the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <TimelineSection />

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-brand-green-50 dark:bg-brand-green-900/20 p-8 rounded-2xl border border-brand-green-100 dark:border-brand-green-900/40">
                <Target className="h-10 w-10 text-brand-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3">Our Mission</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  To provide every Nigerian home and business with NAFDAC-approved, affordable hygiene solutions
                  that protect health and create a germ-free environment.
                </p>
              </div>
              <div className="bg-brand-orange-50 dark:bg-brand-orange-900/20 p-8 rounded-2xl border border-brand-orange-100 dark:border-brand-orange-900/40">
                <Eye className="h-10 w-10 text-brand-orange-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3">Our Vision</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  To become the leading manufacturer of antiseptic disinfectants in West Africa, setting the
                  standard for quality, affordability, and innovation in hygiene products.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Certifications</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Certifications & Trust</h2>
              <p className="section-subtitle">We are fully licensed and certified by Nigerian regulatory bodies.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "NAFDAC Registered", desc: "All products are NAFDAC registered and meet national safety standards." },
                { icon: Award, title: "PCN Approved", desc: "Registered with the Pharmaceutical Council of Nigeria." },
                { icon: CheckCircle, title: "CAC Registered", desc: "Fully incorporated under the Companies and Allied Matters Act." },
                { icon: Award, title: "20+ Years Trust", desc: "Serving Nigerian homes and businesses since 2002." },
              ].map((cert) => (
                <div key={cert.title} className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 text-center hover:shadow-md transition-shadow">
                  <cert.icon className="h-10 w-10 text-brand-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{cert.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                All our products are NAFDAC registered and Pharmaceutical Council of Nigeria approved.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
