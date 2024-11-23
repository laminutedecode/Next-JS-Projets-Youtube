
"use client"
import Image from 'next/image'

import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from '@/app/db/firebaseConfig';
import { useEffect, useState } from 'react';
import ArticleList from '@/app/components/ArticleList';

export default function Home() {
  const db=getFirestore(app);
  const [listArticles,setListArticles]=useState([]);
  
  useEffect(() => {
    getAllPost();
  }, []);
  
  const getAllPost = async () => {
    try {
      const q = query(collection(db, 'post'));
      const querySnapshot = await getDocs(q);
      const updatedArticles = querySnapshot.docs.map(doc => doc.data());
      setListArticles(prevListArticles => [...prevListArticles, ...updatedArticles]);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  


  return (
    <>
    <div className='p-3'>
      <ArticleList listPosts={listArticles} />
      </div>
    </>
  )
}