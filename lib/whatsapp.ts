const WHATSAPP_NUMBER = "2348023282550";

export async function sendWhatsAppOrderAlert(orderId: string) {
  const message = `New order alert! Order #${orderId.slice(0, 8)} has been paid and is ready for processing.`;

  try {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    console.log("WhatsApp alert URL:", url);
  } catch (err) {
    console.error("WhatsApp alert failed:", err);
  }
}
