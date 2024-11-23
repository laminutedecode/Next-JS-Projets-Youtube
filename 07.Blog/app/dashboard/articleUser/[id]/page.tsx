"use client"

import React, { useState, useEffect } from "react";
import { useFirebase } from "@/context/articleContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/db/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { schemaArticle } from "@/app/schema/schemas";
import { DataFormType, DataType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {UpdatePageProps  } from '@/types/types';


export default function PageUpdate({ params }: UpdatePageProps) {
  const [file, setFile] = useState<File | undefined>();
  const { updateArticle, articles } = useFirebase();
  const { user } = useAuth();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined); // État pour stocker l'URL actuelle de l'image

  const router = useRouter()
  const articleId = params.id as string;

  // Find the article to update
  const articleToUpdate = articles.find((article) => article.id === articleId);


  useEffect(() => {
    if (articleToUpdate) {
      setCurrentImageUrl(articleToUpdate.image); // Mettez à jour l'URL de l'image actuelle lorsque l'article à mettre à jour est disponible
    }
  }, [articleToUpdate]);

  const { handleSubmit, register, reset, formState: { errors }, setValue } = useForm<DataFormType>({
    resolver: yupResolver(schemaArticle),
    defaultValues: articleToUpdate // Set default values from the article to update
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    try {
      let updatedImageUrl = currentImageUrl; // Utilisez l'URL actuelle de l'image par défaut

      // Si un nouveau fichier est sélectionné, téléchargez-le et mettez à jour l'URL de l'image
      if (file) {
        const imageRef = ref(storage, `articlesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        updatedImageUrl = await getDownloadURL(imageRef);
      }

      // Créez un objet de type DataType
      const updatedArticle: DataType = {
        id: articleId,
        title: formData.title,
        description: formData.description,
        image: updatedImageUrl as string,
        authorName: user?.displayName as string,
        authorId: user?.uid as string,
        createdAt: new Date(),
      };

      // Appelez updateArticle avec l'objet article mis à jour
      updateArticle(updatedArticle);
      router.push('/dashboard')
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
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

          {/* Afficher l'image en fonction de l'URL de l'image mise à jour ou actuelle */}
          {currentImageUrl && <img className="w-full h-[500px] object-cover" src={currentImageUrl} alt="Image Preview" />}

          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button className="bg-red-500 hover:bg-red-600 text-white" type="button">
                Annuler
              </Button>
            </Link>
            <Button type="submit">Modifier l'article</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
