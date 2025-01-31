/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const { login, error } = useAuth()
  const router = useRouter()
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const credentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    
    const user = await login(credentials)
    if (user) router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  )
}