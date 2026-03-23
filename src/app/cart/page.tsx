'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import { useCart } from '@/lib/cart'
import { useCurrency } from '@/lib/currency'
import { formatPrice } from '@/lib/currency'
import Link from 'next/link'
import CartItemRow from '@/components/CartItemRow'

export default function CartPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { items, totalPriceUSD } = useCart()
  const { currency } = useCurrency()

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">{t.cart.title}</h1>

        {items.length === 0 ? (
          <div className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg p-12 text-center">
            <p className="text-gray-300 mb-8">{t.cart.empty}</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#f59e0b] transition"
            >
              {t.cart.browseServices}
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg overflow-hidden">
              <div className="bg-[#0a0a0f] border-b border-[#39ff14]/20 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm font-semibold">
                  <div className="col-span-5">{t.cart.service}</div>
                  <div className="col-span-2 text-center">{t.cart.qty}</div>
                  <div className="col-span-2 text-right">{t.cart.price}</div>
                  <div className="col-span-3 text-right">{t.cart.total}</div>
                </div>
              </div>
              <div className="divide-y divide-[#39ff14]/10">
                {items.map((item) => (
                  <CartItemRow key={`${item.gameId}-${item.serviceId}`} item={item} />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="flex flex-col md:flex-row md:justify-end gap-8">
              <div className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg p-8 w-full md:w-96">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-300">
                    <span>{t.cart.subtotal}</span>
                    <span>{formatPrice(totalPriceUSD, currency)}</span>
                  </div>
                  <div className="border-t border-[#39ff14]/20 pt-4 flex justify-between text-white text-lg font-bold">
                    <span>{t.cart.total}</span>
                    <span className="text-[#39ff14]">{formatPrice(totalPriceUSD, currency)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full px-8 py-4 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#f59e0b] transition text-center mb-4"
                >
                  {t.cart.proceedToCheckout}
                </Link>
                <Link
                  href="/"
                  className="block w-full px-8 py-4 border border-[#39ff14] text-[#39ff14] font-bold rounded-lg hover:bg-[#39ff14]/10 transition text-center"
                >
                  {t.cart.continueShopping}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
