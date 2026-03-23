'use client'

import { useState } from 'react'
import { Service, Game } from '@/lib/data'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import { useCurrency } from '@/lib/currency'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/currency'

interface ServiceCardProps {
  service: Service
  game: Game
}

export default function ServiceCard({ service, game }: ServiceCardProps) {
  const { language } = useLanguage()
  const { currency } = useCurrency()
  const { addItem } = useCart()
  const [showToast, setShowToast] = useState(false)

  // Get bilingual text
  const serviceName = language === 'ja' ? service.nameJa : service.name
  const description = language === 'ja' ? service.descriptionJa : service.description
  const delivery = language === 'ja' ? service.deliveryJa : service.delivery

  // Format price
  const formattedPrice = formatPrice(service.priceUSD, currency)

  const handleAddToCart = () => {
    addItem({
      gameId: game.id,
      serviceId: service.id,
      gameName: game.name,
      gameNameJa: game.nameJa,
      serviceName: service.name,
      serviceNameJa: service.nameJa,
      priceUSD: service.priceUSD,
      quantity: 1,
      image: game.image,
    })

    // Show toast notification
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <>
      <div className="bg-[#13131a] rounded-xl p-6 border border-border hover:border-[#39ff14] transition-colors duration-300">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{serviceName}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>

        {/* Price and Delivery Time */}
        <div className="mb-6 flex items-center justify-between py-4 border-t border-b border-border/50">
          <div>
            <p className="text-xs text-gray-400 mb-1">
              {language === 'ja' ? '価格' : 'Price'}
            </p>
            <p className="text-2xl font-bold text-[#f59e0b]">{formattedPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">
              {translations[language].service.delivery}
            </p>
            <p className="text-sm font-semibold text-white">{delivery}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#39ff14] text-black font-bold py-3 rounded-lg hover:bg-[#2dff00] transition-colors duration-200 active:scale-95"
        >
          {translations[language].service.addToCart}
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-[#39ff14] text-black font-bold px-6 py-3 rounded-lg shadow-lg animate-fade-in-out z-50">
          {translations[language].service.addedToCart}
        </div>
      )}
    </>
  )
}
