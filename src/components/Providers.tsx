'use client'
import { LanguageProvider } from '@/lib/language'
import { CurrencyProvider } from '@/lib/currency'
import { AuthProvider } from '@/lib/auth'
import { CartProvider } from '@/lib/cart'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  )
}
