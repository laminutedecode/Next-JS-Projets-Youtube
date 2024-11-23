"use client"

import { useState } from "react";
import { User, Menu, X, Bolt } from 'lucide-react';
import Link from "next/link";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "La villa", href: "/" },
    { label: "Offres", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <nav className="bg-gray-800 bg-opacity-75 fixed top-0 left-0 w-full z-10 flex items-center justify-between p-4">
      <div className="w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white">
              <Bolt />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 text-white">
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.href} className="hover:text-yellow-500">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="signInAndUp" className="text-white hover:text-yellow-500">
              <User size={20} />    
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-yellow-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none  z-[50]"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden absolute right-0 top-0 w-[300px] p-2 h-screen bg-gray-900 text-white " id="mobile-menu">
          <div className="flex flex-col space-y-4 px-2 pt-20">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href} className="hover:text-yellow-500">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
