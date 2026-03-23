'use client'

import Link from 'next/link'
import { Game } from '@/lib/data'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import { useCurrency } from '@/lib/currency'
import { formatPrice } from '@/lib/currency'

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  const { language } = useLanguage()
  const { currency } = useCurrency()

  // Get the cheapest service price
  const cheapestPrice = Math.min(...game.services.map(s => s.priceUSD))
  const formattedPrice = formatPrice(cheapestPrice, currency)

  // Get bilingual game name
  const gameName = language === 'ja' ? game.nameJa : game.name

  return (
    <Link href={`/${game.slug}`}>
      <div className="relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] aspect-video">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${game.image})`,
          }}
        />

        {/* Dark Gradient Overlay at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6">
          {/* Game Name - Bottom Left */}
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-white mb-2">{gameName}</h3>

            {/* Price and View Services */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-200">
                {translations[language].gameCard.startingFrom} {formattedPrice}
              </p>
              <span className="text-sm font-semibold text-[#39ff14] hover:text-[#2dff00] transition-colors">
                {translations[language].gameCard.viewServices}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
