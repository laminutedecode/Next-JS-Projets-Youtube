import * as Yup from 'yup';


export const schemaArticle = Yup.object().shape({
  title: Yup.string().trim().required("Le titre est requis"),
  description: Yup.string().trim().required("La description est requise"),
  image: Yup.string(), 
});