'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Currency = 'USD' | 'JPY'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

// STANDALONE function — NOT a hook. Can be called anywhere.
export function formatPrice(usdPrice: number, currency: Currency): string {
  if (currency === 'JPY') return `¥${Math.round(usdPrice * 150).toLocaleString()}`
  return `$${usdPrice.toFixed(2)}`
}
