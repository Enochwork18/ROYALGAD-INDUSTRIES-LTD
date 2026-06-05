import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'contact'
    const filter = searchParams.get('filter') || 'all'

    const where: Record<string, unknown> = {}
    if (filter === 'unread') where.read = false
    else if (filter === 'read') where.read = true

    if (type === 'partner') {
      const messages = await prisma.quoteRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(messages)
    }

    const messages = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
