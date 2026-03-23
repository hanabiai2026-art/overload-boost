'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/language';

export default function TrustBadges() {
  const { language } = useLanguage();
  const t = translations[language];

  const badges = [
    {
      icon: '📦',
      key: 'fastOrders',
      label: t.trust.fastOrders,
    },
    {
      icon: '🎧',
      key: 'support',
      label: t.trust.support,
    },
    {
      icon: '🔒',
      key: 'secure',
      label: t.trust.secure,
    },
    {
      icon: '💰',
      key: 'guarantee',
      label: t.trust.guarantee,
    },
  ];

  return (
    <div className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {badges.map((badge) => (
            <div
              key={badge.key}
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-700 bg-[#13131a] hover:border-[#39ff14] transition-colors duration-300"
            >
              <span className="text-4xl">{badge.icon}</span>
              <span className="text-center text-gray-100 font-semibold text-sm">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
