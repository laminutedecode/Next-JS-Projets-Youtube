"use client"

import { optimizeImage } from 'next/dist/server/image-optimizer'
import React from 'react'
import { useState } from 'react'

const currencies = [
  {code: "EUR", name: "Euro"},
  {code: "USD", name: "US Dollar"},
  {code: "GBP", name: "British Pound"},
  {code: "JPY", name: "Japanese Yen"},
  {code: "AUD", name: "Australian Dollar"},
]

export default function CurrencyConverter() {

  const [amount, setAmount] = useState<string>("")
  const [fromCurrency, setFromCurrency] = useState("EUR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [result, setResult] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleConvert = async ()=> {
    if(!amount) return
    setIsLoading(true)
    try {
      if(!process.env.NEXT_PUBLIC_API_KEY) {
        throw new Error('API key is missing')
      }

      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/latest/${fromCurrency}`)


      if(!response.ok){
        throw new Error('Failed to fetch exchange rates')
      }

      const data = await response.json()

      if(data.result === 'error'){
        throw new Error(data['error-type'])
      }

      const rate = data.conversion_rates[toCurrency]
      const calculatedResult = parseFloat(amount) * rate

      setResult(calculatedResult)

    }catch(error){
      console.error('Error converting currency', error)
    }
    setIsLoading(false)
  }

  const availableCurrencies = currencies.filter(currency => currency.code !== fromCurrency)

  return (
    <div className='space-y-4'>
      <div>
        <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-1">
          Montant
        </label>
        <input value={amount} placeholder='Entrez un montant' id='montant' type="number" className="w-full p-2 border rounded-md" onChange={(e)=> setAmount(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-1">De</label>
          <select value={fromCurrency} id="fromCurrency" onChange={(e)=> {
            setFromCurrency(e.target.value)
            if(e.target.value === toCurrency){
              const firstAvailable = currencies.find(c => c.code !== e.target.value)
              if(firstAvailable){
                setToCurrency(firstAvailable.code)
              }
            }
          }} 
          className='w-full p-2 border rounded-md'
          >
            {currencies.map((currency)=> (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>

          <div>
          <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-1">Vers</label>
          <select id="toCurrency" value={toCurrency} onChange={(e)=> setToCurrency(e.target.value)} className='w-full p-2 border rounded-md'>
            {availableCurrencies.map((currency)=> (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
          </div>
      </div>

      <button onClick={handleConvert} disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        {isLoading ? 'Conversion en cours...' : 'Convertir'}
      </button>

      {result !== null &&  (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-center text-lg">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}



    </div>
  )
}
