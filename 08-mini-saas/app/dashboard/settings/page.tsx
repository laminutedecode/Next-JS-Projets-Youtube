import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser, updateUser } from "@/services/userService";
import Image from "next/image"


export default async function SettingsDashboard() {

  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }



  const data = await getUser(userId)

  return (
    <section className="w-full p-3 ">
      <p className="text-muted-foreground text-lg text-center text-orange-500">Vos informations</p>
      <h2 className="text-4xl uppercase text-center font-black mb-8">Profil</h2>
    
      <form  action={updateUser} className="w-full flex flex-col space-y-3 rounded-md p-3 ">
        <input type="hidden" name="id" id="id" value={data?.id} />
        <Image src={data?.userImage as string} width={100} height={100} alt="" className="rounded-full"/>
        <label htmlFor="userName" className="text-sm">Nom:</label>
        <input disabled id="userName" name="userName" className="bg-gray-200 text-gray-600  h-12 p-3 rounded-md border border-gray-300" type="text" defaultValue={data?.userName} />
        <label htmlFor="userEmail" className="text-sm">Email:</label>
        <input disabled id="userEmail" name="userEmail" className="bg-gray-200 text-gray-600 h-12 p-3 rounded-md border border-gray-300" type="email" defaultValue={data?.userEmail} />
        <label htmlFor="userJob" className="text-sm">Job:</label>
        <input id="userJob" name="userJob" className="h-12 p-3 rounded-md border border-gray-300" type="text" defaultValue={data?.userJob as string} />
        <label htmlFor="userDescription" className="text-sm">Votre description:</label>
        <textarea id="userDescription" name="userDescription" className="h-24 p-3 rounded-md border border-gray-300" defaultValue={data?.userDescription as string}  />
        <label htmlFor="userWebsite" className="text-sm">Site web:</label>
        <input id="userWebsite" name="userWebsite" className="h-12 p-3 rounded-md border border-gray-300" type="url" defaultValue={data?.userWebsite as string}  />
        <label htmlFor="userYoutube" className="text-sm">Youtube:</label>
        <input id="userYoutube" name="userYoutube" className="h-12 p-3 rounded-md border border-gray-300" type="url" defaultValue={data?.userYoutube as string}  />
        <label htmlFor="userInstagram" className="text-sm">Instagram</label>
        <input id="userInstagram" name="userInstagram" className="h-12 p-3 rounded-md border border-gray-300" type="url" defaultValue={data?.userInstagram as string}  />    
        <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md">Modifier</button>

      </form>

    </section>
  );
}