import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../db/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Générer le numéro de devis
    const lastQuote = await prisma.quote.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    
    const nextNumber = lastQuote 
      ? String(Number(lastQuote.number) + 1).padStart(3, '0')
      : '001';

    // Création du devis
    const newQuote = await prisma.quote.create({
      data: {
        number: nextNumber,
        date: data.date,
        validUntil: data.validUntil,
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

    return NextResponse.json(newQuote);
  } catch (error) {
    console.error('Erreur création devis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        client: true,
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Erreur récupération devis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 