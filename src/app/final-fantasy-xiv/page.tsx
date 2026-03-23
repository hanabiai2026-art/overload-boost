'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import Link from 'next/link'
import ServiceCard from '@/components/ServiceCard'
import { games } from '@/lib/data'

export default function FinalFantasyXIVPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const game = games.find((g) => g.slug === 'final-fantasy-xiv')

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game not found</h1>
          <Link href="/" className="text-[#39ff14] hover:underline">
            {t.gameDetail.backToGames}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#0a0a0f]">
      {/* Game Banner */}
      <div
        className="relative h-96 md:h-96 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.image})`,
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'ja' ? game.nameJa : game.name}</h1>
          <p className="text-xl md:text-2xl text-gray-300">{language === 'ja' ? game.descriptionJa : game.description}</p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t.gameDetail.services}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {game.services.map((service) => (
              <ServiceCard key={service.id} service={service} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Back to Games */}
      <section className="py-8 px-4 md:px-8 lg:px-12 border-t border-[#39ff14]/20">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-[#39ff14] hover:text-[#f59e0b] transition">
            <span className="mr-2">←</span>
            <span>{t.gameDetail.backToGames}</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
