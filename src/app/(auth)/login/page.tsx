'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        console.log('ERROR : ', error)
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      console.log('ERR : ', err)
      setError('Une erreur est survenue')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <Input 
            type="email" 
            placeholder="Email" 
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          <Input 
            type="password" 
            placeholder="Mot de passe" 
            {...register('password')}
            className={errors.password ? 'border-red-500' : ''}
          />
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  )
}