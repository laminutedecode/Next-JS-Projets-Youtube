
import Link from "next/link"



export default function SuccessPage() {

  return (
    <section className='w-full h-screen pt-20 text-center'>
      <div className='w-[400px] mx-auto p-4'>
      <h1 className="text-xl  font-black mb-2 text-center uppercase ">Paiement réussi !</h1>
      <p className="text-muted-foreground text-sm mb-2">Vos place sont réservées, vous aller recevoir un e-mail de comfirmation avec vos places</p>
      <button className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-md">
        <Link href="/">Retour sur le site </Link>
        </button>
        </div>
      </section>
  );
}
