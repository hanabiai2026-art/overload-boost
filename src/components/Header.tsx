'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { translations } from '@/lib/translations';
import { games } from '@/lib/data';
import CurrencyDropdown from './CurrencyDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import CartIcon from './CartIcon';

export default function Header() {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [gamesDropdownOpen, setGamesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language];

  return (
    <header className="fixed top-0 z-50 w-full bg-[#1a1a2e] border-b border-border">
      <div className="max-w-full px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-[#39ff14]">OVERLOAD</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {/* Games Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGamesDropdownOpen(!gamesDropdownOpen)}
                className="flex items-center gap-2 text-white hover:text-[#39ff14] transition"
              >
                {t.header.games}
                <span className="text-xs">▼</span>
              </button>
              {gamesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#1a1a2e] border border-border rounded-lg shadow-lg z-50">
                  {games.map((game) => (
                    <Link
                      key={game.slug}
                      href={`/${game.slug}`}
                      className="block px-4 py-2 text-white hover:text-[#39ff14] hover:bg-[#252542] transition border-b last:border-b-0"
                      onClick={() => setGamesDropdownOpen(false)}
                    >
                      {language === 'ja' ? game.nameJa : game.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="w-full px-4 py-2 bg-[#252542] border border-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#39ff14] transition"
              />
            </div>

            {/* Right Side Icons/Controls */}
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <CartIcon />

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Currency Dropdown */}
              <CurrencyDropdown />

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/account/signin"
                    className="text-white hover:text-[#39ff14] transition"
                  >
                    {t.header.logIn}
                  </Link>
                  <Link
                    href="/account/signup"
                    className="px-4 py-2 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#2eff00] transition"
                  >
                    {t.header.signUp}
                  </Link>
                </>
              ) : (
                <Link
                  href="/account"
                  className="w-10 h-10 bg-[#39ff14] rounded-full flex items-center justify-center text-black font-bold hover:bg-[#2eff00] transition"
                  title={user?.name || 'Account'}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-[#39ff14] transition"
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3">
            {/* Games */}
            <div className="space-y-2">
              <button
                onClick={() => setGamesDropdownOpen(!gamesDropdownOpen)}
                className="w-full text-left px-2 py-2 text-white hover:text-[#39ff14] font-semibold transition"
              >
                {t.header.games} ▼
              </button>
              {gamesDropdownOpen && (
                <div className="pl-4 space-y-2">
                  {games.map((game) => (
                    <Link
                      key={game.slug}
                      href={`/${game.slug}`}
                      className="block px-2 py-1 text-white hover:text-[#39ff14] transition"
                      onClick={() => {
                        setGamesDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {language === 'ja' ? game.nameJa : game.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder={t.header.searchPlaceholder}
              className="w-full px-4 py-2 bg-[#252542] border border-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#39ff14] transition"
            />

            {/* Cart */}
            <Link
              href="/cart"
              className="block px-2 py-2 text-white hover:text-[#39ff14] transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              🛒 {t.header.cart}
            </Link>

            {/* Language & Currency */}
            <div className="flex gap-4 px-2">
              <LanguageSwitcher />
              <CurrencyDropdown />
            </div>

            {/* Auth */}
            {!isAuthenticated ? (
              <div className="space-y-2 pt-2">
                <Link
                  href="/account/signin"
                  className="block px-4 py-2 text-white hover:text-[#39ff14] transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.header.logIn}
                </Link>
                <Link
                  href="/account/signup"
                  className="block px-4 py-2 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#2eff00] transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.header.signUp}
                </Link>
              </div>
            ) : (
              <Link
                href="/account"
                className="block px-2 py-2 text-white hover:text-[#39ff14] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {user?.name || 'Account'}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
