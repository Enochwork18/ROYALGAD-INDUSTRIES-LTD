import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const message = await prisma.contact.findUnique({ where: { id: params.id } });
    if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const message = await prisma.contact.findUnique({ where: { id: params.id } });
    if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });
    const updated = await prisma.contact.update({
      where: { id: params.id },
      data: { read: !message.read },
    });
    return NextResponse.json({ message: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle message" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.contact.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
