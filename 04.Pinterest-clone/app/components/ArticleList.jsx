import ArticleItem from '@/app/components/ArticleItem';
import { v4 as uuidv4 } from 'uuid';

function ArticleList({ listPosts }) {


  const uniqueList = listPosts.filter((post, index, self) =>
    index === self.findIndex((p) => (
      p.id === post.id 
    ))
  );

  console.log(uniqueList);
  
  return (
    <div className='mt-7 px-2 md:px-5 columns-2 md:columns-3 lg:columns-4 mb-4 xl:columns-4 space-y-6 mx-auto'>
      {uniqueList.map((item, index) => (
        <ArticleItem key={index}  item={item}/>
      ))}
    </div>
  );
}

export default ArticleList;
