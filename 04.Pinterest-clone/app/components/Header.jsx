"use client";

import { IoMdSearch, IoIosArrowDown } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle, FaPlus  } from "react-icons/fa";
import Logo from "../../public/logo-pinterest.svg";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import {doc, getFirestore, setDoc} from "firebase/firestore"
import app from '../db/firebaseConfig'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {


  const { data: session } = useSession();

  const router = useRouter()

  const db = getFirestore(app);

  useEffect(()=> {
    saveUserInfo();
    
  }, [session])

  
  const saveUserInfo = async () => {
    if (session && session.user && session.user.email) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        userEmail: session.user.email,
        userImage: session.user.image,
      });
    }
  }

  // console.log(session);


  const onCreateClick=()=>{
    if(session)
    {
      router.push('/articlebuilder')
    }
    else{
      signIn()
    }
  }

  return (
    <div className="flex items-center p-5 gap-4">
      <button   onClick={()=> router.push(`/`)}  className="flex items-center gap-2">
        <Image
          className="w-10 h-10 p-1 rounded-full hover:bg-[#f1f1f1] hover:shadow-md"
          src={Logo}
          alt="Logo Pinterest"
        />
        <span className="text-[#CB1F27] font-bold md:text-xl ">Pinterest</span>
      </button>

      <button className=" bg-gray-200 font-semibold hover:bg-gray-300 transition-all text-black p-3 rounded-full flex items-center gap-2">
        <span>Explorer</span>
        <span>
          <IoIosArrowDown />
        </span>
      </button>

      <div className="flex items-center gap-4 flex-grow">
        <div className="md:hover:bg-gray-200 transition-all rounded-full p-3 flex items-center gap-3 w-full  ">
          <IoMdSearch className="text-3xl text-gray-500 cursor-pointer" />
          <input
            placeholder="Rechercher des idées pour des dîners faciles, sur la mode etc..."
            type="text"
            className="hidden md:flex w-full border-none outline-none bg-transparent "
          />
        </div>
        <button className="rounded-full bg-gray-200 p-3 font-semibold hover:bg-gray-300 transition-all">
          <IoMdNotifications />
        </button>
        {session?.user ? (
          <div className="flex items-center gap-3">
            <button
          onClick={()=> router.push(`/dashboard/${session.user.email}`)}
          className="rounded-full text-white">
            <Image
              width={40}
              height={40}
              src={session.user.image}
              alt="Image profil"
            />
          </button>
           <button className='bg-[#CB1F27] hover:bg-red-900 p-2 text-sm text-white
           rounded-full' 
           onClick={()=>onCreateClick()}><FaPlus  /></button>

          </div>

            
        ) : (
          <button
            onClick={() => signIn()}
            className="rounded-full bg-[#CB1F27] hover:bg-red-900 transition-all p-3 font-semibold text-white"
          >
            <FaUserCircle />
          </button>
        )}
      
      </div>
    </div>
  );
}
