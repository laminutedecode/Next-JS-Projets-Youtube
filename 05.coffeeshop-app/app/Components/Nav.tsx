"use client"

import { GiCoffeeBeans } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import CartModal from "./CartModal";
import { useProductsContext } from '../Context/CartContext';




export default function Nav() {


  const [cartModalOpen, setCartModalOpen] = useState(false);
  
  const handleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };
  
  const { products} = useProductsContext();
  const totalProductCount = products.reduce((totalCount, product) => totalCount + product.quantityProduct, 0);



  return (
    <nav className="fixed top-0 left-0 z-[100] w-full h-[50px] shadow-md bg-gray-900 flex justify-between items-center p-5 text-white">
      <Link href="/">
        <GiCoffeeBeans />
      </Link>
      
        <div className="flex items-center gap-2">

         <button
          onClick={handleCartModal}
          className="p-2 flex items-center justify-center rounded-full w-8 h-8 hover:bg-gray-400 hover:text-white cursor-pointer relative"
            >
            <span className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-[11px] flex items-center justify-center h-4 w-4">
              {totalProductCount}
            </span>
            <FaCartShopping />
          </button>

          
        </div>

      <CartModal cartModalOpen={cartModalOpen} handleCartModal={handleCartModal}  />
    </nav>
  );
}
