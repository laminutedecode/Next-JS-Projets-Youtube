import { IoIosCloseCircle } from "react-icons/io";
import { useProductsContext } from "../Context/CartContext";
import Image from "next/image"
import { FaTrash } from "react-icons/fa";



interface Props {
  cartModalOpen: boolean;
  handleCartModal: () => void;
}

const CartModal: React.FC<Props> = ({ cartModalOpen, handleCartModal }) => {
  const { products,decrementQuantity, removeFromCart,incrementQuantity   } = useProductsContext();


  const totalPrice = products.reduce((total, product) => total + (product.price * product.quantityProduct), 0); // Multiplication du prix par la quantité


  return (
    <>
      {cartModalOpen && (
        <div className="w-[300px] h-[100vh] overflow-y-auto fixed top-[50px] right-0 bg-white border border-l-gray-700 pb-16">
          <button onClick={handleCartModal} className="text-gray-700 absolute top-2 right-2">
            <IoIosCloseCircle />
          </button>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Panier</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">Votre panier est vide.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="border-b py-2">
                  <Image src={product.image} alt={product.name} width={50} height={50}/>
                  <h3 className="text-lg text-gray-700 font-bold ">{product.name}</h3>
                  <p className="mt-2 text-gray-700 flex items-center gap-2"><span>Quantité:</span><span className="font-bold ">{product.quantityProduct} </span></p>
                  <p className="text-sm text-gray-500">Prix: {product.price}€ /UT</p>

                  <div className="flex items-center gap-2">
                  <button className="mt-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 p-2 rounded-lg cursor-pointer flex items-center justify-center"  onClick={() => decrementQuantity(product.id)}>
                    -
                  </button>
                  <button className="mt-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 p-2 rounded-lg cursor-pointer flex items-center justify-center"  onClick={() => incrementQuantity(product.id)}>
                    +
                  </button>
                  <button className="mt-2 w-6 h-6 bg-red-500 hover:bg-red-600 p-2 rounded-lg cursor-pointer flex items-center justify-center"  onClick={() => removeFromCart(product.id)}>
                    <FaTrash />
                  </button>
                  </div>
                  
                </div>
              ))
            )}
            <p className="mt-5 text-gray-700 flex items-center gap-2"><span>Total:</span><span className="font-bold text-2xl">{totalPrice} €</span></p>
            <button className="mt-5 self-end bg-orange-400 hover:bg-orange-600 rounded-md text-white p-2	">Proceder au paiement</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
