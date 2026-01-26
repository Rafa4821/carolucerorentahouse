import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../../../services/firebase'

const COLLECTION_NAME = 'zones'

export const zoneService = {
  async getAll() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('name', 'asc')
      )
      
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting zones:', error)
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
          ...docSnap.data()
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting zone:', error)
      throw error
    }
  },

  async getByName(name) {
    try {
      const zones = await this.getAll()
      return zones.find(zone => 
        zone.name.toLowerCase() === name.toLowerCase()
      )
    } catch (error) {
      console.error('Error getting zone by name:', error)
      throw error
    }
  },

  async create(zoneData) {
    try {
      const newZone = {
        ...zoneData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newZone)
      return docRef.id
    } catch (error) {
      console.error('Error creating zone:', error)
      throw error
    }
  },

  async update(id, zoneData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await updateDoc(docRef, {
        ...zoneData,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating zone:', error)
      throw error
    }
  },

  async delete(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting zone:', error)
      throw error
    }
  }
}
