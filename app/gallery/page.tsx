"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";

const tabs = ["All", "Products", "Factory", "Team", "Events", "Certificates"];

const galleryItems = [
  ...Array.from({ length: 49 }, (_, i) => {
    const nums = ["8055","8056","8058","8060","8061","8062","8064","8065","8067","8068","8070","8071","8072","8073","8074","8077","8080","8081","8084","8085","8090","8094","8095","8101","8102","8104","8118","8120","8122","8124","8126","8126","8127","8128","8129","8136","8138","8139","8141","8143","8146","8147","8149","8151","8152","8154","8156","8158","8159"];
    return {
      id: i + 1,
      src: `/images/073A${nums[i]}.jpg`,
      category: "Products",
      caption: `RoyalGad Product ${nums[i]}`,
    };
  }),
  { id: 50, src: "/images/about.jpg", category: "Factory", caption: "RoyalGad Manufacturing Facility & Team" },
  { id: 51, src: "/images/services-cleaning.jpg", category: "Events", caption: "RoyalGad at Industry Exhibition" },
  { id: 52, src: "/images/services-professional-cleaning.jpg", category: "Team", caption: "RoyalGad Operations Team" },
  { id: 53, src: "/images/services-octomaids.jpg", category: "Factory", caption: "Production Line Overview" },
  { id: 54, src: "/images/services-best-cleaning.jpg", category: "Certificates", caption: "Quality Standards & Certifications" },
  { id: 55, src: "/images/services-clean-house.jpg", category: "Factory", caption: "Packaging & Distribution Section" },
];

export default function GalleryPage() {
  useEffect(() => {
    document.title = "Gallery | RoyalGad AG Industries Ltd";
  }, []);
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = activeTab === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeTab);

  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-800/90 to-brand-green-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green-200">Visual Showcase</p>
          <h1 className="text-4xl lg:text-5xl font-bold">Gallery</h1>
          <p className="mt-3 text-brand-green-100 max-w-2xl mx-auto">
            A visual look at RoyalGad products, facilities, and team
          </p>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-brand-green-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <FadeInSection>
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square shadow-card hover:shadow-card-hover transition-shadow">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
