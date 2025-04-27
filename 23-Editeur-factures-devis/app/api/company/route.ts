import {  NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../db/db';

export async function GET() {
  try {
    const company = await prisma.company.findFirst();
    if (!company) {
      return NextResponse.json(null);
    }
    return NextResponse.json(company);
  } catch (error) {
    console.error('Erreur récupération société:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Données reçues:', data);
    
    // Récupérer la société par défaut ou en créer une nouvelle
    const company = await prisma.company.findFirst();

    if (company) {
      // Mise à jour
      const updatedCompany = await prisma.company.update({
        where: { id: company.id },
        data: {
          name: data.name,
          address: data.address,
          postalCode: data.postalCode,
          country: data.country,
          siret: data.siret,
          iban: data.iban,
          phone: data.phone,
        },
      });
      return NextResponse.json(updatedCompany);
    } else {
      // Création
      const newCompany = await prisma.company.create({
        data: data,
      });
      return NextResponse.json(newCompany);
    }
  } catch (error) {
    console.error('Erreur société:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 