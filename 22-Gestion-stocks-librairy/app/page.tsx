'use client'

import { useEffect, useState } from 'react'
import BookModal from './components/BookModal'
import { Book, BookFormData } from './types/types'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Erreur lors du chargement des livres:', error)
    }
  }

  const handleAddBook = async (data: BookFormData) => {
    setIsLoading(true)
    try {
      await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      await fetchBooks()
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBook = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }
      await fetchBooks()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditBook = async (data: BookFormData) => {
    setIsLoading(true)
    try {
      await fetch(`/api/books/${bookToEdit?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      await fetchBooks()
      setBookToEdit(undefined)
    } catch (error) {
      console.error('Erreur lors de la modification du livre:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (book: Book) => {
    setBookToEdit(book)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des stocks - Librairie</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            disabled={isLoading}
          >
            Ajouter un livre
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Titre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Auteur</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Référence</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Prix unitaire</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.price.toFixed(2)} €</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        book.stock <= 5 
                          ? 'bg-red-100 text-red-800' 
                          : book.stock <= 10 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {book.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(book)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                          disabled={isLoading}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                          disabled={isLoading}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <BookModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setBookToEdit(undefined)
          }}
          onSubmit={bookToEdit ? handleEditBook : handleAddBook}
          bookToEdit={bookToEdit}
        />
      </div>
    </div>
  )
}
