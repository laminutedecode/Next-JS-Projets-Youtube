import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../db/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Générer le numéro de facture
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    
    const nextNumber = lastInvoice 
      ? String(Number(lastInvoice.number) + 1).padStart(3, '0')
      : '001';

    // Création de la facture
    const newInvoice = await prisma.invoice.create({
      data: {
        number: nextNumber,
        date: data.date,
        dueDate: data.dueDate,
        clientId: data.clientId,
        tva: data.tva,
        totalHT: data.totalHT,
        totalTTC: data.totalTTC,
        status: 'DRAFT',
        items: {
          create: data.items
        }
      },
      include: {
        client: true,
        items: true
      }
    });

    return NextResponse.json(newInvoice);
  } catch (error) {
    console.error('Erreur création facture:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: true,
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Erreur récupération factures:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 