import { useState, useEffect } from 'react'
import { zoneService } from '../services/zoneService'

export function useZones() {
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadZones()
  }, [])

  const loadZones = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await zoneService.getAll()
      setZones(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading zones:', err)
    } finally {
      setLoading(false)
    }
  }

  return { zones, loading, error, refetch: loadZones }
}
