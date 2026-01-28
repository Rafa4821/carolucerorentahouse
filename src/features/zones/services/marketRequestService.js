import { 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../../../services/firebase'

const COLLECTION_NAME = 'marketRequests'

export const marketRequestService = {
  async create(requestData) {
    try {
      const newRequest = {
        ...requestData,
        status: 'pending',
        createdAt: Timestamp.now()
      }
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newRequest)
      return docRef.id
    } catch (error) {
      console.error('Error creating market request:', error)
      throw error
    }
  },

  async getAll(filters = {}) {
    try {
      let q = query(collection(db, COLLECTION_NAME))
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status))
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
      console.error('Error getting market requests:', error)
      throw error
    }
  },

  async getRecent(limitCount = 10) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
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
      console.error('Error getting recent requests:', error)
      throw error
    }
  },

  async updateStatus(requestId, status) {
    try {
      const docRef = doc(db, COLLECTION_NAME, requestId)
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating request status:', error)
      throw error
    }
  },

  async delete(requestId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, requestId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting request:', error)
      throw error
    }
  }
}
