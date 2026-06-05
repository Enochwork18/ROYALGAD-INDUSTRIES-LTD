import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { sendWhatsAppOrderAlert } from "@/lib/whatsapp";

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get("reference");
    if (!reference) {
      return NextResponse.json({ error: "Missing reference parameter" }, { status: 400 });
    }

    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed", paystackData }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { reference },
      data: {
        paymentStatus: "paid",
        status: "processing",
      },
      include: { items: { include: { product: true } } },
    });

    sendOrderConfirmationEmail(updatedOrder.id).catch(console.error);
    sendWhatsAppOrderAlert(updatedOrder.id).catch(console.error);

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
