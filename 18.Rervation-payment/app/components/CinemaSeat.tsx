"use client"
import React, { useState, useEffect } from "react";
import { Seat } from "../types/types";

const CinemaSeatSelector: React.FC = () => {
  const rows = 5; // Nombre de rangées
  const columns = 10; // Nombre de colonnes
  const seatPrice = 5; // Prix par place

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);

  // Récupérer les places réservées au chargement du composant
  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const response = await fetch('/api/seats');
        const data = await response.json();
        setReservedSeats(data.reservedSeats);
      } catch (error) {
        console.error("Erreur lors de la récupération des places réservées:", error);
      }
    };

    fetchReservedSeats();
  }, []);

  // Générer des places
  const seats: Seat[] = Array.from({ length: rows * columns }, (_, i) => ({
    id: i,
    row: Math.floor(i / columns) + 1,
    column: (i % columns) + 1,
    reserved: reservedSeats.includes(i),
  }));

  // Gérer la sélection de place
  const toggleSeatSelection = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const handleCheckout = async () => {
    const totalPrice = selectedSeats.length * seatPrice; // Calcul du prix total
  
    const response = await fetch("/api/payement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seats: selectedSeats,
        userEmail: "test@example.com",
        price: totalPrice, // Ajouter le prix total
        title: "Billeterie ", // Titre pour Stripe
      }),
    });
  
    const { url, error } = await response.json();
    if (error) {
      console.error("Payment error:", error);
    } else if (url) {
      window.location.href = url; // Redirection vers Stripe Checkout
    }
  };
  

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Scene */}
      <div className="w-full bg-gray-800 text-white text-center py-2 rounded-lg">
        Scene
      </div>

      {/* Grille des places */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer
            ${seat.reserved ? "bg-red-500 cursor-not-allowed" : selectedSeats.includes(seat.id) ? "bg-green-500" : "bg-gray-200"}
            `}
            onClick={() => !seat.reserved && toggleSeatSelection(seat.id)}
          >
            {seat.row}-{seat.column}
          </div>
        ))}
      </div>

      {/* Résumé */}
      <div className="text-center space-y-2">
        <p>Places sélectionnées : {selectedSeats.length}</p>
        <p>Prix total : {selectedSeats.length * seatPrice}€</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleCheckout}
          disabled={selectedSeats.length === 0}
        >
          Payer avec Stripe
        </button>

      </div>
    </div>
  );
};

export default CinemaSeatSelector;
