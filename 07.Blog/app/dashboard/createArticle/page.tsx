"use client"

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/db/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { useFirebase } from "@/context/articleContext";
import { schemaArticle } from "@/app/schema/schemas";
import { DataFormType } from "@/types/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import {useRouter} from "next/navigation"

export default function PageCreate() {
  const [file, setFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>(); // État pour stocker la prévisualisation de l'image
  const { addArticle } = useFirebase();
  const { user } = useAuth();
  const router = useRouter()

  // Utilisation du hook useForm pour gérer les formulaires avec validation
const { handleSubmit, register, formState: { errors } } = useForm<DataFormType>({
  // Utilisation de yupResolver pour valider le schéma de l'article avec Yup
  resolver: yupResolver(schemaArticle),
});

// Fonction pour gérer les changements dans le champ de fichier
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Récupération du fichier sélectionné
  const selectedFile = e.target.files?.[0];
  setFile(selectedFile);
  
  // Création d'une URL blob pour la prévisualisation de l'image
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl);
  }
};

// Fonction pour gérer la soumission du formulaire
const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
  try {
    let imageUrl = '';
    if (file) {
      // Référence au stockage pour l'image
      const imageRef = ref(storage, `articlesImages/${file.name}`);
      // Téléchargement de l'image vers le stockage
      await uploadBytes(imageRef, file);
      // Obtention de l'URL de téléchargement de l'image
      imageUrl = await getDownloadURL(imageRef);
    }

    // Appel à la fonction addArticle pour ajouter l'article à la base de données
    await addArticle({
      ...formData,
      image: imageUrl,
      authorName: user?.displayName as string,
      authorId: user?.uid as string,
      createdAt: new Date(),
    });
    
    // Réinitialisation de l'état de prévisualisation de l'image
    setImagePreview(undefined);
    // Redirection vers le tableau de bord
    router.push('/dashboard');
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
  }
};


  return (
    <Card>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <Label htmlFor="title">Title :</Label>
          <Input {...register("title")} id="title" />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}

          <Label htmlFor="description">Description :</Label>
          <Textarea {...register("description")} id="description" />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}

          <Label htmlFor="image">Image :</Label>
          <Input
            type="file"
            accept="image/gif, image/jpeg, image/png, image/webp"
            onChange={handleChange}
            id="image"
            className="cursor-pointer"
          />

          {/* Afficher la prévisualisation de l'image */}
          {imagePreview && <img className="w-full h-[500px] object-cover" src={imagePreview} alt="Image Preview" />}

          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button className='bg-red-500 hover;bg-red-600 text-white' type="button">
                Annuler
              </Button>
            </Link>
            <Button type="submit">
              Ajouter article
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
