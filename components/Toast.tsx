"use client";

import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/store";

export default function Toast() {
  const { message, visible, hide } = useToast();

  useEffect(() => {
    if (visible) {
      const t = setTimeout(hide, 2500);
      return () => clearTimeout(t);
    }
  }, [visible, hide]);

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      )}
    >
      <CheckCircle className="h-5 w-5 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={hide} className="p-1 hover:bg-green-700 rounded-lg transition-colors">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
