'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import { games } from '@/lib/data'

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: '📷' },
    { name: 'Facebook', icon: '👍' },
    { name: 'X', icon: '𝕏' },
    { name: 'YouTube', icon: '►️' },
    { name: 'TikTok', icon: '♪' },
  ]

  // Payment methods
  const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay']

  // Get footer text with year replacement
  const disclaimerText = translations[language].footer.disclaimer
  const copyrightText = translations[language].footer.copyright.replace('{year}', currentYear.toString())
  const addressText = translations[language].footer.address

  return (
    <footer className="bg-[#13131a] border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Column 1: Company */}
          <div>
            <h4 className="text-[#39ff14] font-bold mb-4 text-sm uppercase tracking-wider">
              {translations[language].footer.company}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#39ff14] transition-colors">
                  {translations[language].footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#39ff14] transition-colors">
                  {translations[language].footer.contactUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon/blog"
                  target="_blank"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.blog}
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon/careers"
                  target="_blank"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.workWithUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon/guarantees"
                  target="_blank"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.guarantees}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Policies */}
          <div>
            <h4 className="text-[#39ff14] font-bold mb-4 text-sm uppercase tracking-wider">
              {translations[language].footer.legal}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/policy/terms"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/privacy"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/refund"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.refund}
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/delivery"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.delivery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-[#39ff14] font-bold mb-4 text-sm uppercase tracking-wider">
              {translations[language].footer.customerService}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/coming-soon/faq"
                  target="_blank"
                  className="text-gray-300 hover:text-[#39ff14] transition-colors"
                >
                  {translations[language].footer.faq}
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-[#39ff14] transition-colors">
                  {translations[language].footer.howItWorks}
                </a>
              </li>
            </ul>
          </div>

          {/* Game Links Columns (up to 3 games) */}
          {games.slice(0, 3).map((game) => (
            <div key={game.id}>
              <h4 className="text-[#39ff14] font-bold mb-4 text-sm uppercase tracking-wider">
                {language === 'ja' ? game.nameJa : game.name}
              </h4>
              <ul className="space-y-3">
                {game.services.slice(0, 3).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/${game.slug}`}
                      className="text-gray-300 hover:text-[#39ff14] transition-colors text-sm"
                    >
                      {language === 'ja' ? service.nameJa : service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href="/coming-soon/social"
              className="text-2xl hover:text-[#39ff14] transition-colors transform hover:scale-110"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {paymentMethods.map((method) => (
            <span key={method} className="text-xs text-gray-400 px-2 py-1 border border-border/30 rounded">
              {method}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mb-4">
          {disclaimerText}
        </p>

        {/* Copyright and Address */}
        <div className="text-center border-t border-border pt-6 space-y-2">
          <p className="text-xs text-gray-400">
            {copyrightText}
          </p>
          <p className="text-xs text-gray-500">
            {addressText}
          </p>
        </div>
      </div>
    </footer>
  )
}
