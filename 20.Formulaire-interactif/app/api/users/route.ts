import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const user = await prisma.user.create({ 
      data: {
        ...data,
        technologies: JSON.stringify(data.technologies)
      }
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'utilisateur' }, { status: 500 })
  }
} 