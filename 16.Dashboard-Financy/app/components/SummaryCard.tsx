import React from 'react'
import { SummaryCardProps } from '@/types/types'

export default function SummaryCard({title, value, isLoading, borderColor, textColor}: SummaryCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${borderColor}`}>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {isLoading ? (
        <p className={`text-2xl font-bold ${textColor}`}>Chargement</p>
      ) : (
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>

      )}
    </div>
  )
}
