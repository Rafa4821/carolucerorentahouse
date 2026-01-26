export const optimizeImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.85,
      outputFormat = 'image/webp'
    } = options

    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions maintaining aspect ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create new file with optimized image
              const optimizedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, '.webp'),
                { type: outputFormat }
              )
              resolve(optimizedFile)
            } else {
              reject(new Error('Error al optimizar la imagen'))
            }
          },
          outputFormat,
          quality
        )
      }

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'))
      }

      img.src = e.target.result
    }

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'))
    }

    reader.readAsDataURL(file)
  })
}

export const createThumbnail = (file, options = {}) => {
  const {
    maxWidth = 400,
    maxHeight = 300,
    quality = 0.75
  } = options

  return optimizeImage(file, { maxWidth, maxHeight, quality })
}

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height
        })
      }

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'))
      }

      img.src = e.target.result
    }

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'))
    }

    reader.readAsDataURL(file)
  })
}

export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Formato de imagen no válido. Solo se permiten JPG, PNG y WebP.')
  }

  if (file.size > maxSize) {
    throw new Error('La imagen es muy grande. El tamaño máximo es 10MB.')
  }

  return true
}

export const batchOptimizeImages = async (files, options = {}) => {
  const optimizedFiles = []
  const errors = []

  for (let i = 0; i < files.length; i++) {
    try {
      validateImageFile(files[i])
      const optimized = await optimizeImage(files[i], options)
      optimizedFiles.push(optimized)
    } catch (error) {
      errors.push({
        file: files[i].name,
        error: error.message
      })
    }
  }

  return {
    optimizedFiles,
    errors,
    success: errors.length === 0
  }
}
