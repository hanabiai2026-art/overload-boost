'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import AuthForm from '@/components/AuthForm'

export default function SignInPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">{t.auth.signIn}</h1>
          <p className="text-gray-400">{t.auth.signInSubtitle}</p>
        </div>

        <AuthForm mode="signin" />
      </div>
    </div>
  )
}
