import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'

const QuoteRequestSchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  partnershipType: z.string().min(2),
  productInterest: z.string().optional(),
  monthlyVolume: z.string().optional(),
  message: z.string().max(5000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(`partners:${ip}`, 5, 60_000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = QuoteRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const quote = await prisma.quoteRequest.create({ data: parsed.data })
    return NextResponse.json({ success: true, id: quote.id }, { status: 201 })
  } catch (error) {
    console.error('Partner quote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
