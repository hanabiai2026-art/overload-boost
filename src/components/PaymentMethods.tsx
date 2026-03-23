'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/language';

export default function PaymentMethods() {
  const { language } = useLanguage();
  const t = translations[language];

  const methods = [
    { name: 'Visa', emoji: '💳' },
    { name: 'Mastercard', emoji: '💳' },
    { name: 'PayPal', emoji: '🅿️' },
    { name: 'Apple Pay', emoji: '🍎' },
    { name: 'Google Pay', emoji: '🔵' },
    { name: 'Stripe', emoji: '⚡' },
  ];

  return (
    <div className="w-full py-8 px-6 bg-[#13131a] border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <p className="text-center text-gray-400 text-sm mb-6 font-semibold uppercase tracking-wide">
          {t.payment.title}
        </p>

        {/* Payment Methods Row */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {methods.map((method) => (
            <div
              key={method.name}
              className="px-4 py-2 rounded-full bg-[#1a1a2e] border border-gray-700 hover:border-[#39ff14] transition-colors duration-300 flex items-center gap-2"
            >
              <span className="text-lg">{method.emoji}</span>
              <span className="text-gray-300 text-sm font-medium">{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
