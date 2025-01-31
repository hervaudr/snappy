export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: string
          first_name: string
          last_name: string
        }
        Insert: {
          id?: string
          email: string
          role?: string
          first_name?: string
          last_name?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          first_name?: string
          last_name?: string
        }
      }
    }
  }
}