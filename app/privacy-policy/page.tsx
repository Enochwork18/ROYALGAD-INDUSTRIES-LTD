"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FadeInSection from "@/components/ui/FadeInSection";

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Information" },
  { id: "payment-security", label: "4. Payment Security" },
  { id: "information-sharing", label: "5. Information Sharing" },
  { id: "data-protection", label: "6. Data Protection" },
  { id: "cookies", label: "7. Cookies" },
  { id: "your-rights", label: "8. Your Rights" },
  { id: "third-party-links", label: "9. Third-Party Links" },
  { id: "changes-to-this-policy", label: "10. Changes to This Policy" },
  { id: "contact-us", label: "11. Contact Us" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-brand-green-800 to-brand-green-700 text-white py-16">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-3 text-brand-green-100">Last updated: June 2026</p>
          </div>
        </FadeInSection>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
            <aside className="hidden lg:block">
              <nav className="sticky top-24 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                  On this page
                </p>
                {sections.map(({ id, label }) => (
                  <Link
                    key={id}
                    href={`#${id}`}
                    className={`block text-sm transition-colors duration-200 ${
                      activeSection === id
                        ? "text-brand-green-600 font-semibold border-l-2 -ml-[calc(1rem+2px)] pl-[calc(1rem-2px)] border-brand-green-600"
                        : "text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-400"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </aside>

            <div>
              <FadeInSection>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2 id="introduction">1. Introduction</h2>
                  <p>
                    RoyalGad AG Industries Ltd (&quot;RoyalGad&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                    visit our website or use our services.
                  </p>

                  <h2 id="information-we-collect">2. Information We Collect</h2>
                  <p>We may collect the following types of information:</p>
                  <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment information when you place an order.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, and IP address for analytics and security purposes.</li>
                    <li><strong>Communication Data:</strong> Information you provide when contacting us via forms, email, or WhatsApp.</li>
                  </ul>

                  <h2 id="how-we-use">3. How We Use Your Information</h2>
                  <p>We use your information for the following purposes:</p>
                  <ul>
                    <li>To process and fulfill your orders</li>
                    <li>To communicate with you about your orders and inquiries</li>
                    <li>To improve our website and services</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To comply with legal obligations</li>
                    <li>To prevent fraud and ensure the security of our website</li>
                  </ul>

                  <h2 id="payment-security">4. Payment Security</h2>
                  <p>
                    All payments on our website are processed securely through Paystack. We do not store credit card
                    details on our servers. Paystack is PCI DSS compliant and uses industry-standard encryption to
                    protect your payment information.
                  </p>

                  <h2 id="information-sharing">5. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information with trusted service providers who assist us in operating our website and conducting
                    our business, provided they agree to keep your information confidential.
                  </p>

                  <h2 id="data-protection">6. Data Protection</h2>
                  <p>
                    We implement a variety of security measures to maintain the safety of your personal information
                    when you place an order or enter, submit, or access your personal information. These measures
                    include encryption, secure servers, and regular security audits.
                  </p>

                  <h2 id="cookies">7. Cookies</h2>
                  <p>
                    Our website uses cookies to enhance your browsing experience. Cookies are small files stored on
                    your device that help us remember your preferences and understand how you use our site. You can
                    choose to disable cookies in your browser settings, though this may affect some functionality.
                  </p>

                  <h2 id="your-rights">8. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>

                  <h2 id="third-party-links">9. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy
                    practices or content of these websites. We encourage you to review their privacy policies.
                  </p>

                  <h2 id="changes-to-this-policy">10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                    the new policy on this page and updating the &quot;Last updated&quot; date.
                  </p>

                  <h2 id="contact-us">11. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <ul>
                    <li>Email: info@royalgad.com.ng</li>
                    <li>Phone: +234 802 328 2550</li>
                    <li>Address: Tipper Garage Area, Ibadan, Oyo State, Nigeria</li>
                  </ul>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
