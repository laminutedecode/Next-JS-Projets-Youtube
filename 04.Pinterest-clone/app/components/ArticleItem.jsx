import Image from 'next/image';
import React from 'react';
import UserTag from '@/app/components/useTag';
import { useRouter } from 'next/navigation';

function ArticleItem({ item }) {
  const router = useRouter();
  const user = {
    name: item?.userName,
    image: item?.userImage,
  };

  console.log(item);

  return (
    <div className=''>
      <div
        className='relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 hover:before:bg-gray-600 before:opacity-50 cursor-pointer'
        onClick={() => router.push("/articles/" + item.id)}>
        {item?.image && (
          <Image
            src={item?.image}
            alt="image"
            width={500}
            height={500}
            className='rounded-3xl cursor-pointer relative z-0'
          />
        )}
      </div>
      <h2 className='font-bold text-[18px] mb-1 mt-2 line-clamp-2'>{item?.title}</h2>
      <UserTag user={user} />
    </div>
  );
}

export default ArticleItem;
