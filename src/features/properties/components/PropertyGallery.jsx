import { useState } from 'react'
import ImageGallery from '../../../shared/components/ImageGallery'
import './PropertyGallery.css'

function PropertyGallery({ images = [] }) {
  const [showGallery, setShowGallery] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="property-gallery-placeholder">
        <img 
          src="https://via.placeholder.com/800x600?text=Sin+Imágenes" 
          alt="Sin imágenes"
          className="w-100"
        />
      </div>
    )
  }

  return (
    <>
      <div className="property-gallery">
        <div 
          className="gallery-main" 
          onClick={() => {
            setStartIndex(0)
            setShowGallery(true)
          }}
        >
          <img 
            src={images[0]} 
            alt="Imagen principal"
            className="gallery-main-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Error+al+cargar'
            }}
          />
          <div className="gallery-overlay">
            <span>Ver todas las fotos ({images.length})</span>
          </div>
        </div>

        {images.length > 1 && (
          <div className="gallery-thumbs mt-3">
            <div className="d-flex gap-2 overflow-auto">
              {images.slice(1, 5).map((image, index) => (
                <div 
                  key={index} 
                  className="gallery-thumb"
                  onClick={() => {
                    setStartIndex(index + 1)
                    setShowGallery(true)
                  }}
                >
                  <img src={image} alt={`Imagen ${index + 2}`} />
                  {index === 3 && images.length > 5 && (
                    <div className="gallery-thumb-overlay">
                      +{images.length - 5}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showGallery && (
        <ImageGallery
          images={images}
          currentIndex={startIndex}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  )
}

export default PropertyGallery
