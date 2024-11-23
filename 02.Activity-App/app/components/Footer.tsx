import { FaFacebook, FaInstagramSquare, FaTwitter  } from "react-icons/fa";



export default function Footer() {

  const menuFooter = [
    {name: "Facebook", icon: FaFacebook, link: "https://facebook.com"},
    {name: "Instagram", icon: FaInstagramSquare, link: "https://instagram.com"},
    {name: "Twitter", icon: FaTwitter, link: "https://twitter.com"},
  ]



  return (
    <footer className='flex items-center justify-center flex-col gap-5 p-5 bg-[#ff6030] text-white'>
      <ul className="flex items-center justify-center gap-2">
      {menuFooter.map((item, index)=> (
        <li key={index}>
          <a href={item.link} className="flex items-center gap-2 text-[11px]">
          <item.icon />
          <span>{item.name}</span>
          </a>
        </li>
      ))}
      </ul>
      <p className='text-[11px]'>&copy; La Minute De Code - Tous droits reservés - 2024</p>
    </footer>
  )
}
