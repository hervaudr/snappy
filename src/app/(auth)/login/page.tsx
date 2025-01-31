/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

import { LoginCredentials } from '@/types/auth'

import { Button} from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const { login, error } = useAuth()
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('FormData', formData.get('email'))
    const credentials: LoginCredentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    
    const user = await login(credentials)
    if (user) router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">Connexion</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              name='email'
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <Input
              type="password"
              name='password'
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Se connecter
          </Button>
          
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}