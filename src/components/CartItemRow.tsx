'use client';

import { CartItem } from '@/lib/cart';
import { useLanguage } from '@/lib/language';
import { useCurrency, formatPrice } from 'A/lib/currency';
import { useCart } from 'A/lib/cart';
import { translations } from '@/lib/translations';
import Image from 'next/image';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.gameId, item.serviceId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.gameId, item.serviceId);
  };

  const lineTotal = item.priceUSD * item.quantity;
  const t = translations[language];

  return (
    <div className="flex items-center gap-4 border-b border-border py-4">
      {/* Game Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.image}
          alt={language === 'ja' ? item.gameNameJa : item.gameName}
          width={60}
          height={60}
          className="rounded object-cover"
        />
      </div>

      {/* Game and Service Info */}
      <div className="flex-grow">
        <div className="font-semibold text-white">
          {language === 'ja' ? item.gameNameJa : item.gameName}
        </div>
        <div className="text-sm text-gray-300">
          {language === 'ja' ? item.serviceNameJa : item.serviceName}
        </div>
      </div>

      {/* Unit Price */}
      <div className="text-right">
        <div className="text-sm text-gray-400">
          {t.cart?.unitPrice || 'Unit Price'}
        </div>
        <div className="font-semibold text-white">
          {formatPrice(item.priceUSD, currency)}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 border border-border rounded px-2 py-1">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="text-primary hover:text-primary font-bold px-1"
          aria-label={t.cart?.decrease || 'Decrease quantity'}
        >
          −
        </button>
        <div className="w-8 text-center text-white font-semibold">
          {item.quantity}
        </div>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="text-primary hover:text-primary font-bold px-1"
          aria-label={t.cart?.increase || 'Increase quantity'}
        >
          +
        </button>
      </div>

      {/* Line Total */}
      <div className="text-right min-w-[100px]">
        <div className="text-sm text-gray-400">
          {t.cart?.total || 'Total'}
        </div>
        <div className="font-bold text-primary">
          {formatPrice(lineTotal, currency)}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 text-gray-400 hover:text-red-500 font-bold text-lg w-8 h-8 flex items-center justify-center"
        aria-label={t.cart?.remove || 'Remove item'}
      >
        ✕
      </button>
    </div>
  );
}
