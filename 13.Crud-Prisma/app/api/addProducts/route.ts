import { NextResponse } from 'next/server';
import prisma from "@/utils/db";



export async function POST(request: Request) {
  const { name, quantity, price } = await request.json();

  try {
 
  

    const product = await prisma.product.create({
      data: {
        name,
        quantity,
        price,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
   
    return NextResponse.json({ error: 'Erreur lors de la création du produit' }, { status: 500 });
  }
}
