import { useState, useEffect } from 'react'
import { signIn, signOut, getCurrentUser, onAuthStateChange } from '../services/auth'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Obtener usuario actual al montar
    getCurrentUser().then((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Escuchar cambios de autenticación
    const { data: { subscription } } = onAuthStateChange((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    const { user: signedInUser, error: signInError } = await signIn(email, password)
    
    if (signInError) {
      setError(signInError.message || 'Error al iniciar sesión')
      setLoading(false)
      return { success: false, error: signInError.message }
    }

    setUser(signedInUser)
    setLoading(false)
    return { success: true, error: null }
  }

  const handleSignOut = async () => {
    setLoading(true)
    setError(null)
    
    const { error: signOutError } = await signOut()
    
    if (signOutError) {
      setError(signOutError.message || 'Error al cerrar sesión')
      setLoading(false)
      return { success: false, error: signOutError.message }
    }

    setUser(null)
    setLoading(false)
    return { success: true, error: null }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signIn: handleSignIn,
    signOut: handleSignOut,
  }
}
