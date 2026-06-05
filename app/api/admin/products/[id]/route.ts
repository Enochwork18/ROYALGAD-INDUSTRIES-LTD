import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ProductSizeSchema = z.object({
  size: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
})

const UpdateProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  benefits: z.string().default("[]"),
  howToUse: z.string().min(1),
  ingredients: z.string().min(1),
  nafdacNumber: z.string().min(1),
  sizes: z.array(ProductSizeSchema).min(1),
  inStock: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  images: z.array(z.object({ url: z.string().url(), alt: z.string().default(''), order: z.number().int().optional() })).optional(),
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const body = await req.json()
    const parsed = UpdateProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const { sizes, images, ...productData } = parsed.data

    await prisma.productSize.deleteMany({ where: { productId: id } })
    if (images) {
      await prisma.productImage.deleteMany({ where: { productId: id } })
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        sizes: { create: sizes },
        images: images ? { create: images } : undefined,
      },
      include: { sizes: true, images: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Product delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const body = await req.json()
    const { field } = body

    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    if (field === 'featured') {
      const updated = await prisma.product.update({ where: { id }, data: { featured: !product.featured } })
      return NextResponse.json(updated)
    }
    if (field === 'inStock') {
      const updated = await prisma.product.update({ where: { id }, data: { inStock: !product.inStock } })
      return NextResponse.json(updated)
    }

    return NextResponse.json({ error: 'Invalid field' }, { status: 400 })
  } catch (error) {
    console.error('Product toggle error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
