import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const from = process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@royalgad.com.ng";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const to = process.env.CONTACT_EMAIL || "hr.agindustries24@gmail.com";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#166534;color:white;padding:20px;text-align:center">
        <h2 style="margin:0">New Contact Message</h2>
      </div>
      <div style="padding:20px;border:1px solid #e5e7eb">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:600;color:#374151">Name</td><td style="padding:8px">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#374151">Email</td><td style="padding:8px">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding:8px;font-weight:600;color:#374151">Phone</td><td style="padding:8px">${data.phone}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:600;color:#374151">Subject</td><td style="padding:8px">${data.subject}</td></tr>
        </table>
        <div style="margin-top:16px;padding:12px;background:#f9fafb;border-radius:8px">
          <p style="margin:0 0 8px;font-weight:600;color:#374151">Message:</p>
          <p style="margin:0;color:#4b5563;white-space:pre-wrap">${data.message}</p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `[RoyalGad Contact] ${data.subject} - ${data.name}`,
      html,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
}

export async function sendOrderConfirmationEmail(orderId: string) {
  const to = process.env.CONTACT_EMAIL || "hr.agindustries24@gmail.com";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#166534;color:white;padding:20px;text-align:center">
        <h2 style="margin:0">New Order #${orderId.slice(0, 8)}</h2>
        <p style="margin:4px 0 0;opacity:0.9">Payment Confirmed</p>
      </div>
      <div style="padding:20px;border:1px solid #e5e7eb">
        <p style="color:#374151">A new order has been paid and is ready for processing.</p>
        <p style="color:#4b5563">Order ID: <strong>${orderId}</strong></p>
        <div style="margin-top:16px;padding:12px;background:#f0fdf4;border-radius:8px;text-align:center">
          <p style="margin:0;color:#166534;font-weight:600">Log in to admin to view details</p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `[RoyalGad] New Paid Order #${orderId.slice(0, 8)}`,
      html,
    });
  } catch (err) {
    console.error("Order confirmation email failed:", err);
  }
}

export async function sendNewsletterConfirmation(email: string) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#166534;color:white;padding:20px;text-align:center">
        <h2 style="margin:0">Welcome to RoyalGad!</h2>
      </div>
      <div style="padding:20px;border:1px solid #e5e7eb">
        <p style="color:#374151">Thank you for subscribing to the RoyalGad AG Industries Ltd newsletter.</p>
        <p style="color:#4b5563">You'll receive product updates, hygiene tips, and exclusive offers.</p>
        <div style="margin:20px 0;padding:16px;background:#f0fdf4;border-radius:8px;text-align:center">
          <p style="margin:0;color:#166534;font-weight:600">Stay safe & healthy!</p>
          <p style="margin:4px 0 0;color:#15803d;font-size:14px">RoyalGad AG Industries Ltd</p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: "Welcome to RoyalGad Newsletter!",
      html,
    });
  } catch (err) {
    console.error("Newsletter confirmation email failed:", err);
  }
}
