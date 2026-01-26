import { useState, useEffect } from 'react'
import { propertyService } from '../services/propertyService'

export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProperties()
  }, [JSON.stringify(filters)])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getAll(filters)
      setProperties(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading properties:', err)
    } finally {
      setLoading(false)
    }
  }

  return { properties, loading, error, refetch: loadProperties }
}

export function useProperty(id) {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getById(id)
      setProperty(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading property:', err)
    } finally {
      setLoading(false)
    }
  }

  return { property, loading, error, refetch: loadProperty }
}
