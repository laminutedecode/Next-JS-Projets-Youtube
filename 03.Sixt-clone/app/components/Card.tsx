import Image from "next/image"
import {useState, useEffect} from 'react'
import { FaGasPump } from "react-icons/fa";
import { RiSteering2Fill } from "react-icons/ri";
import { FaCarSide} from "react-icons/fa6";
import { FaUser } from "react-icons/fa";


export default function Card(props:any) {

  const [car,setCar] = useState<any>()

  useEffect(()=> {
      if(props.car){
        setCar(props.car)
      }
  }, [props.car])

  return car &&(
    <div className="border-4 border-white hover:border-gray-500 rounded-xl p-1">

      <div className="relative bg-gradient-to-b from-[#1a1a1a] via-gray-500 to-[#1a1a1a]  border shadow-md gap-2 flex flex-col justify-between rounded-xl cursor-pointer text-[#fff]  hover:text-white p-5">

        <h2 className="font-bold text-[20px]">{car?.name}</h2>

        <p className="absolute top-0 right-2 flex items-center gap-1 my-3 bg-[#FF5F00] p-2 rounded-md font-bold text-[10px]"><RiSteering2Fill className="text-[20px]"/><span>{car?.typeBoite}</span></p>


        <div className="flex items-center gap-2">
          <p className="bg-gray-300 text-gray-700 p-2 rounded-md text-[12px] flex items-center gap-1"><FaUser className="text-[20px]"/><span>{car?.places}</span></p>
          <p className="bg-gray-300 text-gray-700 p-2 rounded-md text-[12px] flex items-center gap-1"><FaGasPump className="rounded-md text-[20px]"/><span>{car?.type}</span></p>
          <p className="bg-gray-300 text-gray-700 p-2 rounded-md text-[12px] flex items-center gap-1"><FaCarSide className="text-[20px]"/><span>{car?.marque}</span></p>
        </div>

        <Image src={car?.image?.url} alt={car?.name} width={260} height={150} className=" w-full object-cover self-center" />
        <p className="text-[12px]">✔️ incl. 500 km</p>

        <p><span className="text-[26px] font-bold">{car?.price}€ </span><span className="text-[12px]">/ par jour</span></p>

        
        </div>

    </div>
  )
}
