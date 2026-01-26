export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type
  }

  switch (type) {
    case 'RealEstateAgent':
      return {
        ...baseData,
        name: 'Carolina Lucero RAH',
        description: 'Inmobiliaria profesional en Caracas, Venezuela',
        url: 'https://carolinalucero.com',
        telephone: '+56912345678',
        email: 'info@carolucero.cl',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'VE',
          addressLocality: 'Caracas',
          addressRegion: 'Distrito Capital'
        }
      }

    case 'Product':
      return {
        ...baseData,
        name: data.title,
        description: data.description,
        image: data.images?.[0],
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      }

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.excerpt,
        image: data.coverImage,
        datePublished: data.createdAt,
        author: {
          '@type': 'Person',
          name: 'Carolina Lucero'
        }
      }

    default:
      return baseData
  }
}

export const injectStructuredData = (data) => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}
