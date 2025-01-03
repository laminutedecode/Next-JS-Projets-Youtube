import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const books = await prisma.book.findMany()
    return NextResponse.json(books)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors du chargement des livres' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        reference: data.reference,
        price: data.price,
        stock: data.stock,
      },
    })
    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'ajout du livre' }, { status: 500 })
  }
} 