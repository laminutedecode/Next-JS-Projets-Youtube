import * as yup from 'yup';

export const companySchema = yup.object({
  name: yup.string().required('Le nom est requis'),
  address: yup.string().required('L\'adresse est requise'),
  postalCode: yup.string().required('Le code postal est requis'),
  country: yup.string().required('Le pays est requis'),
  siret: yup.string().required('Le numéro SIRET est requis'),
  iban: yup.string().required('L\'IBAN est requis'),
  phone: yup.string().required('Le numéro de téléphone est requis'),
}).required().strict();

export const clientSchema = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  phone: yup.string().required('Le numéro de téléphone est requis'),
  address: yup.string().required('L\'adresse est requise'),
});

export const documentSchema = yup.object().shape({
  clientId: yup.string().required('Le client est requis'),
  date: yup.string().required('La date est requise'),
  items: yup.array().of(
    yup.object().shape({
      description: yup.string().required('La description est requise'),
      quantity: yup.number().required('La quantité est requise').min(1, 'La quantité doit être supérieure à 0'),
      unitPrice: yup.number().required('Le prix unitaire est requis').min(0, 'Le prix unitaire doit être positif'),
    })
  ).min(1, 'Au moins un article est requis'),
  tva: yup.number().nullable(),
}); 