import { useState } from 'react'
import { Container } from 'react-bootstrap'
import SEO from '../../../layout/components/SEO'
import { useSearchParams } from 'react-router-dom'
import PropertyFilters from '../components/PropertyFilters'
import PropertyGrid from '../components/PropertyGrid'
import { useProperties } from '../hooks/useProperties'
import FadeIn from '../../../layout/components/FadeIn'

function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const initialFilters = {
    type: searchParams.get('tipo') || '',
    operation: searchParams.get('operacion') || '',
    city: searchParams.get('ciudad') || ''
  }

  const [filters, setFilters] = useState(initialFilters)
  const { properties, loading, error } = useProperties(filters)

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
      <SEO 
        title="Catálogo de Propiedades en Venta y Alquiler"
        description="Explora nuestro catálogo completo de propiedades en venta y alquiler. Casas, apartamentos, terrenos y más. Encuentra tu hogar ideal en Venezuela."
        keywords="propiedades, casas, apartamentos, venta, alquiler, inmobiliaria, Venezuela, Caracas"
        url="/propiedades"
      />

      <section className="py-5 bg-light">
        <Container>
          <FadeIn>
            <h1 className="section-title text-center mb-2">Nuestras Propiedades</h1>
            <p className="text-center text-muted mb-5 lead">
              Encuentra la propiedad perfecta para ti
            </p>
          </FadeIn>

          <PropertyFilters onFilter={handleFilter} initialFilters={initialFilters} />
          
          <div className="mt-4">
            <PropertyGrid properties={properties} loading={loading} error={error} />
          </div>

          {!loading && properties.length > 0 && (
            <div className="text-center mt-4">
              <p className="text-muted">
                Mostrando {properties.length} {properties.length === 1 ? 'propiedad' : 'propiedades'}
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default PropertiesPage
