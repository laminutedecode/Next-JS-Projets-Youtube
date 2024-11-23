"use client"

import Car01 from "../../public/car-01.png"
import Car02 from "../../public/car-02.png"
import Car03 from "../../public/car-03.png"
import Car04 from "../../public/car-04.png"
import Image from "next/image"
import { useState } from 'react'


export default function CarOptions() {

  const [activeIndex,setActiveIndex]=useState<any>();

  const options = [
    {name: "Économique", image: Car01, prix: "21.50" },
    {name: "Confort", image: Car02, prix: "39.02" },
    {name: "Électrique", image: Car03, prix: "45.29" },
    {name: "Minivan", image: Car04, prix: "37.77" }
  ]

  
  return (

    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {options.map((item, index)=> (
          <div key={index} className={`border border-gray-200 p-2 rounded-md flex flex-col justify-center items-center gap-1 cursor-pointer hover:border-yellow-400
          hover:scale-110 transition-all ${activeIndex==index
            ?'border-yellow-400 border-[2px] ':null}`} onClick={()=>setActiveIndex(index)}>
            <Image width={80} src={item.image} alt="image" />
            <p className=" text-sm">{item.name}</p>
            <p className="text-sm font-bold">{item.prix}€</p>
          </div>
        ))}
    </div>
  )
}
