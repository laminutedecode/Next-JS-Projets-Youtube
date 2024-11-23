import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs";
import { FaSignOutAlt, FaHome} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";


export default function DashboardNav() {

  const menuDashboard = [
    {name: "Home", icon: FaHome  , path:"/dashboard/home"},
    {name: "Parametres", icon: IoIosSettings  , path:"/dashboard/settings"},
  ]


  return (
    <nav>
        <ul className="mb-4">
          {menuDashboard.map((item, index)=> (
          <Link key={index} href={item.path} className="flex items-center gap-2 p-3 hover:bg-red-800 hover:text-white rounded-md">
          <item.icon/>
            <p className="text-sm">{item.name}</p>
          </Link>

          ))}
 
        </ul>

        <SignOutButton>
          <button className="bg-red-500 hover:bg-red-600 text-white rounded-md p-3 flex items-center gap-2"><FaSignOutAlt   /><span>Déconnexion</span> </button>
        </SignOutButton>

    </nav>
  )
}
