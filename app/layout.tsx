import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Toast from "@/components/Toast";
import ThemeProvider from "@/components/ThemeProvider";
import PageTransition from "@/components/ui/PageTransition";
import ConditionalLayout from "@/components/ConditionalLayout";
const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://royalgad-industries-ltd.vercel.app'),
  title: {
    default: "RoyalGad AG Industries Ltd - NAFDAC Registered Disinfectant Manufacturer",
    template: "%s | RoyalGad AG Industries Ltd",
  },
  description:
    "Nigeria's largest producer and distributor of RoyalGad Lysol, Antiseptic, Germicide. NAFDAC registered. 20+ years of quality. Order now nationwide.",
  keywords: [
    "RoyalGad", "disinfectant", "antiseptic", "germicide",
    "Nigeria", "NAFDAC", "Lysol", "hand sanitizer", "hygiene products",
  ],
  openGraph: {
    title: "RoyalGad AG Industries Ltd",
    description:
      "Nigeria's trusted manufacturer of NAFDAC-approved disinfectants, antiseptics, and hygiene products since 2002.",
    url: "https://agindustriesltd.net",
    siteName: "RoyalGad AG Industries Ltd",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoyalGad AG Industries Ltd",
    description: "NAFDAC registered disinfectant manufacturer. Order nationwide.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://agindustriesltd.net" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={font.variable}>
      <body className="font-sans min-h-screen antialiased">
        <ThemeProvider>
          <ConditionalLayout
            navbar={<Navbar />}
            footer={<Footer />}
            whatsapp={<WhatsAppButton />}
            toast={<Toast />}
            pageTransition={<PageTransition>{children}</PageTransition>}
          >
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
