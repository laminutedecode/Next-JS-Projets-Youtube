"use client"

import React from 'react'
import {useRouter} from "next/navigation"
import Form from '@/components/Form'

export default function AddBlogPage() {


  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      })

      if(!response.ok){
        const error = await response.json();
        throw new Error(error.message)
      }

      router.replace('/blog')
      
    }catch(error){
      console.error(error)
    }
  }

  return (
    <section className='container mx-auto py-[50px]'>
      <h1 className="text-2xl font-bold mb-8">Add post</h1>
      <Form 
        initialValues={{title: '', description: '', category: ''}} 
        onSubmit={handleSubmit}
        submitButtonLabel="Add post"
      />
    </section>
  )
}
