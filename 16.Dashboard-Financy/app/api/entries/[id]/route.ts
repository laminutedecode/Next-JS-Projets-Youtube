import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    const {id} = await params;

    await prisma.entry.delete({
      where: {id}
    })

    return NextResponse.json({message: "Suppression effectuée"}, {status: 200});

  }catch(error){
    console.error("Erreur de suppression:", error);
    return NextResponse.json({error: "Erreur lors de la suppression"}, {status: 500});
  }
}