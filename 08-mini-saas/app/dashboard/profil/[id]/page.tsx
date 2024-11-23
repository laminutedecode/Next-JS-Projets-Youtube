import { getUser } from "@/services/userService";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube,FaGlobe   } from "react-icons/fa";
import { MdWork,MdArticle, MdOutlineChevronLeft    } from "react-icons/md";



interface Params {
  id: string;
  userName: string;
  userDescription: string;
  userImage: string;
  userWebsite: string;
  userYoutube: string;
  userInstagram: string;
}

interface UpdatePageProps {
  params: Params;
}

export default async function ProfilPage({ params }: UpdatePageProps) {
  const user = await getUser(params.id);
  console.log(user);

  if (!user) {
    return <p>Utilisateur non trouvé</p>;
  }

  return (
    <section className="h-screen max-w-[1000px] mx-auto w-full pt-10 relative">


      <Link href='/dashboard/home'>
        <button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1 rounded-md p-2 ">
          <MdOutlineChevronLeft  />
          <span>Retour</span>
        </button>
      </Link>



      <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-5 mt-5 relative">

      <Image src={user?.userImage as string} alt={`Photo de profil de ${user.userName}`} width={100} height={100} className="rounded-full"/>
      <h3 className=" text-4xl font-black uppercase mt-4">{user.userName}</h3>
      <p className="text-lg text-muted-foreground">
          Membre depuis le {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full"
          }).format(new Date(user.createdAt))}
      </p>
      <div className="text-muted-foreground flex items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white" >
          <MdWork  />
        </div>
        <span className="font-bold">Job:</span>
      </div>
      <p className="my-2">{user.userJob}</p>
      <div className="text-muted-foreground flex items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white" >
          <MdArticle  />
        </div>
          <span className="font-bold">Description:</span>
      </div>
      <p  className="my-2 text-justify">{user.userDescription}</p>
      <h4 className="uppercase font-bold text-orange-500">Réseaux sociaux</h4>
      <ul className="flex items-center gap-2">
        <li>
          <Link href={user.userWebsite as string}>
            <button className="w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center rounded-full">
              <FaGlobe className="w-4" />
            </button>
          </Link>
        </li>
        <li>
          <Link href={user.userYoutube as string}>
            <button className="w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center rounded-full">
              <FaYoutube className="w-4" />
            </button>
          </Link>
        </li>
        <li>
          <Link href={user.userInstagram as string}>
            <button className="w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center rounded-full">
              <FaInstagram className="w-4" />
            </button>
          </Link>
        </li>
      </ul>
      </div>
    </section>
  );
}
