"use client"

import Link from "next/link";
import {useState, useEffect} from "react"
import { Entry } from "@/types/types";
import SummaryCard from "./components/SummaryCard";
import FinanceChar from "./components/FinanceChar";

export default function Home() {

  const [entries, setEntries] = useState<Entry[]>([]);
  const [totals, setTotals] = useState({income: 0, expense: 0, balance:0});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=> {
    fetchTotals()
  }, [])

  const fetchTotals = async ()=> {
    try {
      const response = await fetch('/api/entries')

      const entries : Entry[] = await response.json()

      setEntries(entries)

      const calculatedTotals = entries.reduce((acc, entry)=> {
        if(entry.type === "income"){
          acc.income += entry.amount
        }else {
          acc.expense += entry.amount
        }
        return acc
      }, {income: 0, expense: 0, balance: 0})

      calculatedTotals.balance = calculatedTotals.income - calculatedTotals.expense

      setTotals(calculatedTotals)

    }catch(error){
      console.error('Error fetching totals', error)
    }finally {
      setIsLoading(false)
    }
  }


  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-8 font-bold">Tableau de bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard 
            title="Revenus totaux"
            value={`${totals.income.toFixed(2)} €`}
            isLoading={isLoading}
            borderColor="border-green-500"
            textColor="text-green-500"
          />
          <SummaryCard 
            title="Dépenses totals"
            value={`${totals.expense.toFixed(2)} €`}
            isLoading={isLoading}
            borderColor="border-red-500"
            textColor="text-red-500"
          />
          <SummaryCard 
            title="Solde"
            value={`${totals.balance.toFixed(2)} €`}
            isLoading={isLoading}
            borderColor="border-blue-500"
            textColor={totals.balance >=0 ? "text-blue-500" : "text-red-500"}
          />
        </div>


        {!isLoading && entries.length > 0 && <FinanceChar entries={entries} />}

        <div className="mt-8">
          <Link href="/entry" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all">
            Gérer les entrées
          </Link>
        </div>

      </div>
    </main>
  );
}
