import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    
    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut premium:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 