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

const COLLECTION_NAME = 'properties'

export const propertyService = {
  async getAll(filters = {}) {
    try {
      let q = query(collection(db, COLLECTION_NAME))
      
      if (filters.type) {
        q = query(q, where('type', '==', filters.type))
      }
      
      if (filters.operation) {
        q = query(q, where('operation', '==', filters.operation))
      }
      
      if (filters.city) {
        q = query(q, where('city', '==', filters.city))
      }
      
      if (filters.zone) {
        q = query(q, where('zone', '==', filters.zone))
      }
      
      if (filters.minPrice) {
        q = query(q, where('price', '>=', Number(filters.minPrice)))
      }
      
      if (filters.maxPrice) {
        q = query(q, where('price', '<=', Number(filters.maxPrice)))
      }
      
      if (filters.bedrooms) {
        q = query(q, where('bedrooms', '>=', Number(filters.bedrooms)))
      }
      
      if (filters.bathrooms) {
        q = query(q, where('bathrooms', '>=', Number(filters.bathrooms)))
      }
      
      q = query(q, orderBy('createdAt', 'desc'))
      
      if (filters.limit) {
        q = query(q, limit(Number(filters.limit)))
      }
      
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }))
    } catch (error) {
      console.error('Error getting properties:', error)
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
          createdAt: docSnap.data().createdAt?.toDate()
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting property:', error)
      throw error
    }
  },

  async getByCode(code) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('code', '==', code),
        limit(1)
      )
      
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting property by code:', error)
      throw error
    }
  },

  async create(propertyData) {
    try {
      const newProperty = {
        ...propertyData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newProperty)
      return docRef.id
    } catch (error) {
      console.error('Error creating property:', error)
      throw error
    }
  },

  async update(id, propertyData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await updateDoc(docRef, {
        ...propertyData,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  },

  async delete(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  },

  async getFeatured(limitCount = 6) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('featured', '==', true),
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
      console.error('Error getting featured properties:', error)
      return []
    }
  },

  generateCode() {
    const prefix = 'PROP'
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}-${timestamp}-${random}`
  }
}
