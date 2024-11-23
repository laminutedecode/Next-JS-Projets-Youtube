import Link from "next/link"
import Image from "next/image"
import LogoMdc from "@/public/logo.png"
import { FaUser } from "react-icons/fa";


export default function Nav() {
  return (
    <nav className="h-[80px] w-full border-b border-b-gray-300 flex justify-between items-center p-5">

      <Link href="/">
        <Image src={LogoMdc} width={50} height={50} alt="Logo La Minute De Code" />
      </Link>
      <Link href="/sign-in">
        <button className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full flex items-center justify-center">
          <FaUser />
        </button>
      </Link>

    </nav>
  )
}
