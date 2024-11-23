"use client"

import Form from '../components/Form';

export default function Create() {


  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <div className='p-6 mt-8 lg:w-[35%] md:w-[50%]'>
        <h2 className='text-[30px] 
        font-extrabold text-[#ff6030]'>Ajouter un post</h2>
        <Form/>
    </div>
    </div>
  )
}
