"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import {useState, useEffect} from "react"
import { BlogPostInterface } from '@/types/types'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function PageSinglePost({params} : {params: {id: string}}) {

  const [post, setPost] = useState<BlogPostInterface | null>(null)

  useEffect(()=> {
    const fetchPost = async()=> {
      try {
        const {id} = await params
        const response = await fetch(`/api/blog/${id}`)

        if(!response.ok){
          throw new Error("Article non trouvé")
        }

        const data = await response.json()
        setPost(data.post)

      }catch(error){
        console.error("Erreur lors de la récupération de l'article:", error)
      }
    }

    fetchPost()

  }, [])


  return (
    <section className='max-w-4xl mx-auto py-[50px] px-4'>

      <article>
        <div className="mb-8 flex justify-between items-start">
          <div>
          <Breadcrumbs/>
            <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>

            <div className="flex items-center gap-4 text-gray-600">
              <span>{post?.category}</span>
              <span>•</span>
              <time>{post?.createdAt && new Date(post.createdAt).toLocaleDateString()}</time>
            </div>
          </div>
          <Link href={`/blog/edit/${post?.id}`}>
            <Button className='bg-blue-500 hover:bg-blue-400'>
              <Pencil className='w-4 h-4 mr-2'/>
              Updated post
            </Button>
          </Link>
        </div>
        {post?.imageUrl && (
          <div className="w-full mb-8 overflow-hidden h-[400px]">
            <img src={post?.imageUrl} alt={post?.title} className='w-full h-full object-cover rounded-lg' />
          </div>
        )}
        <p className="text-lg 0text-gray-700">
          {post?.description}
        </p>
      </article>

    </section>
  )
}
