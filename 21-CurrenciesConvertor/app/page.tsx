import CurrencyConverter from "./components/CurrencyConverter";

export default function Home() {
  return (
   <main className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <CurrencyConverter />
    </div>
   </main>
  );
}
