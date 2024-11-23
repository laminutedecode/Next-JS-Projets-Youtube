"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/utils/types"; 
import DeleteButton from "@/app/components/DeleteButton";
import UpdateButton from "@/app/components/UpdateButton";
import Link from "next/link";

const fetchProducts = async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des produits");
  }
  return response.json(); // Récupération des données
};

export default function ProductsTab() {
  const { data: products, error, isLoading } = useQuery<Product[], Error>({ // Utilisation du hook useQuery de TanStack Query
    queryKey: ["products"], // Clé pour identifier la requête (ici, 'products')
    queryFn: fetchProducts, // Fonction de récupération qui sera appelée pour obtenir les données
  });
  

  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement des produits...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur lors du chargement des produits: {error.message}</p>;
  }

  return (
    <>
      {products?.length &&
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-700">ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-700">Nom</th>
                <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-700">Quantité</th>
                <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-700">Prix</th>
                <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">{product.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{product.quantity}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{product.price.toFixed(2)}€</td>
                  <td className="border-b border-gray-300 px-4 py-2 flex items-center gap-2">
                    <Link href={`product/${product.id}`}>
                      <UpdateButton />
                    </Link>
                    <DeleteButton id={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  );
}
