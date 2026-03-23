'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import HeroBanner from '@/components/HeroBanner'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import GameCard from '@/components/GameCard'
import PaymentMethods from '@/components/PaymentMethods'
import { games } from '@/lib/data'

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Trust Badges */}
      <TrustBadges />

      {/* How It Works */}
      <HowItWorks />

      {/* Games Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            {t.gamesSection.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <PaymentMethods />
    </div>
  )
}
