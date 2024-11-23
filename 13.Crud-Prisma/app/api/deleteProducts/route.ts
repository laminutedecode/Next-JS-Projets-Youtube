import { NextResponse } from 'next/server';
import prisma from "@/utils/db";

export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Produit supprimé avec succès' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du produit' }, { status: 500 });
  }
}
