import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface SignInResponse {
  user: User | null
  error: Error | null
}

export const signIn = async (email: string, password: string): Promise<SignInResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error as Error }
    }

    return { user: data.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error: error ? (error as Error) : null }
  } catch (error) {
    return { error: error as Error }
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
}
