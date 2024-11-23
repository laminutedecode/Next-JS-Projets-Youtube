import SearchForm from "./components/SearchForm"
import CarOptions from "./components/CarOptions";
import OptionsBuy from "./components/optionsBuy"

export default function Home() {
  return (

      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4 h-screen">

        <div className="h-full border border-gray-200 rounded-md p-5">
        <SearchForm />
        <h2 className='text-[14px] font-medium mt-4 mb-2'>Options</h2>
        <CarOptions />
        <OptionsBuy />
         <button className='bg-yellow-400 text-black border border-yellow-400 hover:bg-transparent p-2 text-sm rounded-md mt-5 transition-all'>Calculer le trajet</button>

        </div>

        <div className="h-full col-span-2 md:order-2 order-first p-4 border border-gray-200 rounded-md">
        <iframe className="w-full h-full rounded-md" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824562855!2d2.264634812292689!3d48.85893843467764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1712364568725!5m2!1sfr!2sfr" width="600" height="450" loading="lazy" ></iframe>
        </div>

      </div>
  );
}
