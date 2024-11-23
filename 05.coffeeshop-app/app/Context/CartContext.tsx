"use client"


import  { createContext, useContext, useState, ReactNode } from 'react';

import { ProductsTypes } from '../Types/productsType';

// Définition du type pour le contexte des produits
interface ProductsContextType {
  products: ProductsTypes[]; // Liste des produits
  addToCart: (product: ProductsTypes) => void; // Fonction pour ajouter un produit au panier
  decrementQuantity: (productId: string) => void; // Fonction pour diminuer la quantité d'un produit dans le panier
  incrementQuantity: (productId: string) => void; // Fonction pour augmenter la quantité d'un produit dans le panier
  removeFromCart: (productId: string) => void; // Fonction pour retirer un produit du panier
}

// Propriétés attendues pour le composant ProductsProvider
interface ProductsProviderProps {
  children: ReactNode; // Contenu de l'élément ProductsProvider
}

// Création du contexte pour les produits
const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Composant ProductsProvider qui fournit le contexte des produits à ses enfants
export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  // State pour stocker la liste des produits dans le panier
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product: ProductsTypes) => {
    const existingProductIndex = products.findIndex((p) => p.id === product.id);
    if (existingProductIndex !== -1) {
      // Le produit existe déjà dans le panier, nous mettons à jour sa quantité
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantityProduct += 1;
      setProducts(updatedProducts);
    } else {
      // Le produit n'existe pas dans le panier, nous l'ajoutons avec une quantité de 1
      setProducts([...products, { ...product, quantityProduct: 1 }]);
    }
  };

  // Fonction pour diminuer la quantité d'un produit dans le panier
  const decrementQuantity = (productId: string) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        // Si la quantité est supérieure à 1, nous la décrémentons
        if (product.quantityProduct > 1) {
          return { ...product, quantityProduct: product.quantityProduct - 1 };
        } else {
          // Sinon, nous le retirons complètement du panier
          return null;
        }
      }
      return product;
    }).filter(product => product !== null) as ProductsTypes[]; // Filtrer les produits nuls et caster le tableau
    setProducts(updatedProducts);
  };

  // Fonction pour augmenter la quantité d'un produit dans le panier
  const incrementQuantity = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, quantityProduct: product.quantityProduct + 1 } : product
      )
    );
  };

  // Fonction pour retirer un produit du panier
  const removeFromCart = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Rendu du contexte des produits pour les enfants
  return (
    <ProductsContext.Provider value={{ products, addToCart, removeFromCart, decrementQuantity, incrementQuantity }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte des produits
export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
