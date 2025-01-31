import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
//import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const supabaseUrl = 'https://aptfnfaufyttucflsncf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdGZuZmF1Znl0dHVjZmxzbmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMzgzMzQsImV4cCI6MjA1MzkxNDMzNH0.VezKbCFDEoMS2tYVU-aLkmutNPX0sia-sgj60bwMlKU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Récupérer l'utilisateur
    const { data: user, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Vérifier le mot de passe
    if (password !== user.password) { // En production, utilisez bcrypt
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Créer le token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    )

    // Retourner le token et les infos utilisateur
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}