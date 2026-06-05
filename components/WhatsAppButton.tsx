"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const PHONE_NUMBER = "2348023282550";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${PHONE_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-brand-green-600 hover:bg-brand-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      aria-label="Chat on WhatsApp"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-brand-green-600 animate-ping opacity-25" />
      <MessageCircle className="h-6 w-6 relative" />
    </motion.a>
  );
}
