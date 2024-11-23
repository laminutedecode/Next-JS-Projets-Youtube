"use client"
import { IoSend } from "react-icons/io5";
import { useState, ChangeEvent,FormEvent  } from "react";
import useClientAuth from '@/app/hooks/useClientAuth';
import { db } from '@/app/db/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';



export default function SendMessage() {

  const [value, setValue] = useState("")
  const { user } = useClientAuth(); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
    const val = e.target.value;
    setValue(val)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(value);

    try {
      if (user) {
        const {uid, displayName, photoURL} = user;
        await addDoc(collection(db, "conversations"),{
          text: value,
          id: uid,
          name: displayName,
          avatar: photoURL,
          createAt: serverTimestamp()
        });
      } 
    }catch(error){
      console.error(error)
    }
    setValue("")
  };
  
 

  return (
    <form onSubmit={handleSubmit} className="bg-blue-200 fixed bottom-0 w-full py-10 flex items-center justify-center px-3 flex-col">
        
       <div className="w-full flex items-center justify-center px-3">
        <input value={value} onChange={handleChange} placeholder="Votre message..." type="text" className="p-3 w-full outline-none border-none rounded-l-md"/>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 flex items-center gap-2 border-none rounded-r-md">
          <IoSend/>
          <span>Envoyer</span>
        </button>
       </div>
    </form>
  )
}
