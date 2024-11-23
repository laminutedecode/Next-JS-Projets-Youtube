import React from 'react';
import UserTag from '@/app/components/useTag';
import { TiWorld } from "react-icons/ti";


function ArticleInfo({ articleDetails }) {
  const user = {
    name: articleDetails?.userName, 
    email: articleDetails?.userEmail, 
    image: articleDetails?.userImage 
  };

  return (
    <div>
      <h2 className='text-[30px] font-bold mb-10'>{articleDetails?.title}</h2> 
      <UserTag user={user} />
 
      
      <h2 className='mt-10'>{articleDetails?.desc}</h2>
      <button
        className='p-2 bg-[#CB1F27] text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
        onClick={() => window.open(articleDetails?.link)}>
        <TiWorld />

      </button>
    </div>
  );
}

export default ArticleInfo;
