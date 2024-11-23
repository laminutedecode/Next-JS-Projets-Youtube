"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Params {
  id: string;
}

interface UpdatePageProps {
  params: Params;
}

export default function UpdateProductPage({ params }: UpdatePageProps) {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/${params.id}`);
      if (!response.ok) {
        setError("Produit non trouvé");
        return;
      }
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [params.id]);

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col pt-10">
        <Link href='/' className="text-blue-600 hover:underline">Retour</Link>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return <div>Chargement...</div>;
  }

  const { id, name, quantity, price } = product;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/updateProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name: formData.get('name'),
        quantity: Number(formData.get('quantity')),
        price: Number(formData.get('price')),
      }),
    });
    
    if (response.ok) {
      router.push("/")
      console.log("Produit mis à jour avec succès !");
      // Vous pouvez rediriger vers la page des produits ou afficher un message de succès ici
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de la mise à jour du produit:", errorData.error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col pt-10 bg-gray-50">
      <Link href='/' className="text-blue-600 hover:underline mb-4">Retour</Link>
      <form 
        onSubmit={handleSubmit} 
        className="max-w-md w-full bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
      >
        <input type="hidden" name="id" value={id} />
        
        <input 
          name="name" 
          required 
          placeholder="Modifier le nom du produit" 
          defaultValue={name} 
          type="text" 
          className="h-12 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <input 
          name="quantity" 
          required 
          placeholder="Modifier la quantité" 
          defaultValue={quantity} 
          type="number" 
          className="h-12 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input 
          name="price" 
          required 
          placeholder="Modifier le prix" 
          defaultValue={price} 
          type="number" 
          step="0.01" 
          className="h-12 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button 
          type="submit" 
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Modifier
        </button>
      </form>
    </div>
  );
}
