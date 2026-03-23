'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import { useCart } from '@/lib/cart'
import { useCurrency } from '@/lib/currency'
import { formatPrice } from '@/lib/currency'
import Link from 'next/link'
import CheckoutForm from '@/components/CheckoutForm'

export default function CheckoutPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { items, totalPriceUSD } = useCart()
  const { currency } = useCurrency()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {language === 'ja' ? 'カートは空です' : 'Your cart is empty'}
          </h1>
          <p className="text-gray-300 mb-8">
            {language === 'ja' ? 'チェックアウト前にアイテムを追加してください。' : 'Add items before proceeding to checkout.'}
          </p>
          <Link href="/cart" className="inline-block px-8 py-3 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#f59e0b] transition">
            {language === 'ja' ? 'カートに戻る' : 'Back to Cart'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">{t.checkout.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg p-8 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">{t.checkout.orderSummary}</h2>
              <div className="space-y-4 mb-8 pb-8 border-b border-[#39ff14]/20">
                {items.map((item) => (
                  <div key={`${item.gameId}-${item.serviceId}`} className="flex justify-between text-gray-300">
                    <span>
                      {language === 'ja' ? item.serviceNameJa : item.serviceName}
                    </span>
                    <span className="text-[#39ff14]">{formatPrice(item.priceUSD, currency)}</span>
                  </div>
                ))}
              </div>
              <div className="text-lg font-bold text-white">
                <div className="flex justify-between">
                  <span>{t.checkout.total}</span>
                  <span className="text-[#39ff14]">{formatPrice(totalPriceUSD, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
