'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import FinanceCharts from './components/FinanceCharts'
import { Entry } from './types/types'

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [totals, setTotals] = useState({
    income: 0,
    expense: 0,
    balance: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTotals()
  }, [])

  const fetchTotals = async () => {
    try {
      const response = await fetch('/api/entries')
      const entries: Entry[] = await response.json()
      setEntries(entries)
      
      const calculatedTotals = entries.reduce((acc, entry) => {
        if (entry.type === 'income') {
          acc.income += entry.amount
        } else {
          acc.expense += entry.amount
        }
        return acc
      }, { income: 0, expense: 0, balance: 0 })

      calculatedTotals.balance = calculatedTotals.income - calculatedTotals.expense
      
      setTotals(calculatedTotals)
    } catch (error) {
      console.error('Erreur lors de la récupération des totaux:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord Financier</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte des revenus */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700">Revenus Totaux</h2>
            {isLoading ? (
              <p className="text-2xl font-bold text-green-600">Chargement...</p>
            ) : (
              <p className="text-2xl font-bold text-green-600">{totals.income.toFixed(2)} €</p>
            )}
          </div>

          {/* Carte des dépenses */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-700">Dépenses Totales</h2>
            {isLoading ? (
              <p className="text-2xl font-bold text-red-600">Chargement...</p>
            ) : (
              <p className="text-2xl font-bold text-red-600">{totals.expense.toFixed(2)} €</p>
            )}
          </div>

          {/* Carte du solde */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700">Solde Actuel</h2>
            {isLoading ? (
              <p className="text-2xl font-bold text-blue-600">Chargement...</p>
            ) : (
              <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {totals.balance.toFixed(2)} €
              </p>
            )}
          </div>
        </div>

        {!isLoading && entries.length > 0 && (
          <FinanceCharts entries={entries} />
        )}

        <div className="mt-8">
          <Link 
            href="/entry" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Gérer les Entrées
          </Link>
        </div>
      </div>
    </main>
  )
}
