import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalProducts, todayOrders, activeOrders, unreadMessages, partnerRequests] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.order.count({ where: { status: { not: 'DELIVERED' } } }),
    prisma.contact.count({ where: { read: false } }),
    prisma.quoteRequest.count({ where: { read: false } }),
  ])

  return NextResponse.json({ totalProducts, todayOrders, activeOrders, unreadMessages, partnerRequests })
}
