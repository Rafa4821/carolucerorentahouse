import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'
import { optimizeImage, validateImageFile } from '../utils/imageOptimizer'

export const storageService = {
  async uploadImage(file, folder = 'images', optimize = true) {
    try {
      // Validate image file
      validateImageFile(file)

      // Optimize image before upload
      let fileToUpload = file
      if (optimize) {
        fileToUpload = await optimizeImage(file, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.85,
          outputFormat: 'image/webp'
        })
      }

      const timestamp = Date.now()
      const filename = `${timestamp}_${file.name.replace(/\.[^/.]+$/, '.webp')}`
      const storageRef = ref(storage, `${folder}/${filename}`)
      
      const snapshot = await uploadBytes(storageRef, fileToUpload)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  async uploadMultipleImages(files, folder = 'properties', optimize = true) {
    try {
      const uploadPromises = Array.from(files).map(file => 
        this.uploadImage(file, folder, optimize)
      )
      
      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Error uploading multiple images:', error)
      throw error
    }
  },

  async deleteImage(imageUrl) {
    try {
      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
}
