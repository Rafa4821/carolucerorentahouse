import { 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../../../services/firebase'

const COLLECTION_NAME = 'contactMessages'

export const contactService = {
  async create(contactData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...contactData,
        status: 'pending',
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating contact message:', error)
      throw error
    }
  },

  async getAll() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }))
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      throw error
    }
  },

  async updateStatus(messageId, status) {
    try {
      const docRef = doc(db, COLLECTION_NAME, messageId)
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating message status:', error)
      throw error
    }
  },

  async delete(messageId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, messageId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  }
}
