'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language'
import { useAuth } from '@/lib/auth'
import { translations } from '@/lib/translations'
import Link from 'next/link'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { language } = useLanguage()
  const { signIn, signUp } = useAuth()
  const router = useRouter()
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(language === 'ja' ? 'メールアドレスが無効です' : 'Please enter a valid email address')
      return
    }

    if (!password || password.length < 8) {
      setError(language === 'ja' ? 'パスワードは8文字以上必要です' : 'Password must be at least 8 characters')
      return
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError(language === 'ja' ? '名前を入力してください' : 'Please enter your name')
        return
      }
      if (password !== confirmPassword) {
        setError(language === 'ja' ? 'パスワードが一致しません' : 'Passwords do not match')
        return
      }
      const success = signUp(name, email, password)
      if (success) {
        router.push('/account')
      } else {
        setError(language === 'ja' ? '登録に失敗しました' : 'Sign up failed. Please try again.')
      }
    } else {
      const success = signIn(email, password)
      if (success) {
        router.push('/account')
      } else {
        setError(language === 'ja' ? 'ログインに失敗しました' : 'Invalid email or password.')
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface border border-border rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {mode === 'signin' ? t.auth.signIn : t.auth.signUp}
        </h1>
        <p className="text-text-secondary mb-6">
          {mode === 'signin'
            ? (language === 'ja' ? 'おかえりなさい' : 'Welcome back to Overload')
            : (language === 'ja' ? 'Overloadに参加しよう' : 'Join Overload today')}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {showForgotPassword && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mb-6 text-primary text-sm">
            {t.auth.contactSupport.replace('{email}', 'contact@overload.com')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t.auth.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.auth.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.auth.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
            />
            {mode === 'signin' && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(!showForgotPassword)}
                className="text-primary text-sm mt-1 hover:underline"
              >
                {t.auth.forgotPassword}
              </button>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t.auth.confirmPassword}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
              />
            </div>
          )}

          {mode === 'signin' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-background accent-primary"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-text-secondary">
                {t.auth.rememberMe}
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:brightness-110 transition mt-2"
          >
            {mode === 'signin' ? t.auth.signIn : t.auth.signUp}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          {mode === 'signup' ? t.auth.hasAccount : t.auth.noAccount}{' '}
          <Link
            href={mode === 'signup' ? '/account/signin' : '/account/signup'}
            className="text-primary hover:underline font-medium"
          >
            {mode === 'signup' ? t.auth.signIn : t.auth.signUp}
          </Link>
        </div>
      </div>
    </div>
  )
}
