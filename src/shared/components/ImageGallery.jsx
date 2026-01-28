import { useState, useEffect, useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import './ImageGallery.css'

function ImageGallery({ images = [], currentIndex = 0, onClose }) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
  }, [images.length])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }, [images.length])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }, [goToPrevious, goToNext, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  if (!images || images.length === 0) return null

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="xl"
      centered
      className="image-gallery-modal"
      fullscreen
    >
      <div className="image-gallery-container">
        {/* Header */}
        <div className="image-gallery-header">
          <div className="image-gallery-counter">
            {activeIndex + 1} / {images.length}
          </div>
          <div className="image-gallery-actions">
            <button
              className="gallery-action-btn"
              onClick={toggleZoom}
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <FiZoomOut size={20} /> : <FiZoomIn size={20} />}
            </button>
            <button
              className="gallery-action-btn"
              onClick={onClose}
              title="Cerrar"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Main Image */}
        <div 
          className="image-gallery-main"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.length > 1 && (
            <button
              className="gallery-nav-btn gallery-nav-prev"
              onClick={goToPrevious}
              aria-label="Imagen anterior"
            >
              <FiChevronLeft size={32} />
            </button>
          )}

          <div className={`image-gallery-image-container ${isZoomed ? 'zoomed' : ''}`}>
            <img
              src={images[activeIndex]}
              alt={`Imagen ${activeIndex + 1}`}
              className="gallery-main-image"
              onClick={toggleZoom}
            />
          </div>

          {images.length > 1 && (
            <button
              className="gallery-nav-btn gallery-nav-next"
              onClick={goToNext}
              aria-label="Imagen siguiente"
            >
              <FiChevronRight size={32} />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="image-gallery-thumbnails">
            <div className="thumbnails-scroll">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => {
                    setActiveIndex(index)
                    setIsZoomed(false)
                  }}
                >
                  <img src={image} alt={`Miniatura ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Indicators for mobile */}
        {images.length > 1 && (
          <div className="image-gallery-indicators">
            {images.map((_, index) => (
              <span
                key={index}
                className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ImageGallery
