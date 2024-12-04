import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const entry = await prisma.entry.create({
      data: {
        type: body.type,
        amount: parseFloat(body.amount),
        category: body.category,
        frequency: body.frequency,
      },
    })
    return NextResponse.json(entry)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'entrée' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des entrées' },
      { status: 500 }
    )
  }
} 