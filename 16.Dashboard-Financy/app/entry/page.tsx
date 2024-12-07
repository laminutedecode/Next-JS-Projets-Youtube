"use client"

import {useState, useEffect} from "react"
import Link from "next/link"
import { Entry } from "@/types/types"
import EntryForm from "../components/EntryForm"
import EntryList from "../components/EntryList"

export default function page() {

  const [entries, setEntries] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(()=> {
    fetchEntries()
  }, [])

  const fetchEntries = async ()=> {
    try {
      const response = await fetch('/api/entries')
      const data = await response.json()
      setEntries(data)
    }catch(error){
      console.error('error fetching entries', error)
    }finally {
      setIsLoading(false)
    }
  }

  const handleAddEntry = async(entry: {type: string, amount: string, category: string, frequency: string}) => {
    try {
      const response = await fetch('/api/entries', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      })

      if(response.ok) fetchEntries()

    }catch(error){
      console.error('error adding entry', error)
    }
  }

  const handleDeleteEntry = async (id: string)=> {
    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: "DELETE"
      })

      if(response.ok) fetchEntries()

    }catch(error){
      console.error('error deleting entry', error)
    }
  }


  return (
    <div className="min-h-screen p-8 bg-gray-100 ">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all">
          Retour
        </Link>
        <h1 className="mt-6 text-3xl mb-8 font-bold">
          Gérer les entrées
        </h1>
        <EntryForm onAddEntry={handleAddEntry} />
        <EntryList entries={entries} isLoading={isLoading} onDeleteEntry={handleDeleteEntry} />
      </div>
    </div>
  )
}
