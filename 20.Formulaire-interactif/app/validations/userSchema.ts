import * as yup from 'yup'

export const userSchema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  description: yup.string().required('La description est requise'),
  url_github: yup.string().optional(),
  url_youtube: yup.string().optional(),
  url_site: yup.string().optional(),
  job: yup.string().required('Le poste est requis'),
  technologies: yup.array()
    .of(yup.string().defined())
    .required('Sélectionnez au moins une technologie')
    .min(1, 'Sélectionnez au moins une technologie')
    .transform((value) => value.filter(Boolean))
}) 