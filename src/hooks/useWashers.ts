import { useState, useEffect } from 'react'
import { getWashers } from '../services/washers'
import type { Washer } from '../types/washer'

export const useWashers = () => {
  const [washers, setWashers] = useState<Washer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWashers()
  }, [])

  const fetchWashers = async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await getWashers()

    if (fetchError) {
      setError(fetchError.message || 'Error al cargar lavadoras')
      setLoading(false)
      return
    }

    setWashers(data || [])
    setLoading(false)
  }

  return {
    washers,
    loading,
    error,
    refetch: fetchWashers,
  }
}
