import LogoMdc from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link"
import { User } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <nav className="max-w-[1200px] w-full mx-auto h-[80px] flex items-center justify-between p-5 border-b  border-gray-300">

      <div>
        <Link href='/'>
        <Image width={30} height={30} src={LogoMdc} className=" w-12 h-12" alt="Logo La Minute De Code" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
          <Link href="/signInAndUp">
            <Button>
                <User className="w-4" />
            </Button>
          </Link>
      </div>

  </nav>
  )
}
