import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { bookSchema } from '../schemas/productSchema'
import { BookFormData, BookModalProps } from '../types/types'

const initialFormData: BookFormData = {
  title: '',
  author: '',
  reference: '',
  price: 0,
  stock: 0
}

export default function BookModal({ isOpen, onClose, onSubmit, bookToEdit }: BookModalProps) {
  const [formData, setFormData] = useState<BookFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({})
  //Partial : Rend toutes les propriétés d'un type optionnelles.
// Record : Crée un objet où chaque clé est d'un certain type, et chaque valeur d'un autre type.

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        reference: bookToEdit.reference,
        price: bookToEdit.price,
        stock: bookToEdit.stock
      })
    } else {
      setFormData(initialFormData)
    }
  }, [bookToEdit, isOpen])

  const handleClose = () => {
    setFormData(initialFormData)
    setErrors({})
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = await bookSchema.validate(formData, { abortEarly: false })
      onSubmit(validatedData)
      // validate : Vérifie si les données fournies respectent les règles définies dans le schéma (comme bookSchema).
      handleClose()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Partial<Record<keyof BookFormData, string>> = {}
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            newErrors[err.path as keyof BookFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {bookToEdit ? 'Modifier le livre' : 'Ajouter un nouveau livre'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Auteur</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Référence</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData.reference}
              onChange={(e) => setFormData({...formData, reference: e.target.value})}
            />
            {errors.reference && (
              <p className="mt-1 text-sm text-red-600">{errors.reference}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Prix unitaire (€)</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value === '' ? 0 : parseFloat(e.target.value)})}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Stock disponible</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData.stock}
              onChange={(e) => setFormData({
                ...formData, 
                stock: e.target.value === '' ? 0 : parseInt(e.target.value)
              })}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              onClick={handleClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              {bookToEdit ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 