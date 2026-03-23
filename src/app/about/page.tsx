'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'

export default function AboutPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const stats = [
    { label: t.about.stat1Label, value: t.about.stat1Value },
    { label: t.about.stat2Label, value: t.about.stat2Value },
    { label: t.about.stat3Label, value: t.about.stat3Value },
    { label: t.about.stat4Label, value: t.about.stat4Value },
  ]

  const values = [
    {
      title: t.about.value1Title,
      description: t.about.value1Description,
    },
    {
      title: t.about.value2Title,
      description: t.about.value2Description,
    },
    {
      title: t.about.value3Title,
      description: t.about.value3Description,
    },
    {
      title: t.about.value4Title,
      description: t.about.value4Description,
    },
  ]

  return (
    <div className="w-full bg-[#0a0a0f]">
      {/* Header Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t.about.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t.about.intro}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#1a1a23] border-y border-[#39ff14]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#39ff14] mb-6">
            {t.about.mission}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {t.about.missionText}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t.about.statsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg p-8 text-center hover:border-[#39ff14] transition"
              >
                <p className="text-4xl font-bold text-[#39ff14] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#1a1a23] border-t border-[#39ff14]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t.about.whyChooseUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0f] border border-[#39ff14]/20 rounded-lg p-8 hover:border-[#39ff14] transition"
              >
                <h3 className="text-xl font-bold text-[#39ff14] mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
