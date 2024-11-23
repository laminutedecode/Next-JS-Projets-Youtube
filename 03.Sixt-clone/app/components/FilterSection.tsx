import { useState, useEffect } from "react";

export default function FilterSection({carFilter, setBrand, orderPrice}:any) {


  const [brandList, setBrandList] = useState<any>([])

  const BrandSet = new Set();

  useEffect(()=> {
    if(carFilter){

      handleFilter()
    }
  }, [carFilter])


  const handleFilter = ()=>{
    carFilter.forEach((element: any) => {
      BrandSet.add(element.marque)
    });
    console.log(brandList)
    setBrandList(Array.from(BrandSet));
  }


  return (
    <div className="flex justify-end gap-3 p-3">

      <select onChange={(e)=> orderPrice(e.target.value) } className="select select-bordered w-full max-w-xs">
        <option disabled selected>Trier par prix</option>
        <option value={-1}>Par prix croissant</option>
        <option value={1}>Par prix décroissant</option>
      </select>

      <select onChange={(e)=> setBrand(e.target.value) } className="select select-bordered w-full max-w-xs">
        <option disabled selected>Trier par marque</option>
        {brandList.map((item: string, index: number)=> (
          <option key={index}>{item}</option>
        ))}
      </select>

    </div>
  )
}
