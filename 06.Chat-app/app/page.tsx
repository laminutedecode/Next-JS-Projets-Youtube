"use client"

import { FcGoogle } from "react-icons/fc";
import useClientAuth from '@/app/hooks/useClientAuth';

export default function Home() {

  const {loginWithGoogle } = useClientAuth(); 

  return (
   <div className="w-full h-screen flex items-center justify-center p-3">
     <div className="max-w-[1000px] m-auto flex items-center justify-center flex-col gap-5 text-center">
     <h1 className="text-6xl uppercase font-black">CHAT<span className="text-blue-600">APP</span> </h1>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At est, molestias, incidunt beatae recusandae, ex tempora laudantium dolores veniam numquam itaque accusantium nemo atque quaerat. Quas nostrum quibusdam omnis ipsa, sequi consectetur non doloribus repellendus.</p>
     <button onClick={loginWithGoogle} className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md p-2 flex items-center gap-2"><FcGoogle/><span>Se connecter avec Google</span></button>
     </div>
   </div>
  );
}
