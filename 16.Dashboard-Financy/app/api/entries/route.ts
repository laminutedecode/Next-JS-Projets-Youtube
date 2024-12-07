import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const entry = await prisma.entry.create({
      data: {
        type: body.type,
        amount: parseFloat(body.amount),
        category: body.category,
        frequency: body.frequency,
      }
    })

    return NextResponse.json(entry, { status: 201 });
    
  }catch(error){
    return NextResponse.json({ error: "Erreur lors de la création " }, { status: 500 });
  }
}

export async function GET(){
  try {
    const entries = await prisma.entry.findMany({
      orderBy: {createdAt: 'desc'},
    })

    return NextResponse.json(entries, { status: 200 });

  }catch(error){
    return NextResponse.json({ error: "Erreur lors de la récupération " }, { status: 500 });
  }
}