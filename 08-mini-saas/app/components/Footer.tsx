import { FaFacebook, FaTwitter,FaInstagramSquare   } from "react-icons/fa";


export default function Footer() {

  const menuFooter = [
    {name: "Facebook", icon:FaFacebook, path: "https://facebook.com" },
    {name: "Twitter", icon:FaTwitter, path: "https://twitter.com" },
    {name: "Instagram", icon:FaInstagramSquare, path: "https://instagram.com" },
  ]
  return (
    <footer className="flex items-center justify-center flex-col gap-5 p-5 bg-gray-700 text-white">
        <ul className="flex items-center justify-center gap-2">
          {menuFooter.map((item, index)=> (
            <li key={index}>
              <a href={item.path} className="flex items-center gap-2 text-[12px]">
                <item.icon />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[11px]">&copy; La Minute De Code - Tous droits réservés - 2024</p>
    </footer>
  )
}
