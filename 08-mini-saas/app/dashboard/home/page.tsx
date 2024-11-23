import { getAllUsers } from "@/services/userService"
import Image from "next/image"
import Link from "next/link"


export default async function HomeDashboard() {

  const dataUsers = await getAllUsers()

  return (
    <section className="w-full p-3 pt-6">
      <p className="text-muted-foreground text-lg text-center text-orange-500">Trouver le développeur qui vous convient</p>
      <h2 className="text-4xl uppercase text-center font-black mb-8">Un projet ? Une solution !</h2>
      <div className="max-w-[1000px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {dataUsers.map((user, index) => (
          <Link href={`/dashboard/profil/${user?.clerkUserId}`} key={index}>
            <div  className="border border-gray-300 rounded-md p-3 shadow-md flex justify-center items-center flex-col hover:translate-y-[-10px] transition-all">
            <Image src={user?.userImage as string} alt={`Photo de profil de ${user?.userName}`} width={100} height={100} className="rounded-full"/>
            <h3 className="font-bold uppercase text-center mt-2">{user?.userName}</h3>
            <p className="text-muted-foreground">{user?.userJob}</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md mt-2">Voir profil</button>
          </div>
          </Link>
        ))}
      </div>

    </section>
  )
}
