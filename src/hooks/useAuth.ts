import { useState } from 'react'
import type { LoginCredentials, User } from '@/types/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!res.ok) throw new Error('Login failed')
      
      const data = await res.json()
      localStorage.setItem('token', data.token)
      setUser(data.user)
      return data.user
    } catch (err) {
      setError('Login failed')
      console.error('Error : ', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, login, logout, loading, error }
}