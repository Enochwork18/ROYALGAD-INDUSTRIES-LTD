import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendNewsletterConfirmation } from '@/lib/email'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)

    const existing = await prisma.subscriber.findUnique({ where: { email } })
    if (existing) {
      if (!existing.active) {
        await prisma.subscriber.update({ where: { email }, data: { active: true } })
      }
      return NextResponse.json({ success: true, message: 'You are already subscribed!' })
    }

    await prisma.subscriber.create({ data: { email } })
    await sendNewsletterConfirmation(email)

    return NextResponse.json({ success: true, message: 'Thank you for subscribing!' })
  } catch {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
}
