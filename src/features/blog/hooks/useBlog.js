import { useState, useEffect } from 'react'
import { blogService } from '../services/blogService'

export function useBlogPosts(filters = {}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPosts()
  }, [JSON.stringify(filters)])

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await blogService.getAll(filters)
      setPosts(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  return { posts, loading, error, refetch: loadPosts }
}

export function useBlogPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    loadPost()
  }, [slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await blogService.getBySlug(slug)
      setPost(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading blog post:', err)
    } finally {
      setLoading(false)
    }
  }

  return { post, loading, error, refetch: loadPost }
}
