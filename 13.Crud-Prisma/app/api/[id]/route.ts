import { NextResponse } from 'next/server';
import prisma from "@/utils/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération du produit' }, { status: 500 });
  }
}
