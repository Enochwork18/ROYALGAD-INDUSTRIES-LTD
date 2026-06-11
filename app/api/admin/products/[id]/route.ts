import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { sizes: true, images: true },
    });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        category: body.category,
        howToUse: body.howToUse,
        ingredients: body.ingredients,
        nafdacNumber: body.nafdacNumber,
        featured: body.featured,
        inStock: body.inStock,
      },
    });
    if (body.sizes) {
      await prisma.productSize.deleteMany({ where: { productId: params.id } });
      for (const size of body.sizes) {
        await prisma.productSize.create({
          data: {
            productId: params.id,
            size: size.size,
            price: parseFloat(size.price),
            stock: size.stock || 0,
          },
        });
      }
    }
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
