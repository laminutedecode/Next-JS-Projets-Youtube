export type Seat = {
  id: number;
  row: number;
  column: number;
  reserved: boolean;
};

export interface ReservationData {
  title: string; // Nom de la réservation (par ex. "Réservation de cinéma")
  price: number; // Prix total
  seats: string[]; // Liste des sièges sélectionnés
  userEmail: string; // Email de l'utilisateur
}
