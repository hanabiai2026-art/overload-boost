'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { useCurrency, formatPrice } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { translations } from '@/lib/translations';
import Image from 'next/image';

interface FormData {
  fullName: string;
  email: string;
  username: string;
  instructions: string;
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
}

export default function CheckoutForm() {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: user?.name || '',
    email: user?.email || '',
    username: '',
    instructions: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const t = translations[language];
  const checkoutT = t.checkout || {};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: 'card' | 'paypal') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const generateOrderReference = () => {
    const prefix = 'OVR';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const ref = generateOrderReference();
      setOrderRef(ref);
      setIsSuccess(true);
      clearCart();

      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          fullName: user?.name || '',
          email: user?.email || '',
          username: '',
          instructions: '',
          paymentMethod: 'card',
          cardNumber: '',
          cardExpiry: '',
          cardCVV: '',
        });
        setIsSuccess(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotal = items.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

  if (isSuccess) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          {checkoutT.successTitle || 'Order Confirmed'}
        </h2>
        <p className="text-gray-300 mb-4">
          {checkoutT.successMessage || 'Thank you for your order!'}
        </p>
        <div className="bg-black/50 border border-primary/30 rounded p-4 mb-4">
          <div className="text-sm text-gray-400">
            {checkoutT.orderReference || 'Order Reference'}
          </div>
          <div className="text-xl font-bold text-primary font-mono">{orderRef}</div>
        </div>
        <p className="text-sm text-gray-400">
          {checkoutT.confirmationEmail || 'Confirmation email sent to'} {formData.email}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Order Summary */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          {checkoutT.orderSummary || 'Order Summary'}
        </h2>

        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          {items.map(item => (
            <div key={`${item.gameId}-${item.serviceId}`} className="flex justify-between items-start gap-4 pb-4 border-b border-border last:border-b-0">
              <div className="flex-grow">
                <div className="font-semibold text-white">
                  {language === 'ja' ? item.gameNameJa : item.gameName}
                </div>
                <div className="text-sm text-gray-400">
                  {language === 'ja' ? item.serviceNameJa : item.serviceName}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {checkoutT.qty || 'Qty'}: {item.quantity} × {formatPrice(item.priceUSD, currency)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">
                  {formatPrice(item.priceUSD * item.quantity, currency)}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-primary/30">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-white">{checkoutT.total || 'Total'}:</span>
              <span className="text-primary">{formatPrice(cartTotal, currency)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Customer Information Form */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          {checkoutT.customerInfo || 'Customer Information'}
        </h2>

        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {checkoutT.fullName || 'Full Name'}
              <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
              placeholder={checkoutT.fullNamePlaceholder || 'John Doe'}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {checkoutT.email || 'Email Address'}
              <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
              placeholder={checkoutT.emailPlaceholder || 'john@example.com'}
            />
          </div>

          {/* Game Account / Username */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {checkoutT.gameUsername || 'Game Account / Username'}
              <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
              placeholder={checkoutT.gameUsernamePlaceholder || 'your_username'}
            />
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {checkoutT.specialInstructions || 'Special Instructions'}
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
              rows={3}
              placeholder={checkoutT.specialInstructionsPlaceholder || 'Any special requests...'}
            />
          </div>

          {/* Payment Method Selector */}
          <div className="pt-4">
            <label className="block text-sm font-semibold text-white mb-3">
              {checkoutT.paymentMethod || 'Payment Method'}
              <span className="text-primary">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('card')}
                className={`flex-1 py-2 rounded font-semibold transition ${
                  formData.paymentMethod === 'card'
                    ? 'bg-primary text-black border border-primary'
                    : 'bg-black/50 text-white border border-border hover:border-primary'
                }`}
              >
                {checkoutT.creditCard || 'Credit Card'}
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`flex-1 py-2 rounded font-semibold transition ${
                  formData.paymentMethod === 'paypal'
                    ? 'bg-primary text-black border border-primary'
                    : 'bg-black/50 text-white border border-border hover:border-primary'
                }`}
              >
                {checkoutT.paypal || 'PayPal'}
              </button>
            </div>
          </div>

          {/* Card Fields */}
          {formData.paymentMethod === 'card' && (
            <div className="space-y-3 pt-2 border-t border-border">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {checkoutT.cardNumber || 'Card Number'}
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                  maxLength={19}
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    {checkoutT.expiry || 'Expiry'}
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    {checkoutT.cvv || 'CVV'}
                  </label>
                  <input
                    type="text"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full bg-black/50 border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-black font-bold py-3 rounded mt-6 hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? checkoutT.processing || 'Processing...'
              : checkoutT.placeOrder || 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
