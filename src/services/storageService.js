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
      // Si es una URL completa de Firebase Storage, extraer el path
      if (imageUrl.includes('firebase')) {
        const url = new URL(imageUrl)
        const pathStart = url.pathname.indexOf('/o/') + 3
        const pathEnd = url.pathname.indexOf('?')
        const fullPath = decodeURIComponent(
          pathEnd > 0 ? url.pathname.substring(pathStart, pathEnd) : url.pathname.substring(pathStart)
        )
        const imageRef = ref(storage, fullPath)
        await deleteObject(imageRef)
      } else {
        // Si es un path directo
        const imageRef = ref(storage, imageUrl)
        await deleteObject(imageRef)
      }
    } catch (error) {
      // No lanzar error si la imagen no existe
      if (error.code !== 'storage/object-not-found') {
        console.error('Error deleting image:', error)
      }
    }
  },

  async deleteMultipleImages(imageUrls) {
    try {
      const deletePromises = imageUrls.map(url => this.deleteImage(url))
      await Promise.all(deletePromises)
    } catch (error) {
      console.error('Error deleting multiple images:', error)
      // No lanzar error para no interrumpir la eliminación del documento
    }
  }
}
