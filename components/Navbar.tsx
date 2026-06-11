"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Sun, Moon, Menu, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/partners", label: "Partners" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const itemCount = useCart((s) => s.getItemCount());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled
      ? "backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-b border-gray-100/50 dark:border-gray-800/50 shadow-sm"
      : "bg-transparent"
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logos/logo2.png"
              alt="RoyalGad"
              width={48}
              height={48}
              className="h-12 w-auto"
              priority
            />
            <div className="hidden sm:block border-l border-gray-300 dark:border-gray-700 pl-3">
              <p className="text-xs font-bold text-gray-900 dark:text-white leading-none">ROYALGAD AG</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5">INDUSTRIES LTD</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                  pathname === link.href
                    ? "text-brand-green-600 dark:text-brand-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-brand-green-600 dark:hover:text-brand-green-400"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand-green-600 dark:bg-brand-green-400 transition-all duration-300",
                  pathname === link.href ? "w-4" : "w-0 group-hover:w-4"
                )} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-brand-green-600 dark:hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div key={isDark ? "dark" : "light"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </button>

            <Link
              href="/cart"
              className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-brand-green-600 dark:hover:text-brand-green-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <motion.div
                key={itemCount}
                animate={{ scale: [1, 1.3, 1, 1.15, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.div>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-brand-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            <Link href="/products" className="hidden lg:inline-flex btn-primary text-sm !px-5 !py-2.5">
              Order Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 lg:hidden bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <Image
                  src="/logos/logo2.png"
                  alt="RoyalGad"
                  width={36}
                  height={36}
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-brand-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-brand-green-50 dark:bg-brand-green-900/30 text-brand-green-700 dark:text-brand-green-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
