export interface BookFormData {
  title: string
  author: string
  reference: string
  price: number
  stock: number
}

export interface Book extends BookFormData {
  id: number
} 

export interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: BookFormData) => void
  bookToEdit?: Book
}