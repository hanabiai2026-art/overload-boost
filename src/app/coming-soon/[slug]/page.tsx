'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const comingSoonPages = {
  faq: {
    en: 'FAQ',
    ja: 'よくある質問',
  },
  blog: {
    en: 'Blog',
    ja: 'ブログ',
  },
  careers: {
    en: 'Work with Us',
    ja: '採用情報',
  },
  guarantees: {
    en: 'Guarantees',
    ja: '保証',
  },
}

export default function ComingSoonPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const params = useParams()
  const slug = params.slug as string

  const pageTitle = comingSoonPages[slug as keyof typeof comingSoonPages]

  if (!pageTitle) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
          <Link href="/" className="text-[#39ff14] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="mb-8 inline-flex">
          <div className="w-24 h-24 bg-gradient-to-br from-[#39ff14] to-[#f59e0b] rounded-full flex items-center justify-center">
            <div className="text-white text-4xl">🚀</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {pageTitle[language as 'en' | 'ja']}
        </h1>

        {/* Coming Soon Message */}
        <p className="text-xl text-gray-300 mb-4">
          {t.comingSoon.message}
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12">
          {language === 'en'
            ? 'We are working hard to bring you this exciting new feature. Stay tuned!'
            : '素晴らしい新機能をお持ちするために一生懸命取り組んでいます。楽しみにしていてください！'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#f59e0b] transition text-center"
          >
            {t.comingSoon.backHome}
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 border border-[#39ff14] text-[#39ff14] font-bold rounded-lg hover:bg-[#39ff14]/10 transition text-center"
          >
            {language === 'en' ? 'Notify Me' : 'お知らせください'}
          </Link>
        </div>

        {/* Coming Soon Graphic */}
        <div className="mt-16 inline-block">
          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-[#39ff14]/20 to-[#f59e0b]/20 rounded-full blur-3xl absolute inset-0"></div>
            <div className="relative z-10 w-64 h-64 bg-[#1a1a23] border border-[#39ff14]/20 rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#39ff14] text-lg font-bold mb-2">
                  {language === 'en' ? 'Coming Soon' : '近日公開'}
                </p>
                <p className="text-gray-400 text-sm">
                  {language === 'en'
                    ? 'Something amazing is brewing'
                    : '素晴らしいものが準備中'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
