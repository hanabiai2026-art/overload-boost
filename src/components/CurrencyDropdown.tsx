'use client';

import { useState } from 'react';
import { useCurrency } from '@/lib/currency';

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currencyOptions = [
    { code: 'USD', symbol: '$' },
    { code: 'JPY', symbol: '¥' },
  ];

  const currentCurrency = currencyOptions.find((c) => c.code === currency);

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#39ff14] transition text-sm font-medium"
      >
        <span>{currentCurrency?.symbol}</span>
        <span>{currentCurrency?.code}</span>
        <span className="text-xs">▼</span>
      </button>
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 bg-[#1a1a2e] border border-border rounded-lg shadow-lg z-50 min-w-[120px]">
          {currencyOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => handleCurrencyChange(option.code)}
              className={`block w-full text-left px-4 py-2 transition border-b last:border-b-0 ${
                currency === option.code
                  ? 'bg-[#39ff14] text-black font-bold'
                  : 'text-white hover:bg-[#252542] hover:text-[#39ff14]'
              }`}
            >
              {option.symbol} {option.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
