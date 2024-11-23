"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '@/db/firebaseConfig';
import { DataType, DbContextType } from '@/types/types';
import useAuth from '@/hooks/useAuth';


const ArticlesContext = createContext<DbContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};


export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  const [articles, setArticles] = useState<DataType[]>([]);
  const { user } = useAuth();
  const authorId = user?.uid as string;


  useEffect(() => {
    if (!authorId) return;
    const q = query(collection(db, 'articles'), where('authorId', '==', authorId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: DataType[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as DataType);
      });
      setArticles(data);
    });

    return () => unsubscribe();
  }, [authorId]);


  const addArticle = async (data: Omit<DataType, 'id'> & { image: string }) => {
    try {
      const docRef = await addDoc(collection(db, 'articles'), { ...data, authorId });
      const newArticle: DataType = { id: docRef.id, ...data, authorId};
      setArticles([...articles, newArticle]);
    } catch (error) {
      console.error('Erreur lors de la création de membre:', error);
      throw new Error('Erreur lors de la création de membre');
    }
  };

  const updateArticle = async (article: DataType) => {
    try {
      const articleRef = doc(db, 'articles', article.id);
      await updateDoc(articleRef, article);
      setArticles(articles.map((a) => (a.id === article.id ? { ...a, ...article } : a)));
    } catch (error) {
      console.error('Erreur lors de la modification de l\'article:', error);
      throw new Error('Erreur lors de la modification de l\'article');
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'articles', id));
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      throw new Error('Erreur lors de la suppression');
    }
  };


  const value = {
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
  };

  
  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>;
};