import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calculateSubtotal, generateReference } from "@/lib/utils";
import { checkRateLimit } from "@/lib/rate-limit";

const InitiateSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(5),
  deliveryAddress: z.string().optional(),
  deliveryMethod: z.string().optional(),
  deliveryFee: z.number().min(0).default(0),
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().min(1),
    })
  ).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(`payment:${ip}`, 10, 60_000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = InitiateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const { customerName, customerEmail, customerPhone, deliveryAddress, deliveryMethod, deliveryFee, items } = parsed.data;

    const subtotal = await calculateSubtotal(items);
    const total = subtotal + deliveryFee;
    const reference = generateReference();

    const order = await prisma.order.create({
      data: {
        reference,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        deliveryMethod,
        subtotal,
        total,
        status: "pending",
        paymentStatus: "unpaid",
        paymentMethod: "paystack",
        items: {
          create: await Promise.all(
            items.map(async (item) => {
              const product = await prisma.product.findUnique({
                where: { slug: item.productId },
                include: { sizes: true },
              });
              const size = item.variantId
                ? product?.sizes.find((s) => s.id === item.variantId)
                : product?.sizes[0];
              return {
                productId: item.productId,
                size: size?.size ?? "",
                quantity: item.quantity,
                price: size?.price ?? 0,
              };
            })
          ),
        },
      },
    });

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customerEmail,
        amount: Math.round(total * 100),
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/order-success?reference=${reference}`,
        metadata: {
          orderId: order.id,
          customerName,
          customerPhone,
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json({ error: "Payment initiation failed" }, { status: 502 });
    }

    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference,
      orderId: order.id,
    }, { status: 201 });
  } catch (error) {
    console.error("Payment initiate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
