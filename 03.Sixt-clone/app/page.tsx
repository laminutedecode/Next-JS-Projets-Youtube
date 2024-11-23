"use client"


import HeaderSection from "./components/HeaderSection";
import DevisesSection from "./components/DevisesSection"
import SloganSection from "./components/SloganSection"
import FilterSection from "./components/FilterSection";
import GalerieSection from "./components/GalerieSection"
import Footer from "./components/Footer"
import { getCarList } from "@/services";
import {useState, useEffect} from "react"

export default function Home() {

  const [carList, setCarList] = useState<any>([])
  const [carFilter, setCarFilter] = useState<any>([])


  useEffect(()=> {
    getCars()
  }, [])


  const getCars = async()=> {
    const result: any = await getCarList();
    setCarList(result.carLists)
    setCarFilter(result.carLists)
  }


  const filterCarList = (brand: string)=> {
      const filterList = carFilter.filter((item: any) => item.marque ==brand)
      setCarList(filterList)

      console.log(filterList);
  }
  const filterPrice = (order: any)=> {
      const data = [...carFilter].sort((a, b)=> order ==-1 ? a.price - b.price : b.price - a.price);
      setCarList(data)
      
  }

  


  return (
    <>
      <SloganSection />
      <HeaderSection />
      <DevisesSection />
      <FilterSection carFilter={carFilter} setBrand={(value:string)=>filterCarList(value)}
       orderPrice={(value:string)=>filterPrice(value)}/>
      <GalerieSection carList={carList} />
      <Footer />

    </>
  );
}
