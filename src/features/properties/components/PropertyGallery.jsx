import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import './PropertyGallery.css'

function PropertyGallery({ images = [] }) {
  const [showModal, setShowModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

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
        <div className="gallery-main" onClick={() => setShowModal(true)}>
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
                    setActiveIndex(index + 1)
                    setShowModal(true)
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

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        className="gallery-modal"
      >
        <Modal.Header className="border-0">
          <button 
            className="btn-close-gallery"
            onClick={() => setShowModal(false)}
          >
            <FiX size={24} />
          </button>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            spaceBetween={10}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            initialSlide={activeIndex}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={image} 
                  alt={`Imagen ${index + 1}`}
                  className="gallery-modal-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {images.length > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              watchSlidesProgress
              className="gallery-thumbs-swiper mt-3"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Miniatura ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PropertyGallery
