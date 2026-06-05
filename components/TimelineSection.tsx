"use client";

import { motion } from "framer-motion";
import FadeInSection from "@/components/ui/FadeInSection";

const milestones = [
  { year: "2002", title: "Company Incorporated", description: "RoyalGad AG Industries Ltd was incorporated on 3rd October 2002 with just ₦10,000 seed capital by Mr. Lawal." },
  { year: "2005", title: "First NAFDAC Registration", description: "Obtained first NAFDAC registration, marking the beginning of regulated, quality production." },
  { year: "2010", title: "Expanded to Industrial Clients", description: "Began supplying hospitals, schools, and corporate clients with bulk disinfectant solutions." },
  { year: "2020", title: "COVID-19 Response", description: "Launched hand sanitizer production to meet national demand during the pandemic." },
  { year: "2024", title: "New Facility & Expansion", description: "Moved to expanded facility in Ibadan, Oyo State with increased production capacity." },
  { year: "2026", title: "Digital Transformation", description: "Launching modern e-commerce platform to serve customers nationwide online." },
];

export default function TimelineSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-800/50">
      <FadeInSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Our Journey</p>
          <div className="text-center mb-12">
            <h2 className="section-title">Milestones & Timeline</h2>
            <p className="section-subtitle">Key milestones that shaped RoyalGad into the brand it is today.</p>
          </div>
          <div className="relative">
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-green-200 dark:bg-brand-green-900 -translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: "top" }}
            />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                      className={`inline-block bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                    >
                      <span className="text-sm font-bold text-brand-green-600">{m.year}</span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mt-1">{m.title}</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm mt-2">{m.description}</p>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: i * 0.15 + 0.05 }}
                    className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-green-600 rounded-full border-4 border-white dark:border-slate-900 shadow -translate-x-1/2 mt-6 z-10"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="md:hidden ml-10 bg-white dark:bg-slate-800 p-5 rounded-xl border dark:border-slate-700 shadow-sm flex-1"
                  >
                    <span className="text-sm font-bold text-brand-green-600">{m.year}</span>
                    <h3 className="font-bold text-gray-900 dark:text-slate-100 mt-1">{m.title}</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-2">{m.description}</p>
                  </motion.div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
