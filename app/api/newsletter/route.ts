import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)
    console.log('Newsletter signup:', email)
    return NextResponse.json({ success: true, message: 'Thank you for subscribing!' })
  } catch {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
}
