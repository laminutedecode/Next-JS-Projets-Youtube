import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../db/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Récupérer la société par défaut
    const company = await prisma.company.findFirst();
    if (!company) {
      return NextResponse.json({ error: 'Aucune société trouvée' }, { status: 404 });
    }

    // Si on a un ID, c'est une mise à jour
    if (data.id) {
      const updatedClient = await prisma.client.update({
        where: { id: data.id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          companyId: company.id
        },
        include: {
          company: true
        }
      });
      return NextResponse.json(updatedClient);
    }

    // Sinon c'est une création
    const newClient = await prisma.client.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        companyId: company.id
      },
      include: {
        company: true
      }
    });

    return NextResponse.json(newClient);
  } catch (error) {
    console.error('Erreur client:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Récupérer la société par défaut
    const company = await prisma.company.findFirst();
    if (!company) {
      return NextResponse.json({ error: 'Aucune société trouvée' }, { status: 404 });
    }

    // Récupérer tous les clients de la société par défaut
    const clients = await prisma.client.findMany({
      where: {
        companyId: company.id
      },
      include: {
        company: true,
        invoices: {
          include: {
            items: true
          }
        },
        quotes: {
          include: {
            items: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Erreur récupération clients:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 