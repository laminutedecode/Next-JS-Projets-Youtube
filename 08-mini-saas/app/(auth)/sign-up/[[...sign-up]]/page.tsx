import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <SignUp />
    </section>
  )
}