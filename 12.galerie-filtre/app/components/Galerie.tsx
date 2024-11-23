"use client";

import { useState } from "react";
import { productsData } from "../datas/productsData";

export default function Galerie() {
  const [activeFilter, setActiveFilter] = useState<string>("tous");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">

      <h1 className="text-6xl font-black text-center text-white mb-8">FILTER<span className="text-pink-500">GALERY</span></h1>
      {/* Filter Section */}
      <div className="mb-12">
        <div className=" flex justify-center  max-w-[365px] mx-auto border-b border-pink-500  ">
          {["tous", "jeans", "tshirt", "chaussures"].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-2 font-medium text-sm ${
                activeFilter === filter
                  ? "text-white  bg-pink-500"
                  : "text-white hover:text-pink-500"
              } transition-all`} 
              onClick={() => handleFilterChange(filter)}
            >
              {filter === "tous" ? "Tous" : filter.charAt(0).toUpperCase() + filter.slice(1)}

            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {productsData
          .filter(
            (product) => activeFilter === "tous" || product.category === activeFilter
          )
          .map((product, index) => (
            <div
              key={index}
              className="card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
              data-name={product.category}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="card-content p-6">
                <h6 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h6>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <button className="text-pink-500 hover:text-pink-600 font-medium">
                  Voir plus
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
