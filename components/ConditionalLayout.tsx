"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
  whatsapp: ReactNode;
  toast: ReactNode;
  pageTransition: ReactNode;
}

export default function ConditionalLayout({ children, navbar, footer, whatsapp, toast, pageTransition }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {navbar}
        <main className="flex-1">{pageTransition}</main>
        {footer}
      </div>
      {whatsapp}
      {toast}
    </>
  );
}
