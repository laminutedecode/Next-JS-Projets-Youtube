import { NextResponse } from 'next/server';
import prisma from "@/utils/db";

export async function POST(request: Request) {
  const { id, name, quantity, price } = await request.json();

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        quantity,
        price,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du produit' }, { status: 500 });
  }
}
