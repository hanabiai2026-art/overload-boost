'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => boolean
  signUp: (name: string, email: string, password: string) => boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: () => false,
  signUp: () => false,
  signOut: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (email: string, password: string): boolean => {
    // Simulated: accept any email/password with basic validation
    if (!email || !password || password.length < 8) return false
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
    return true
  }

  const signUp = (name: string, email: string, password: string): boolean => {
    if (!name || !email || !password || password.length < 8) return false
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
    return true
  }

  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
