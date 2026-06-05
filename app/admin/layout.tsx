"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, MessageSquare,
  FileText, Image as ImageIcon, Settings, LogOut, ChevronLeft, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!ready || status === "loading") return;
    if (pathname !== "/admin/login" && !session) {
      router.push("/admin/login");
    }
  }, [pathname, session, status, ready, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/messages?filter=unread")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUnreadMessageCount(data.length);
      })
      .catch(() => {});
  }, []);

  if (!ready || status === "loading") return null;

  if (pathname === "/admin/login") {
    if (session) {
      router.push("/admin");
      return null;
    }
    return <>{children}</>;
  }

  if (!session) return null;

  const sidebar = (
    <>
      <div className="p-5 border-b dark:border-gray-700 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-bold text-brand-green-700 dark:text-brand-green-400">RoyalGad Admin</Link>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors relative",
              pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
                ? "bg-brand-green-50 dark:bg-brand-green-900/30 text-brand-green-700 dark:text-brand-green-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <link.icon className="h-5 w-5 shrink-0" />
            {link.label}
            {link.href === "/admin/messages" && unreadMessageCount > 0 && (
              <span className="ml-auto bg-brand-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadMessageCount > 9 ? "9+" : unreadMessageCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t dark:border-gray-700">
        {session.user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{session.user.name || "Admin"}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user.email || ""}</p>
          </div>
        )}
        <Link href="/" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronLeft className="h-4 w-4" /> Back to Website
        </Link>
        <button onClick={handleSignOut} className="flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:text-red-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 mt-1 w-full text-left">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 hidden lg:flex flex-col shrink-0">
        {sidebar}
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-64 z-50 lg:hidden bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col shadow-2xl"
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/admin" className="text-lg font-bold text-brand-green-700 dark:text-brand-green-400 lg:hidden">RoyalGad Admin</Link>
          </div>
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700">View Site</Link>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
