'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JA' },
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#39ff14] transition text-sm font-medium"
      >
        <span>🌐</span>
        <span>{languages.find((l) => l.code === language)?.label}</span>
        <span className="text-xs">▼</span>
      </button>
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 bg-[#1a1a2e] border border-border rounded-lg shadow-lg z-50 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-2 transition border-b last:border-b-0 ${
                language === lang.code
                  ? 'bg-[#39ff14] text-black font-bold'
                  : 'text-white hover:bg-[#252542] hover:text-[#39ff14]'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
