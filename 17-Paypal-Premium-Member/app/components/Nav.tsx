import {SignInButton, SignedIn, SignedOut,UserButton} from '@clerk/nextjs'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className='w-full h-[50px] p-2 flex items-center justify-between border-b'>
      <div className="flex items-center gap-2 text-sm">
        <Link href="/">Home</Link>
        <Link href="/sign-in">SignIn</Link>
        <Link href="/sign-up">SignUp</Link>
      </div>
      <div>
      <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </div>
    </nav>
  )
}
