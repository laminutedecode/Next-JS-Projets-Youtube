import { ReservationData } from "@/app/types/types";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialisation de l'instance Stripe avec notre clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

// Fonction qui gère les requêtes POST pour le paiement
export const POST = async (request: NextRequest) => {
  try {
    // Récupération des données envoyées par le client
    const data: ReservationData = await request.json();
    console.log("Data received:", data);

    // Vérifications de sécurité
    if (!data.seats || data.seats.length === 0) {
      throw new Error("No seats selected.");
    }
    if (!data.userEmail || data.price == null || data.price < 0.5) {
      throw new Error("Invalid reservation data.");
    }

    // Création d'un client Stripe
    const customer = await stripe.customers.create({
      email: data.userEmail,
      name: "Cinema Customer",
    });

    // Conversion du prix en centimes (Stripe utilise les centimes)
    const amountInCents = Math.round(data.price * 100);

    // Création de la session de paiement Stripe
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Type de paiement accepté
      customer: customer.id,
      mode: "payment",
      // URLs de redirection après le paiement
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      // Détails du produit
      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: data.title || "Cinema Reservation",
            },
            currency: "EUR",
            unit_amount: amountInCents,
          },
        },
      ],
      // Métadonnées pour suivre la réservation
      metadata: {
        seats: JSON.stringify(data.seats),
        userEmail: data.userEmail,
      },
    });

    // Sauvegarde de la réservation dans la base de données
    await prisma.reservation.create({
      data: {
        seats: JSON.stringify(data.seats),
        totalPrice: data.price,
        userEmail: data.userEmail,
        paymentId: checkOutSession.id,
      },
    });

    // Retourne l'URL de paiement Stripe
    return NextResponse.json({ url: checkOutSession.url }, { status: 200 });
  } catch (error: any) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
