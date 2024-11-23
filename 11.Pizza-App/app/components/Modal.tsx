import { Pizza } from '../Types/Types';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizza: Pizza | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, pizza }) => {
  if (!isOpen || !pizza) return null;

  return (
    <div className="absolute top-0 left-0 bg-white bg-opacity-50 w-full h-full flex items-center justify-center">
      <div className="mt-[350px] bg-white p-3 rounded-md shadow-md max-w-[400px] relative">
        <span className="bg-orange-600 hover:bg-orange-700 cursor-pointer p-2 absolute top-2 right-2 text-white rounded-md" onClick={onClose}>&times;</span>
        <img src={pizza.image} alt={pizza.name} className="w-auto h-auto object-content mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-stone-700">{pizza.name}</h2>
        <p className="text-stone-700 mb-2"><b>Ingredients: </b>{pizza.ingredient}</p>
        <p className="text-stone-700 mb-2"><b>Tailles: </b>M / XL / XXL</p>
        <p className='text-xl font-black text-orange-700'>{pizza.price} €</p>
        
      </div>
    </div>
  );
};

export default Modal;
