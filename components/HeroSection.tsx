"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Award, Truck, Leaf, ChevronDown } from "lucide-react";

const heroWords = ["Nigeria's", "Most", "Trusted"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const heroImages = [
  "/images/073A8055.jpg",
  "/images/073A8070.jpg",
  "/images/073A8090.jpg",
  "/images/073A8118.jpg",
  "/images/073A8120.jpg",
  "/images/073A8141.jpg",
  "/images/073A8151.jpg",
  "/images/073A8158.jpg",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brand-green-900 text-white overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentImage ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover opacity-30 scale-105"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-brand-green-900/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentImage ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow text-brand-green-300"
            >
              Welcome to RoyalGad
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {["NAFDAC Registered", "20+ Years", "Made in Nigeria"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.h1
              className="text-display"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {heroWords.map((word, i) => (
                <motion.span key={word} className="inline-block mr-3" variants={wordVariants}>
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-brand-green-400 inline-block"
                variants={wordVariants}
              >
                Disinfectant Manufacturer
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              NAFDAC-Registered. 20+ Years of Quality. Delivered Nationwide. RoyalGad is Nigeria&apos;s largest
              producer and distributor of Lysol, Antiseptic, and Germicide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link href="/products" className="btn-primary text-lg !px-8 !py-4 shadow-lg shadow-brand-green-600/25">
                Shop Our Products
              </Link>
              <Link href="/partners" className="btn-accent text-lg !px-8 !py-4">
                Become a Partner
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10"
            >
              {[
                { icon: Shield, label: "NAFDAC Approved", sub: "All Products Registered" },
                { icon: Award, label: "20+ Years Trust", sub: "Since 2002" },
                { icon: Truck, label: "Nationwide Delivery", sub: "All 36 States" },
                { icon: Leaf, label: "Made in Nigeria", sub: "Proudly Oyo State" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-gray-400">
                  <item.icon className="h-4 w-4 text-brand-green-400 shrink-0" />
                  <div>
                    <span className="text-gray-300">{item.label}</span>
                    <span className="hidden sm:inline"> &mdash; {item.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-white/50" />
      </motion.div>
    </section>
  );
}
