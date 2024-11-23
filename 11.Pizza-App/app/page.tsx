"use client"
import Nav from "./components/Nav";
import Header from "./components/Header";
import ListPizza from "./components/ListPizza";
import { Pizza } from './Types/Types';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/db/firebaseConfig'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";


export default function Home() {
  const [cartQuantity, setCartQuantity] = useState(0);

  const addToCart = (pizza: Pizza) => {
    // Mettre à jour la quantité dans le panier
    setCartQuantity(cartQuantity + 1);
    // Autres logiques pour ajouter l'article au panier
  };

  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const pizzaCollection = collection(db, 'pizza');
      const pizzaSnapshot = await getDocs(pizzaCollection);
      const pizzaData = pizzaSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Pizza[];
      setPizzas(pizzaData);
    };

    fetchData();
  }, []);

  return (
   <>
      <Nav cartQuantity={cartQuantity} />
      <Header/>
      <ListPizza pizzas={pizzas} addToCart={addToCart}/>
      <ToastContainer />
      <Footer />
   </>
  );
}
