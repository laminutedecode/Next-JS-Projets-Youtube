import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/utils/db";
import { ReservationData } from "@/app/types/types";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

export const POST = async (request: NextRequest) => {
  try {
    const data: ReservationData = await request.json();
    console.log("Data received:", data);

    // Vérification des données
    if (!data.seats || data.seats.length === 0) {
      throw new Error("No seats selected.");
    }
    if (!data.userEmail || data.price == null || data.price < 0.5) {
      throw new Error("Invalid reservation data.");
    }

    // Création du client Stripe
    const customer = await stripe.customers.create({
      email: data.userEmail,
      name: "Cinema Customer",
    });
    console.log("Customer created:", customer.id);

    // Calcul du prix en centimes
    const amountInCents = Math.round(data.price * 100);

    // Création de la session Stripe Checkout
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
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
      metadata: {
        seats: JSON.stringify(data.seats),
        userEmail: data.userEmail,
      },
    });

    console.log("Checkout session created:", checkOutSession.url);

    // Sauvegarde de la réservation temporaire dans la BDD
    await prisma.reservation.create({
      data: {
        seats: JSON.stringify(data.seats),
        totalPrice: data.price,
        userEmail: data.userEmail,
        paymentId: checkOutSession.id,
      },
    });

   


    // Retourner l'URL de la session Checkout
    return NextResponse.json({ url: checkOutSession.url }, { status: 200 });
  } catch (error: any) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
