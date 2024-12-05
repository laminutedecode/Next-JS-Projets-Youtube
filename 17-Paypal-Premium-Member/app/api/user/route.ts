import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {


    const { id, email } = await req.json();

    const user = await prisma.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        email,
        isPremium: false,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 