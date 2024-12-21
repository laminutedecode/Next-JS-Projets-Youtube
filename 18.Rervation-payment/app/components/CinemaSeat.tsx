"use client"
import React, { useEffect, useState } from "react";
import { Seat } from "../types/types";

const CinemaSeatSelector: React.FC = () => {
  // Configuration de base de notre salle de cinéma
  const rows = 5; // Définit le nombre de rangées dans la salle
  const columns = 10; // Définit le nombre de sièges par rangée
  const seatPrice = 5; // Prix unitaire d'un siège en euros

  // États (variables qui peuvent changer) du composant
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Stocke les sièges sélectionnés par l'utilisateur
  const [reservedSeats, setReservedSeats] = useState<number[]>([]); // Stocke les sièges déjà réservés

  // useEffect s'exécute au chargement du composant
  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        // Appel à notre API pour récupérer les sièges déjà réservés
        const response = await fetch('/api/seats');
        const data = await response.json();
        setReservedSeats(data.reservedSeats);
      } catch (error) {
        console.error("Erreur lors de la récupération des places réservées:", error);
      }
    };

    fetchReservedSeats();
  }, []); // [] signifie que useEffect ne s'exécute qu'une fois au chargement

  // Création du tableau de sièges
  const seats: Seat[] = Array.from({ length: rows * columns }, (_, i) => ({
    id: i, // Identifiant unique du siège
    row: Math.floor(i / columns) + 1, // Calcul du numéro de rangée
    column: (i % columns) + 1, // Calcul du numéro de colonne
    reserved: reservedSeats.includes(i), // Vérifie si le siège est déjà réservé
  }));

  // Fonction appelée quand un utilisateur clique sur un siège
  const toggleSeatSelection = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) 
        ? prev.filter((seatId) => seatId !== id) // Désélectionne le siège s'il était sélectionné
        : [...prev, id] // Ajoute le siège aux sélections s'il ne l'était pas
    );
  };

  // Fonction pour gérer le paiement
  const handleCheckout = async () => {
    const totalPrice = selectedSeats.length * seatPrice; // Calcul du prix total
  
    // Appel à notre API de paiement
    const response = await fetch("/api/payement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seats: selectedSeats,
        userEmail: "test@example.com",
        price: totalPrice,
        title: "Billeterie",
      }),
    });
  
    const { url, error } = await response.json();
    if (error) {
      console.error("Payment error:", error);
    } else if (url) {
      window.location.href = url; // Redirection vers la page de paiement Stripe
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
