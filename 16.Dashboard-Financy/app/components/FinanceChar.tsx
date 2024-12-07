"use client"

import { Props } from "@/types/types"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function FinanceChar({entries}: Props) {
  const incomeEntries = entries.filter(entry => entry.type === "income")
  const expenseEntries = entries.filter(entry => entry.type === "expense")
  const incomeByCategory = incomeEntries.reduce((acc, entry) => {
    const category = entry.category || "Non catégorisé"
    acc[category] = (acc[category] || 0) + Number(entry.amount)
    return acc
  }, {} as Record<string, number>)


  const expenseByCategory = expenseEntries.reduce((acc, entry) => {
    const category = entry.category || "Non catégorisé"
    acc[category] = (acc[category] || 0) + Number(entry.amount)
    return acc
  }, {} as Record<string, number>)


  const colors = {
    income: 'rgba(34,297,94,0.6)',   
    expense: 'rgba(239,68,68,0.6)',   
    incomeBorder: 'rgba(34,297,94,1)', 
    expenseBorder: 'rgba(239,68,68,1)', 
  }


  const labels = [...new Set([...Object.keys(incomeByCategory), ...Object.keys(expenseByCategory)])].sort()


  const barData = {
    labels,
    datasets: [
      {
        label: 'revenue',
        data: labels.map((category: string) => incomeByCategory[category] || 0),
        backgroundColor: colors.income,
        borderColor: colors.incomeBorder,
        borderWidth: 1
      },
      {
        label: 'Dépenses',
        data: labels.map((category: string) => expenseByCategory[category] || 0),
        backgroundColor: colors.expense,
        borderColor: colors.expenseBorder,
        borderWidth: 1
      },
    ]
  }
  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg mb-4 font-semibold">Répartition par catégorie</h3>
        <Bar 
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const
              },
              tooltip: {
                callbacks : {
                  label: (context) => `${context.dataset.label} : ${context.parsed.y.toFixed(2)} €`
                }
              }
            },
            scales : {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `${value} €`
                }
              }
            }
          }}
        
        />
      </div>

    </div>
  )
}
