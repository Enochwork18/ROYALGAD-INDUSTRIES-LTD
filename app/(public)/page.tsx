import Link from "next/link";
import Image from "next/image";
import { Shield, Truck, Award, Leaf, CheckCircle, ArrowRight, Factory, FlaskConical, Tag, Calendar } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FadeInSection from "@/components/ui/FadeInSection";
import CountUp from "@/components/ui/CountUp";
import HeroSection from "@/components/HeroSection";

const featuredProducts = [
  {
    name: "RoyalGad Germicide",
    slug: "royalgad-germicide",
    description: "Powerful germicide for disinfecting surfaces. Kills 99.9% of germs. NAFDAC approved.",
    price: 800,
    category: "Germicide",
  },
  {
    name: "RoyalGad Antiseptic",
    slug: "royalgad-antiseptic",
    description: "Antiseptic solution for wound cleaning and personal hygiene. Trusted by healthcare professionals.",
    price: 900,
    category: "Antiseptic",
  },
  {
    name: "RoyalGad Hand Sanitizer",
    slug: "royalgad-hand-sanitizer",
    description: "Alcohol-based hand sanitizer. Portable and effective protection on the go.",
    price: 500,
    category: "Hand Care",
  },
  {
    name: "RoyalGad Pine Disinfectant",
    slug: "royalgad-pine-disinfectant",
    description: "Pine-scented multipurpose disinfectant for homes and offices. Fresh and powerful.",
    price: 750,
    category: "Disinfectant",
  },
  {
    name: "RoyalGad Lysol Disinfectant",
    slug: "royalgad-lysol-disinfectant",
    description: "Professional-grade Lysol disinfectant for superior germ protection in homes and hospitals.",
    price: 1200,
    category: "Disinfectant",
  },
  {
    name: "RoyalGad Toilet Cleaner",
    slug: "royalgad-toilet-cleaner",
    description: "Powerful toilet cleaner that removes stains, kills germs, and leaves a fresh scent.",
    price: 700,
    category: "Toilet Care",
  },
  {
    name: "RoyalGad Hand Wash",
    slug: "royalgad-hand-wash",
    description: "Gentle antibacterial hand wash for daily use. Leaves hands clean, soft, and protected.",
    price: 600,
    category: "Hand Care",
  },
  {
    name: "RoyalGad Industrial Cleaner",
    slug: "royalgad-industrial-cleaner",
    description: "Heavy-duty industrial cleaner for factories, warehouses, and commercial spaces.",
    price: 5000,
    category: "Industrial",
  },
];

const testimonials = [
  {
    name: "Dr. Adebayo O.",
    role: "Medical Director, Ibadan General Hospital",
    quote: "RoyalGad has been our trusted supplier for over 5 years. Their germicides meet our strict hospital standards consistently.",
    rating: 5,
  },
  {
    name: "Mrs. Funke A.",
    role: "Hotel Manager, Lagos",
    quote: "We use RoyalGad products exclusively across all our properties. The quality is unmatched and delivery is always on time.",
    rating: 5,
  },
  {
    name: "Emeka N.",
    role: "Pharmacy Owner, Abuja",
    quote: "My customers trust RoyalGad. The NAFDAC certification gives them confidence and the affordable pricing keeps them coming back.",
    rating: 4,
  },
];

const blogPosts = [
  {
    title: "EID MUBARAK — RoyalGad Wishes You a Blessed Celebration",
    slug: "eid-mubarak-2026",
    excerpt: "RoyalGad AG Industries Ltd celebrates Eid with you. Wishing you peace, blessings, and joy this festive season.",
    date: "2026-06-03",
    image: "/images/EID MUBARAK.png",
  },
  {
    title: "RoyalGad Lysol Disinfectant for Farmers — Protect Your Livestock",
    slug: "lysol-disinfectant-for-farmers",
    excerpt: "Farmers, keep your livestock and farm environment safe with RoyalGad Lysol Disinfectant. NAFDAC-approved and highly effective.",
    date: "2026-05-30",
    image: "/images/lysol-for-farmers.png",
  },
  {
    title: "Happy Children's Day — RoyalGad Celebrates Every Child",
    slug: "happy-childrens-day-2026",
    excerpt: "RoyalGad celebrates the joy and promise of every child. Happy Children's Day from all of us!",
    date: "2026-05-27",
    image: "/images/happy-childrens-day.png",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Our Products</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">
                Our most popular hygiene and disinfectant products trusted by homes and businesses across Nigeria.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} {...product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/products" className="btn-outline">
                View All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-12 bg-brand-green-700 text-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Years of Experience", end: 24, suffix: "+", icon: Award },
                { label: "NAFDAC Products", end: 7, suffix: "+", icon: FlaskConical },
                { label: "States Covered", end: 36, suffix: "", icon: Truck },
                { label: "Happy Customers", end: 10000, suffix: "+", icon: Shield },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <stat.icon className="h-8 w-8 text-brand-green-300" />
                  <div className="text-3xl md:text-4xl font-bold">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-brand-green-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">About the Company</p>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-slate-800">
                <Image
                  src="/images/about.jpg"
                  alt="RoyalGad AG Industries Ltd Facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="section-title text-left">Who We Are</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-6 leading-relaxed">
                  RoyalGad AG Industries Ltd is a proudly Nigerian NAFDAC-registered manufacturer and distributor
                  of high-quality disinfectants, antiseptics, hand wash, germicide, and hygiene products. Founded
                  by Mr. Lawal and incorporated on 3rd October 2002, the company has grown from a ₦10,000 seed
                  capital into a nationally recognized brand.
                </p>
                <p className="text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">
                  We offer Contract Manufacturing, Private Labelling, and Product Branding services to businesses
                  across the country. Our products are trusted by hospitals, schools, hotels, and thousands of
                  Nigerian homes.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: Award, label: "20+ Years Experience", value: "Since 2002" },
                    { icon: FlaskConical, label: "7+ Products", value: "NAFDAC Certified" },
                    { icon: Truck, label: "Nationwide", value: "Delivery" },
                    { icon: Shield, label: "Quality Assured", value: "PCN Approved" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <stat.icon className="h-8 w-8 text-brand-green-600 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{stat.label}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="btn-primary mt-8 inline-flex">
                  Read Our Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">What We Offer</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                Beyond manufacturing, we partner with businesses to bring their hygiene product visions to life.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Factory,
                  title: "Contract Manufacturing",
                  description:
                    "We produce and package hygiene products for other companies according to their specifications. NAFDAC certified facility with experienced staff.",
                  link: "/services#contract-manufacturing",
                },
                {
                  icon: Tag,
                  title: "Private Labelling",
                  description:
                    "We manufacture our products and package them under your brand name. Ideal for businesses wanting to sell hygiene products without building a factory.",
                  link: "/services#private-labelling",
                },
                {
                  icon: FlaskConical,
                  title: "Product Branding",
                  description:
                    "We help businesses develop their brand identity for hygiene products — including label design, color scheme, and market positioning.",
                  link: "/services#product-branding",
                },
              ].map((service) => (
                <div key={service.title} className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-brand-green-100 dark:bg-brand-green-900/40 rounded-xl flex items-center justify-center mb-5">
                    <service.icon className="h-7 w-7 text-brand-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-5 leading-relaxed">{service.description}</p>
                  <Link href={service.link} className="text-brand-green-600 dark:text-brand-green-400 font-medium hover:text-brand-green-700 dark:hover:text-brand-green-300 inline-flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-brand-green-700 text-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Partnership</p>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold">Why Partner With Us</h2>
              <p className="text-brand-green-100 mt-4 max-w-2xl mx-auto">
                Join hundreds of businesses that trust RoyalGad for their hygiene product needs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, title: "Competitive Pricing", desc: "Best value for quality hygiene products" },
                { icon: Shield, title: "Quality Control", desc: "NAFDAC & PCN certified production" },
                { icon: Truck, title: "Reliable Logistics", desc: "Nationwide delivery on schedule" },
                { icon: Award, title: "Customer Service", desc: "Dedicated support team for partners" },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-brand-green-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/contact" className="btn-accent text-lg !px-8 !py-4">
                Contact Us Now
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Testimonials</p>
            <div className="text-center mb-12">
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">
                Hear from the businesses and individuals who trust RoyalGad for their hygiene needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Latest Updates</p>
            <div className="text-center mb-12">
              <h2 className="section-title">Latest From Our Blog</h2>
              <p className="section-subtitle">
                Hygiene tips, product news, and educational content to keep you informed.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 dark:bg-slate-700 relative overflow-hidden">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 dark:text-slate-500">
                          <Calendar className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{post.date}</p>
                      <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-brand-green-600 dark:group-hover:text-brand-green-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 line-clamp-2">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-600 dark:text-brand-green-400 mt-3 group-hover:underline">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
