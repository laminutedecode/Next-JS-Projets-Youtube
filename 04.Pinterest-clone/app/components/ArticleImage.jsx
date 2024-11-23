import Image from 'next/image'
import React from 'react'

function ArticleImage({articleDetails}) {

  return (
    <div>
      {articleDetails && 
        <Image src={articleDetails?.image}
        alt={articleDetails?.title}
        width={1000}
        height={1000}
        className='rounded-2xl'
      />}
    </div>
  )
}

export default ArticleImage;
