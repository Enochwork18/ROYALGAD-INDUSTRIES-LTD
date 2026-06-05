import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const DEFAULT_SETTINGS = {
  siteName: 'RoyalGad Industries',
  siteDescription: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  socialLinks: { facebook: '', twitter: '', instagram: '', linkedin: '' },
  currency: 'NGN',
  taxRate: 0,
  shippingFee: 0,
  freeShippingThreshold: 0,
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const setting = await prisma.setting.findUnique({ where: { id: 'default' } })
    return NextResponse.json(setting?.data ? JSON.parse(setting.data) : DEFAULT_SETTINGS)
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const dataStr = JSON.stringify(body)
    const setting = await prisma.setting.upsert({
      where: { id: 'default' },
      update: { data: dataStr },
      create: { id: 'default', data: dataStr },
    })
    return NextResponse.json(JSON.parse(setting.data))
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
