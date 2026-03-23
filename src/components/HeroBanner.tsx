'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/language';

export default function HeroBanner() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full overflow-hidden">
      {/* Background with gradient and pattern */}
      <div
        className="relative w-full py-20 md:py-32"
        style={{
          background: `linear-gradient(135deg, #0a0a0f 0%, transparent 100%)`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #39ff14 35px, #39ff14 70px)`,
          }}
        />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            {t.hero.headline.split('OVERLOAD').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-[#39ff14]">OVERLOAD</span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* CTA Button */}
          <button className="bg-[#39ff14] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#2ee00a] transition-colors duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] mb-12">
            {t.hero.cta}
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#f59e0b] text-xl">
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-300 text-sm">{t.hero.trustBadge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
