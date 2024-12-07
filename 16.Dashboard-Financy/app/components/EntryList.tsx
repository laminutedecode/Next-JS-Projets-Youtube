import React from 'react'
import { EntryListProps } from '@/types/types'

export default function EntryList({entries, isLoading, onDeleteEntry}: EntryListProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className="text-xl font-semibold mb-4">Entées existantes</h2>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry)=> (
            <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <span className={`font-semibold ${entry.type === "income" ? "text-green-500" : "text-red-500"}`}>{entry.amount} €</span>
                <p className="text-gray-600">{entry.category}</p>
                <p className="text-sm text-gray-500">{entry.frequency}</p>
              </div>

              <button onClick={()=> onDeleteEntry(entry.id)} className="text-red-500 hover:text-red-600 ">
                supprimer
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}
