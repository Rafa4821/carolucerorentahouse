import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../../../services/firebase'
import { slugify } from '../../../utils/formatters'
import { storageService } from '../../../services/storageService'

const COLLECTION_NAME = 'blogPosts'

export const blogService = {
  async getAll(filters = {}) {
    try {
      let q = query(collection(db, COLLECTION_NAME))
      
      if (filters.published !== undefined) {
        q = query(q, where('published', '==', filters.published))
      }
      
      q = query(q, orderBy('createdAt', 'desc'))
      
      if (filters.limit) {
        q = query(q, limit(Number(filters.limit)))
      }
      
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }))
    } catch (error) {
      console.error('Error getting blog posts:', error)
      throw error
    }
  },

  async getById(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate()
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting blog post:', error)
      throw error
    }
  },

  async getBySlug(slug) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('slug', '==', slug),
        limit(1)
      )
      
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting blog post by slug:', error)
      throw error
    }
  },

  async getRecent(limitCount = 6) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )
      
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }))
    } catch (error) {
      console.error('Error getting recent posts:', error)
      return []
    }
  },

  async create(postData) {
    try {
      const slug = postData.slug || slugify(postData.title)
      
      const newPost = {
        ...postData,
        slug,
        published: postData.published || false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newPost)
      return docRef.id
    } catch (error) {
      console.error('Error creating blog post:', error)
      throw error
    }
  },

  async update(id, postData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      
      const updates = {
        ...postData,
        updatedAt: Timestamp.now()
      }
      
      if (postData.title && !postData.slug) {
        updates.slug = slugify(postData.title)
      }
      
      await updateDoc(docRef, updates)
    } catch (error) {
      console.error('Error updating blog post:', error)
      throw error
    }
  },

  async delete(id) {
    try {
      // Primero obtener el post para acceder a su imagen
      const post = await this.getById(id)
      
      // Eliminar la imagen del Storage si existe
      if (post && post.image) {
        await storageService.deleteImage(post.image)
      }
      
      // Luego eliminar el documento de Firestore
      const docRef = doc(db, COLLECTION_NAME, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }
  }
}
