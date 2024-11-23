import Image from "next/image"
import ImageHome from "../../public/p-home.png"
export default function Header() {
  return (
    <div className="h-[70vh] max-w-[1200px] m-auto grid grid-cols-1 md:grid-cols-2 p-5">
      <div className="order-2 md:order-1 flex justify-center flex-col">
    
       <h1 className="text-xl md:text-4xl lg:text-6xl text-stone-700 font-black text-center md:text-left mb-2"> Le Monde des Pizzas Gourmandes</h1>
        <p className="text-center md:text-left mb-2">Une Bouchée et Vous Serez Accro: Découvrez Nos Créations Artisanales et Nos Classiques Indémodables!</p>
        <a href="#PizzaList" className="bg-orange-600 hover:bg-orange-700 transition-all rounded-md p-4 text-center text-white font-bold">Découvrir nos pizzas</a>
       
      </div>
      <div className="order-1 md:order-2 flex items-center justify-center flex-col">
        <Image className="w-[400px]" src={ImageHome} alt="Pizza home" width={1000} />
      </div>

    </div>
  )
}
