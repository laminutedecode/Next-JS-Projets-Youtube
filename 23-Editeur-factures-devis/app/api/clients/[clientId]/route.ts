import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../db/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const { clientId } = await params;

  try {
    const client = await prisma.client.findFirst({
      where: { id: clientId }
    });

    if (!client) {
      return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });
    }

    // Supprimer d'abord les devis et factures liés
    await prisma.quoteItem.deleteMany({
      where: { quote: { clientId } }
    });
    await prisma.quote.deleteMany({
      where: { clientId }
    });

    await prisma.invoiceItem.deleteMany({
      where: { invoice: { clientId } }
    });
    await prisma.invoice.deleteMany({
      where: { clientId }
    });

    // Puis supprimer le client
    await prisma.client.delete({
      where: { id: clientId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression client:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const { clientId } = await params;
  
  try {
    const data = await request.json();

    const client = await prisma.client.findFirst({
      where: { id: clientId }
    });

    if (!client) {
      return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });
    }

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: data,
      include: {
        company: true
      }
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error('Erreur modification client:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 