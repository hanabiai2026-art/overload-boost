'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/language';

export default function HowItWorks() {
  const { language } = useLanguage();
  const t = translations[language];

  const steps = [
    {
      number: 1,
      name: t.howItWorks.step1Name,
      description: t.howItWorks.step1Description,
    },
    {
      number: 2,
      name: t.howItWorks.step2Name,
      description: t.howItWorks.step2Description,
    },
    {
      number: 3,
      name: t.howItWorks.step3Name,
      description: t.howItWorks.step3Description,
    },
    {
      number: 4,
      name: t.howItWorks.step4Name,
      description: t.howItWorks.step4Description,
    },
  ];

  return (
    <div className="w-full py-16 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
          {t.howItWorks.title}
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#13131a] rounded-xl p-6 border border-gray-800 hover:border-[#39ff14] transition-colors duration-300 flex flex-col"
            >
              {/* Step Number Circle */}
              <div className="mb-6 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#39ff14] flex items-center justify-center">
                  <span className="text-black font-extrabold text-lg">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step Name */}
              <h3 className="text-xl font-bold text-white mb-3">{step.name}</h3>

              {/* Step Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
