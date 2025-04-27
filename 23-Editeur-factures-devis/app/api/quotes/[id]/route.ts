import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../db/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Supprimer d'abord les items du devis
    await prisma.quoteItem.deleteMany({
      where: { quoteId: id }
    });

    // Puis supprimer le devis
    await prisma.quote.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression devis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  
  try {
    const data = await request.json();

    // Supprimer les items existants
    await prisma.quoteItem.deleteMany({
      where: { quoteId: id }
    });

    // Mettre à jour le devis avec les nouveaux items
    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: {
        date: data.date,
        validUntil: data.validUntil,
        clientId: data.clientId,
        tva: data.tva,
        totalHT: data.totalHT,
        totalTTC: data.totalTTC,
        items: {
          create: data.items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total
          }))
        }
      },
      include: {
        client: true,
        items: true
      }
    });

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error('Erreur modification devis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 