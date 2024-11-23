import { useState, useEffect } from 'react';
import { auth } from '@/app/db/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
const provider = new GoogleAuthProvider();


const useClientAuth = () => {
  
  // Variables d'état pour l'utilisateur et le statut de chargement
  const [user, setUser] = useState<User | null>(null); // Initialise l'état de l'utilisateur à null
  const [isFetch, setIsFetch] = useState(true); // Initialise le statut de chargement à true
  
  // Instance du routeur Next.js
  const router = useRouter();
  
  // Fonction pour se connecter avec Google
  const loginWithGoogle = async ()=> {
    const result = await signInWithPopup(auth, provider); // Se connecte avec Google en utilisant la fenêtre contextuelle d'authentification Firebase
    const user = result.user; // Extrait l'utilisateur du résultat
    if(user){
      router.push("/dashboard"); // Redirige vers le tableau de bord si l'utilisateur existe
    }
  }

  // Effet pour écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user); // Définit l'état de l'utilisateur si l'utilisateur existe
        setIsFetch(false); // Définit le statut de chargement à false
      } else {
        setUser(null); // Définit l'état de l'utilisateur à null si l'utilisateur n'existe pas
        setIsFetch(false); // Définit le statut de chargement à false
      }
    });
    return () => unsubscribe(); // Se désabonne des changements d'état d'authentification lors du démontage du composant
  }, []);


  const redirectIfAuthenticated = () => {
    if (user) {
      router.push('/dashboard'); 
    }
  };


  console.log(user);
  



  return { user, isFetch, redirectIfAuthenticated, loginWithGoogle };
};

export default useClientAuth;

