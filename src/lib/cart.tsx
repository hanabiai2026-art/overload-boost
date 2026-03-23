'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  gameId: string
  serviceId: string
  gameName: string
  gameNameJa: string
  serviceName: string
  serviceNameJa: string
  priceUSD: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (gameId: string, serviceId: string) => void
  updateQuantity: (gameId: string, serviceId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPriceUSD: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPriceUSD: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.gameId === newItem.gameId && i.serviceId === newItem.serviceId
      )
      if (existing) {
        return prev.map(i =>
          i.gameId === newItem.gameId && i.serviceId === newItem.serviceId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (gameId: string, serviceId: string) => {
    setItems(prev => prev.filter(i => !(i.gameId === gameId && i.serviceId === serviceId)))
  }

  const updateQuantity = (gameId: string, serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(gameId, serviceId)
      return
    }
    setItems(prev =>
      prev.map(i =>
        i.gameId === gameId && i.serviceId === serviceId ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPriceUSD = items.reduce((sum, i) => sum + i.priceUSD * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPriceUSD }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
