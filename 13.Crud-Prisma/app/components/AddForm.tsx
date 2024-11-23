"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
// Le hook useMutation de TanStack Query (anciennement React Query) est utilisé pour gérer des opérations de mutation de données, c'est-à-dire des actions qui modifient les données sur le serveur, comme les créations, mises à jour, ou suppressions. 
import { useFormStatus } from "react-dom";

export default function AddForm() {

  const { pending } = useFormStatus(); // Récupération de l'état de soumission du formulaire (en attente ou non)
  const queryClient = useQueryClient(); // Création d'une instance de QueryClient pour gérer le cache des requêtes

  // Définition de la mutation pour ajouter un produit
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => { // Fonction de mutation qui prend en entrée les données du formulaire
      // Création d'un objet productData à partir des données du formulaire
      const productData = {
        name: formData.get('name'), // Récupération du nom du produit
        quantity: Number(formData.get('quantity')), // Récupération de la quantité et conversion en nombre
        price: Number(formData.get('price')), // Récupération du prix et conversion en nombre
      };

      // Envoi d'une requête POST à l'API pour créer un nouveau produit
      const response = await fetch('/api/addProducts', {
        method: 'POST', // Méthode HTTP utilisée
        headers: {
          'Content-Type': 'application/json', // Définition du type de contenu
        },
        body: JSON.stringify(productData), // Envoi des données du produit sous forme de JSON
      });

      // Vérification si la réponse est correcte
      if (!response.ok) {
        throw new Error('Erreur lors de la création du produit'); // Lancer une erreur si la réponse est incorrecte
      }

      return response.json(); // Retourner les données de la réponse au format JSON
    },
    onSuccess: () => { // Fonction appelée en cas de succès de la mutation
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidation du cache pour la clé 'products' afin de forcer la récupération des données mises à jour
      console.log("Produit créé avec succès !"); // Message de succès dans la console
  
    },
    onError: (error) => { // Fonction appelée en cas d'erreur de la mutation
      console.error("Erreur lors de la création du produit:", error); // Affichage de l'erreur dans la console
    },
  });

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page par défaut
    const formData = new FormData(event.currentTarget); // Récupération des données du formulaire
    mutation.mutate(formData); // Appel de la mutation avec les données du formulaire
  };

  // Composant de bouton de soumission
  const BtnSubmit = () => {
    return (
      <button
        disabled={mutation.isPending || pending} // Désactivation du bouton si la mutation est en attente ou si le formulaire est en cours de soumission
        type="submit" // Type de bouton défini sur "submit"
        className="mx-2 text-white bg-gray-500 hover:bg-gray-700 p-3 border" // Classes de style pour le bouton
      >
        {mutation.isPending || pending ? "Création en cours..." : "Ajouter Produit"} 
      </button>
    );
  };

  // Rendu du formulaire
  return (
    <form onSubmit={handleSubmit} className="max-w-[1000px] flex items-center mb-2"> 
      <input
        name="name" // Nom du champ
        required // Champ requis
        placeholder="Nom du produit" // Placeholder affiché dans le champ
        type="text" // Type de champ texte
        className="h-[50px] border border-gray-300 p-2" 
      />
      <input
        name="quantity" // Nom du champ
        required // Champ requis
        placeholder="Quantité" // Placeholder affiché dans le champ
        type="number" // Type de champ numérique
        className="h-[50px] border border-gray-300 p-2 ml-2" 
      />
      <input
        name="price" // Nom du champ
        required // Champ requis
        placeholder="Prix" // Placeholder affiché dans le champ
        type="number" // Type de champ numérique
        step="0.01" // Permet de saisir des valeurs décimales
        className="h-[50px] border border-gray-300 p-2 ml-2"
      />
      <BtnSubmit /> 
    </form>
  );
}
