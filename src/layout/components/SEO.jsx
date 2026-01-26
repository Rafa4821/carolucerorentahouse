import { Helmet } from 'react-helmet-async'

function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = 'website',
  author = 'Carolina Lucero RAH',
  noindex = false
}) {
  const siteName = 'Carolina Lucero RAH'
  const defaultDescription = 'Inmobiliaria profesional especializada en compra, venta y alquiler de propiedades en Venezuela. Encuentra tu hogar ideal con asesoría experta.'
  const defaultImage = 'https://carolucero.cl/og-image.jpg'
  const baseUrl = 'https://carolinalucero.com'

  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const finalDescription = description || defaultDescription
  const finalImage = image || defaultImage
  const finalUrl = url ? `${baseUrl}${url}` : baseUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />

      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="es" />
      <meta name="geo.region" content="VE" />
      <meta name="geo.placename" content="Caracas" />
    </Helmet>
  )
}

export default SEO
