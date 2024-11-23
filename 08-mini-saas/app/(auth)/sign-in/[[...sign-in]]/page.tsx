import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <SignIn />
    </section>
  )
  
}