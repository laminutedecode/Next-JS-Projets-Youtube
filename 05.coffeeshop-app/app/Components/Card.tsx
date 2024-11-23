import { ProductsTypes } from "../Types/productsType";
import { BiWorld, BiSolidCoffeeBean } from "react-icons/bi";
import { RiRedPacketFill } from "react-icons/ri";

import { useProductsContext } from '../Context/CartContext';
import {toast } from 'react-toastify';


interface CardProps {
  item: ProductsTypes;
}

export default function Card({ item  }: CardProps) {

  const { addToCart } = useProductsContext();

  const handleAddToCart = () => {
    addToCart(item); 
    toast.success(`x1 ${item.name} ajouté à votre panier`)
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative z-[50] flex flex-col justify-between  gap-2">
      <img src={item.image} alt={item.name} className="w-full object-cover mb-4 rounded-md" />
      <h2 className="text-[16] font-bold uppercase">{item.name}</h2>
      <p className="text-[12px] text-gray-900 flex items-center gap-2"><span className="font-bold flex items-center gap-1"><RiRedPacketFill/> Quantité:</span><span>Packet de {item.quantityPack}g</span></p>
      <p className="text-[12px] text-gray-900 flex items-center gap-2"><span className="font-bold flex items-center gap-1"><BiSolidCoffeeBean/> Puissance:</span><span>{item.strength}</span></p>
      <p className="text-[12px] text-gray-900 flex items-center gap-2"><span className="font-bold flex items-center gap-1"><BiWorld/> Origine:</span><span>{item.country}</span></p>

      <p className="text-[14px] text-gray-400 ">{item.desc}</p>
   
      <p className="bg-orange-400 text-white font-bold mt-2 absolute top-2 right-2 p-4 rounded-full">{item.price}€</p>

      <button onClick={handleAddToCart}  className="self-end bg-orange-400 hover:bg-orange-600 rounded-md text-white p-2	">Ajouter au panier</button>
    </div>
  );
}

