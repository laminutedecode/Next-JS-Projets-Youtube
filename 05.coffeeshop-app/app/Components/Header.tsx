
import { IoIosArrowDown } from "react-icons/io";

export default function Header() {
  return (
    <header className="w-full h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1768&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>

      <div className="w-full h-full bg-black bg-opacity-60 flex items-center justify-center flex-col">
        <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-8xl">COFFEE<span className="text-[#F9BD93]">SHOP</span></h1>
        <p className="text-white font-bold my-2 mx-2 text-center text-[12px] md:text-[14px] lg:text-[16px]">Éveillez vos sens avec nos arômes exquis : Le café qui réveille les passions</p>
        <a href="#produits" className="text-white text-4xl cursor-pointer hover:text-[#F9BD93] hover:scale-110 transition-all">
          <IoIosArrowDown />
        </a>

      </div>

    </header>
  )
}
