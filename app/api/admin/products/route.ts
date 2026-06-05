import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ProductSizeSchema = z.object({
  size: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
})

const CreateProductSchema = z.object({
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

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const products = await prisma.product.findMany({
      include: { sizes: true, images: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const { sizes, images, ...productData } = parsed.data

    const product = await prisma.product.create({
      data: {
        ...productData,
        sizes: { create: sizes },
        images: images ? { create: images } : undefined,
      },
      include: { sizes: true, images: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Product create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
