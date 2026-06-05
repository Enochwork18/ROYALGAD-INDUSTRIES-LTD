import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.user.count();
    if (count > 0) {
      return NextResponse.json({ exists: true });
    }

    const hashed = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        email: "admin@royalgad.com",
        password: hashed,
        name: "Admin",
        role: "admin",
      },
    });

    return NextResponse.json({
      created: true,
      email: "admin@royalgad.com",
      password: "admin123",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
