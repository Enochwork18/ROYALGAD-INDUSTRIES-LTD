"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md">
        <motion.p
          className="text-[120px] leading-none font-extrabold text-brand-green-600 dark:text-brand-green-400 select-none"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/" className="btn-primary">
              Go to Homepage
            </Link>
            <Link href="/products" className="btn-outline">
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
