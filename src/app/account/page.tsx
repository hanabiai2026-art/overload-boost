'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AccountPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { isAuthenticated, user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/signin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t.auth.welcome.replace('{name}', user.name || user.email)}
          </h1>
          <p className="text-gray-300">{language === 'ja' ? 'アカウントを管理します' : 'Manage your account'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Orders Section */}
            <div className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">{t.auth.myOrders}</h2>
              <div className="text-center py-12">
                <p className="text-gray-400">{t.auth.noOrders}</p>
                <Link
                  href="/"
                  className="inline-block mt-6 px-6 py-2 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#f59e0b] transition"
                >
                  {language === 'ja' ? 'サービスを見る' : 'Browse Services'}
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-[#1a1a23] border border-[#39ff14]/20 rounded-lg p-8">
              <h2 className="text-xl font-bold text-white mb-6">{t.auth.profile}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">{t.auth.name}</p>
                  <p className="text-white font-semibold">{user.name || (language === 'ja' ? '未設定' : 'Not set')}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t.auth.email}</p>
                  <p className="text-white font-semibold">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
            >
              {t.auth.signOut}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
