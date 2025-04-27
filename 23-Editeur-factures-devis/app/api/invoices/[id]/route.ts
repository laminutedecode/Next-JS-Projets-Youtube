import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../db/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Supprimer d'abord les items de la facture
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: id }
    });

    // Puis supprimer la facture
    await prisma.invoice.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression facture:', error);
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
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: id }
    });

    // Mettre à jour la facture avec les nouveaux items
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: {
        date: data.date,
        dueDate: data.dueDate,
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

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error('Erreur modification facture:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 