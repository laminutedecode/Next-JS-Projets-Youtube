import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/db/firebaseConfig"
import { LogOut,SquarePlus,Settings   } from 'lucide-react';
import Link from "next/link"

export default function DashboardNav() {

  const router = useRouter()

  const handleSignOut = ()=> {
    signOut(auth)
    router.push('/')
  }

  return (
    <div className='flex items-center justify-between mb-4'>
      <div className="flex items-center space-x-3">
      <Link href="/dashboard">
        <Button>
          <Settings  className="w-4"/>
        </Button>
      </Link>
      <Link href="/dashboard/createArticle">
        <Button>
          <SquarePlus className="w-4"/>
        </Button>
      </Link>
        
      </div>    
      <Button onClick={handleSignOut}>
        <LogOut className="w-4"/>
      </Button>
       
    </div>
  )
}
