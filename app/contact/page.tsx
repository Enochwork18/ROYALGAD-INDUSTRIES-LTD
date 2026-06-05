"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/lib/store";
import FadeInSection from "@/components/ui/FadeInSection";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | RoyalGad AG Industries Ltd";
  }, []);
  const showToast = useToast((s) => s.show);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      showToast("Message sent! We will get back to you within 24 hours.");
      form.reset();
    } catch {
      showToast("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-800/90 to-brand-green-700/90" />
        </div>
        <FadeInSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="eyebrow text-brand-green-200">Get In Touch</p>
            <h1 className="text-4xl lg:text-5xl font-bold">Contact Us</h1>
            <p className="mt-3 text-brand-green-100 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Reach out for orders, partnerships, or any inquiries.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="py-16 lg:py-24">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Contact Us</p>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="aspect-[16/9] bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126316.0!2d3.8662!3d7.3775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d0d0a0d0a0d%3A0x0!2sIbadan!5e0!3m2!1sen!2sng!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RoyalGad Location"
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-slate-100">Office Address</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Tipper Garage Area, Ibadan, Oyo State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-brand-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-slate-100">Business Hours</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Monday – Friday: 8am – 5pm</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Saturday: 9am – 2pm</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 p-6 lg:p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Full Name *</label>
                      <input type="text" id="name" name="name" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email Address *</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Subject *</label>
                      <select id="subject" name="subject" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent">
                        <option value="">Select a subject</option>
                        <option value="order">Product Order</option>
                        <option value="contract">Contract Manufacturing</option>
                        <option value="private-label">Private Labelling</option>
                        <option value="branding">Product Branding</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Message *</label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-slate-800/50">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Phone, title: "Call Us", items: ["+234 802 328 2550", "+234 805 147 4151", "+234 809 842 5876"], href: "tel:+2348023282550" },
                { icon: Mail, title: "Email Us", items: ["info@royalgad.com.ng"], href: "mailto:info@royalgad.com.ng" },
                { icon: MessageCircle, title: "WhatsApp", items: ["Chat with us on WhatsApp"], href: "https://wa.me/2348023282550" },
              ].map((item) => (
                <div key={item.title} className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 text-center hover:shadow-md transition-shadow">
                  <item.icon className="h-8 w-8 text-brand-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">{item.title}</h3>
                  {item.items.map((i) => (
                    <p key={i} className="text-sm text-gray-600 dark:text-slate-400">{i}</p>
                  ))}
                  <Link href={item.href} className="text-sm font-medium text-brand-green-600 hover:text-brand-green-700 mt-2 inline-block">
                    {item.title === "WhatsApp" ? "Send a message →" : "Contact now →"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
