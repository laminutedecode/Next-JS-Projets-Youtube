import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "../components/dashboard/DashboardNav";
import { addUser } from "@/services/userService";

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {

  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  if(userId && user){
    const fullName = `${user.firstName} ${user.lastName}` || "";
    const email = user.emailAddresses[0]?.emailAddress || "";
    const image = user.imageUrl || "";
    await addUser(userId, fullName, email, image)
  }

  return (
      <section className="mx-auto w-full  mt-2 p-2 flex">
        <div className="w-2/12 h-screen border-r border-gray-400 p-3">
          <DashboardNav/>
        </div>
        <div className="w-full">
          {children}
        </div>
        
        
      </section> 
  );
}
