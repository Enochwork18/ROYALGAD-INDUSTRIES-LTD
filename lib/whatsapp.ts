import { prisma } from "@/lib/prisma";

export async function sendWhatsAppOrderAlert(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      console.error("sendWhatsAppOrderAlert: Order not found", orderId);
      return false;
    }

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const recipient = process.env.WHATSAPP_RECIPIENT || "2348023282550";

    const itemsList = order.items
      .map((i) => `• ${i.product?.name || i.productId} x${i.quantity}`)
      .join("\n");

    const message = `🛍️ *NEW ORDER* — ${order.reference}

*Customer:* ${order.customerName}
*Phone:* ${order.customerPhone}
*Email:* ${order.customerEmail}
*Delivery:* ${order.deliveryAddress || "N/A"} (${order.deliveryMethod || "Not specified"})

*Items:*
${itemsList}

*Total:* ₦${order.total.toLocaleString()}
*Payment:* Paid ✓`;

    if (token && phoneId) {
      const cleanNumber = recipient.replace(/[^0-9]/g, "");
      const response = await fetch(
        `https://graph.facebook.com/v22.0/${phoneId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: cleanNumber,
            type: "text",
            text: { body: message },
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("WhatsApp API error:", err);
      }
    } else {
      console.log("WhatsApp not configured. Set WHATSAPP_TOKEN and WHATSAPP_PHONE_ID in .env");
      console.log("===== WHATSAPP MESSAGE (to:", recipient, ") =====");
      console.log(message);
    }

    return true;
  } catch (error) {
    console.error("sendWhatsAppOrderAlert error:", error);
    return false;
  }
}
