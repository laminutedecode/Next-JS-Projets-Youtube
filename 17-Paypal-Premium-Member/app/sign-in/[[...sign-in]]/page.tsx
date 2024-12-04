import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <section className="flex items-center justify-center w-full min-h-screen">
     <SignIn />
  </section>
  
}