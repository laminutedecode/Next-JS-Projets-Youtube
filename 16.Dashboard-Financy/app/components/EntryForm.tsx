import { useState } from "react"
import { EntryFormProps } from "@/types/types"

export default function EntryForm({onAddEntry}: EntryFormProps) {

  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    frequency: 'one_time',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
    const {name, value} = e.target

    setFormData((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAddEntry(formData)
    setFormData({
      type: 'income',
      amount: '',
      category: '',
      frequency: 'one_time',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Types</label>
          <select name="type" value={formData.type} onChange={handleChange} id="type" className="w-full p-2 border rounded-md">
            <option value="income">Revenu</option>
            <option value="expense">Dépense</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Montant</label>
          <input type="number" id="amount" name="amount" onChange={handleChange} value={formData.amount} className="w-full p-2 border rounded-md" step="0.01" />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
          <input type="text" id="category" name="category" onChange={handleChange} value={formData.category} className="w-full p-2 border rounded-md"  />
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">Frequence</label>
          <select name="frequency" value={formData.frequency} onChange={handleChange} id="frequency" className="w-full p-2 border rounded-md">
            <option value="one_time">Ponctuel</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuel</option>
          </select>
        </div>
      </div>
      <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all">
        Ajouter une entrée
      </button>
    </form>
  )
}
