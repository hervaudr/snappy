import { createClient } from '@supabase/supabase-js'
//import { Database } from '@/types/supabase'

const supabaseUrl = 'https://aptfnfaufyttucflsncf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdGZuZmF1Znl0dHVjZmxzbmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMzgzMzQsImV4cCI6MjA1MzkxNDMzNH0.VezKbCFDEoMS2tYVU-aLkmutNPX0sia-sgj60bwMlKU'

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
  )
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)