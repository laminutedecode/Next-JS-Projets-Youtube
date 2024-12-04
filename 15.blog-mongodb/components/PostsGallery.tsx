"use client"

import {useState, useEffect} from "react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SendHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BlogPostInterface } from "@/types/types"

export default function PostsGallery() {


  const router = useRouter()
  const [posts, setPosts] = useState<BlogPostInterface[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=> {
    const fetchPosts = async ()=> {
      try {
        const response = await fetch('/api/blog')
        if(!response.ok){
          throw new Error("An error occurred")
        }

        const data = await response.json()
        setPosts(data.posts)

      }catch(err){
        setError(err instanceof Error ? err.message : "An error occurred")
      }finally {
        setLoading(false)
      }
    }
    fetchPosts()

  }, [])


  const filteredPost = selectedCategory === "All" ? posts : posts.filter((post)=> post.category === selectedCategory)


  const handleDelete = async (id: string)=> {
    if(!confirm("Are you sure you want to delete this post?")){
      return
    }
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE"
      })
      if(!response.ok){
        throw new Error("An error occurred")
      } 
      const updatedPosts = posts.filter((post)=> post.id !== id)
      setPosts(updatedPosts)
      router.refresh()

    }catch(err){
      console.error(err)
    }
  }

  if(loading) return <div>Loading...</div>
  if(error) return <div>{error}</div>

  return (
    <section className="container mx-auto py-[50px] px-6">

      <div className="flex justify-center space-x-4 mb-6">
        <Button className={`px-4 py-2 rounded-lg font-medium ${selectedCategory === "All" ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-100 shadow-none text-gray-500 hover:text-white hover:bg-blue-500"}`}
         onClick={()=> setSelectedCategory("All")}
        >
          All
        </Button>
        {Array.from(new Set(posts.map((post) => post.category))).map((category)=> (
          <Button key={category}
          className={`px-4 py-2 rounded-lg font-medium ${selectedCategory === category ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-100 shadow-none text-gray-500 hover:text-white hover:bg-blue-500"}`}
          onClick={()=> setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPost.map((post)=> (
          <Card key={post.id} className="hover:shadow-lg">
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            )}
            <CardHeader>
              <div className="text-sm text-blue-500 my-2">
                {post.category}
              </div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter className="border-t justify-between pt-4">
              <div className="flex gap-2">
                <Link href={`/blog/edit/${post.id}`}>
                  <Button size="sm" className="bg-yellow-500 hover:bg-yellow-400">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="sm" className="bg-red-500 hover:bg-red-400" onClick={()=> handleDelete(post.id)}>
                  <Trash2  className="w-4 h-4"  />
                </Button>
              </div>
              <Link href={`/blog/${post.id}`}>
                <Button className="bg-blue-500 hover:bg-blue-400">
                  <SendHorizontal className="w-4 h-4" />
                </Button>
              </Link>

            </CardFooter>
          </Card>
        ))}
      </div>

    </section>
  )
}
