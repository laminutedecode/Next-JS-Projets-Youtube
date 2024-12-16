import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET() {
  try {
    // Récupérer toutes les réservations confirmées
    const reservations = await prisma.reservation.findMany({
      where: {
        // Vous pouvez ajouter des conditions supplémentaires ici
        // par exemple, status: 'confirmed' si vous avez un champ status
      },
    });

    // Extraire et combiner tous les sièges réservés
    const reservedSeats = reservations.reduce((acc: number[], reservation) => {
      const seats = JSON.parse(reservation.seats as string);
      return [...acc, ...seats];
    }, []);

    return NextResponse.json({ reservedSeats }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des places réservées:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
} 