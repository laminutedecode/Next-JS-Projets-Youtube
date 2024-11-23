"use client"

import Image from 'next/image'
import { useState } from 'react'


export default function OptionsBuy() {

  const [activeIndex,setActiveIndex]=useState<any>();

  const items = [
    {name:'Master Card',image:'/card.png'},
    {name:'Visa Card',image:'/visa.png'},
    {name:'Apple Pay',image:'/apple-pay.png'},
    {name:'Google Pay',image:'/google-pay.png'},
  ]
  return (
    <div>
    <h2 className='text-[14px] font-medium mt-4 mb-2'>Paiement</h2>
    <div className='flex items center gap-2 mt-2 pl-2'>
        {items.map((item,index)=>(
            <div key={index} className={`w-[50px] mb-1 border-[1px]
            flex items-center
             justify-center 
             rounded-md
             cursor-pointer
             hover:border-yellow-400
             hover:scale-110 transition-all
             ${activeIndex==index
                ?'border-yellow-400 border-[2px]':null}`}
             onClick={()=>setActiveIndex(index)}>
                <Image src={item.image}
                alt={item.name}
                width={30}
                height={50}
                />
            </div>
        ))}
    </div>
</div>
  )
}
