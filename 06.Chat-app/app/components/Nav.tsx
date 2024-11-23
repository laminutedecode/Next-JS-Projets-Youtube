"use client"

import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useClientAuth from '@/app/hooks/useClientAuth';

export default function Nav() {

  const {user,loginWithGoogle,redirectIfAuthenticated } = useClientAuth(); 
  const router = useRouter()

  const goToDashboard = ()=> {
    if(!user){
      loginWithGoogle()
    }else {
      redirectIfAuthenticated()
    }
  }

  return (
    <nav className='h-[70px] w-full flex justify-between items-center bg-blue-600 p-3'>
  
   
    <Link href='/'>
      <li className="text-white flex items-center gap-2 p-2 rounded-full hover:text-blue-600 hover:bg-white transition-all">
      <FaHome/>
      <span>Home</span>
    </li>
    </Link>
        

      <button onClick={goToDashboard} className="text-white hover:bg-white hover:text-blue-600 p-3 rounded-full transition-all">
        <FaUser/>
      </button>

    </nav>
  )
}
