import * as yup from 'yup'

export const bookSchema = yup.object({
  title: yup
    .string()
    .required('Le titre est requis')
    .min(2, 'Le titre doit contenir au moins 2 caractères'),
  author: yup
    .string()
    .required('L\'auteur est requis')
    .min(2, 'Le nom de l\'auteur doit contenir au moins 2 caractères'),
  reference: yup
    .string()
    .required('La référence est requise')
    .min(3, 'La référence doit contenir au moins 3 caractères'),
  price: yup
    .number()
    .required('Le prix est requis')
    .positive('Le prix doit être positif')
    .min(0.01, 'Le prix minimum est de 0.01'),
  stock: yup
    .number()
    .required('Le stock est requis')
    .integer('Le stock doit être un nombre entier')
    .min(0, 'Le stock ne peut pas être négatif')
}) 