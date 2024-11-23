"use client"

import React, { useEffect, useState } from 'react'
import ArticleImage from '../../components/ArticleImage'
import ArticleInfo from '../../components/ArticleInfo'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/db/firebaseConfig'
v

function ArticlesDetails({ params }) {


  
  const router = useRouter();
  const db = getFirestore(app);
  const [articleDetails, setArticleDetails] = useState(null); // Change initial state to null
  
  useEffect(() => {
    getPostDetails();
  }, []);
  
  const getPostDetails = async () => {
    try {
      const docRef = doc(db, 'post', params.articleId); 
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticleDetails(docSnap.data())
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }
  console.log(params);
  console.log(articleDetails);

  return (
    <>
      {articleDetails &&
        <div className='bg-[#e9e9e9] min-h-screen  p-3 md:p-12 md:px-24 lg:px-36'>
          <HiArrowSmallLeft className='text-[50px] 
          cursor-pointer rounded-full p-2 bg-[#CB1F27] text-white hover:scale-105 transition-all mb-5'
            onClick={() => router.back()} />
          <div className='bg-white grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
          rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 '
          >
            <ArticleImage articleDetails={articleDetails} />
            <div className="">
              <ArticleInfo articleDetails={articleDetails} />
            </div>
          </div>
        </div>}
    </>
  )
}

export default ArticlesDetails;
