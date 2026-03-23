'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/language';

export default function ChatWidget() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#39ff14] text-black shadow-lg hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label={t.chat?.ariaLabel || 'Chat with us'}
      >
        {/* Chat Bubble SVG Icon */}
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8l-2 2V4h14v12z" />
        </svg>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#13131a] border border-[#39ff14] rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">
              {t.chat?.title || 'Chat with us'}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-[#39ff14] transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            {t.chat?.message || 'How can we help you today?'}
          </p>
          <input
            type="text"
            placeholder={t.chat?.placeholder || 'Type your message...'}
            className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#39ff14] transition-colors text-sm"
          />
        </div>
      )}
    </>
  );
}
