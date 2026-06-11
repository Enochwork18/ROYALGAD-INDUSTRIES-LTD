import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateReference(): string {
  return `RG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function calculateSubtotal(items: { productId: string; variantId?: string; quantity: number }[]): Promise<number> {
  const { prisma } = await import("@/lib/prisma");
  let total = 0;
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { sizes: true },
    });
    if (product && product.sizes.length > 0) {
      const size = item.variantId ? product.sizes.find((s) => s.id === item.variantId) : product.sizes[0];
      if (size) total += size.price * item.quantity;
    }
  }
  return total;
}
