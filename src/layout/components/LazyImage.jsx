import { useState, useEffect, useRef } from 'react'

function LazyImage({ 
  src, 
  alt, 
  placeholder = 'https://via.placeholder.com/400x300?text=Cargando...', 
  className = '',
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    let observer
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              const img = new Image()
              img.src = src
              img.onload = () => {
                setImageSrc(src)
                setIsLoaded(true)
              }
            }
          })
        },
        {
          rootMargin: '50px'
        }
      )

      observer.observe(imgRef.current)
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, isLoaded])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? '' : 'lazy-loading'}`}
      loading="lazy"
      {...props}
    />
  )
}

export default LazyImage
