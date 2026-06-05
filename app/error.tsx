"use client";

import { motion } from "framer-motion";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="text-center max-w-md"
        animate={{ x: [0, -4, 4, -4, 0] }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.p
          className="text-[80px] leading-none font-extrabold text-brand-orange-500 select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Oops
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            An unexpected error occurred. Please try again.
          </p>
          <button onClick={reset} className="btn-primary mt-8">
            Try Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
