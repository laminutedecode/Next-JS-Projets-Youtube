import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params
    await prisma.entry.delete({
      where: { id:id },
    })
    return NextResponse.json({ message: 'Entrée supprimée avec succès' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'entrée' },
      { status: 500 }
    )
  }
} 