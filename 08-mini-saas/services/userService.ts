"use server"

import {prisma} from "@/lib/db"
import { redirect } from "next/navigation";

export const addUser = async(clerkUserId: string, userName: string, userEmail: string, userImage: string) => {
  try {
    const user = await prisma.user.upsert({
      where: {clerkUserId},
      update: {
        userName,
        userEmail,
        userImage
      },
      create: {
        clerkUserId,
        userName,
        userEmail,
        userImage
      }
    });
    return user

  }catch(error){
    console.error('Une erreur est survenue lors de la création de lutilisateur', error)
    throw error;
  }
}


export const getUser = async(clerkUserId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {clerkUserId}
    })
    return user

  }catch(error){
    console.error("une erreur est survenue lros de la recuperation de lutilisateur", error)
    throw error
  }
}

export const updateUser = async (formData: FormData) => {
  try {
    const userJob = formData.get('userJob') as string; 
    const userDescription = formData.get('userDescription') as string; 
    const userSite = formData.get('userWebsite') as string; 
    const userInstagram = formData.get('userInstagram') as string; 
    const userYoutube = formData.get('userYoutube') as string; 
    const id = formData.get('id') as string; 


    if (id !== null) {
      await prisma.user.update({
        where: { id } ,
        data: { userJob: userJob, userDescription:userDescription , userWebsite: userSite, userInstagram:userInstagram , userYoutube: userYoutube},
      });
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }finally {
    redirect('/dashboard/home')
  } 
};

export const getAllUsers = async()=> {
  const allUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return allUsers;
}