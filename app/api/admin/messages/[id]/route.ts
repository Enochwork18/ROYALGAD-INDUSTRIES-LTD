import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const contact = await prisma.contact.findUnique({ where: { id } })
    if (contact) {
      const updated = await prisma.contact.update({ where: { id }, data: { read: !contact.read } })
      return NextResponse.json(updated)
    }

    const quote = await prisma.quoteRequest.findUnique({ where: { id } })
    if (quote) {
      const updated = await prisma.quoteRequest.update({ where: { id }, data: { read: !quote.read } })
      return NextResponse.json(updated)
    }

    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  } catch (error) {
    console.error('Message toggle error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const contact = await prisma.contact.findUnique({ where: { id } })
    if (contact) {
      await prisma.contact.delete({ where: { id } })
      return NextResponse.json({ success: true })
    }

    const quote = await prisma.quoteRequest.findUnique({ where: { id } })
    if (quote) {
      await prisma.quoteRequest.delete({ where: { id } })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  } catch (error) {
    console.error('Message delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
