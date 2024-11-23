import React, { useState } from 'react';
import { Pizza } from '../Types/Types';
import Card from './Card';
import Modal from './Modal'; // Importez le composant Modal ici

interface ListProps {
  pizzas: Pizza[];
  addToCart: (pizza: Pizza) => void;
}

const ListPizza: React.FC<ListProps> = ({ pizzas, addToCart }) => {
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPizza(null);
    setIsModalOpen(false);
  };

  return (
    <div id='PizzaList' className="max-w-[1000px] w-full mx-auto p-5">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <Card key={pizza.name} pizza={pizza} addToCart={addToCart} onCardClick={handleCardClick} /> 
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} pizza={selectedPizza} />
    </div>
  );
};

export default ListPizza;
