import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendOrderConfirmationEmail(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      console.error("sendOrderConfirmationEmail: Order not found", orderId);
      return false;
    }

    const transporter = createTransporter();
    const from = process.env.EMAIL_FROM || "info@royalgad.com.ng";
    const adminEmail = process.env.ADMIN_EMAIL || "info@royalgad.com.ng";

    const itemsList = order.items
      .map((i) => `  • ${i.product?.name || i.productId} x${i.quantity} — ₦${i.price.toLocaleString()} each`)
      .join("\n");

    const customerEmailBody = `
Dear ${order.customerName},

Thank you for your order with RoyalGad AG Industries Ltd!

Order Reference: ${order.reference}
Order Date: ${new Date(order.createdAt).toLocaleDateString("en-NG")}

Items Ordered:
${itemsList}

Total Paid: ₦${order.total.toLocaleString()}
Delivery: ${order.deliveryMethod || "To be confirmed"}
Payment Status: Paid ✓

You will receive a WhatsApp notification when your order ships.

If you have any questions, please reply to this email or contact us via WhatsApp at +234 802 328 2550.

Best regards,
RoyalGad AG Industries Ltd
Tipper Garage Area, Ibadan, Oyo State, Nigeria
info@royalgad.com.ng
    `.trim();

    const adminEmailBody = `
🛍️ NEW ORDER RECEIVED

Reference: ${order.reference}
Customer: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone}
Delivery: ${order.deliveryAddress || "N/A"} (${order.deliveryMethod || "Not specified"})

Items:
${itemsList}

Total: ₦${order.total.toLocaleString()}
Payment: Paid via Paystack
    `.trim();

    if (transporter) {
      await transporter.sendMail({
        from: `"RoyalGad" <${from}>`,
        to: order.customerEmail,
        subject: `Order Confirmed — ${order.reference}`,
        text: customerEmailBody,
      });

      await transporter.sendMail({
        from: `"RoyalGad Orders" <${from}>`,
        to: adminEmail,
        subject: `New Order — ${order.reference} — ₦${order.total.toLocaleString()}`,
        text: adminEmailBody,
      });
    } else {
      console.log("SMTP not configured. To send real emails, set SMTP_HOST, SMTP_USER, SMTP_PASS in .env");
      console.log("===== CUSTOMER EMAIL (to:", order.customerEmail, ") =====");
      console.log(customerEmailBody);
      console.log("===== ADMIN EMAIL (to:", adminEmail, ") =====");
      console.log(adminEmailBody);
    }

    return true;
  } catch (error) {
    console.error("sendOrderConfirmationEmail error:", error);
    return false;
  }
}
