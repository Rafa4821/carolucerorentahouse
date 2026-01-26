import { Row, Col, Alert } from 'react-bootstrap'
import PropertyCard from './PropertyCard'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'

function PropertyGrid({ properties, loading, error }) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error al cargar propiedades: {error}
      </Alert>
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <Alert variant="info">
        No se encontraron propiedades con los filtros seleccionados.
      </Alert>
    )
  }

  return (
    <Row className="g-4">
      {properties.map(property => (
        <Col key={property.id} xs={12} md={6} lg={4}>
          <PropertyCard property={property} />
        </Col>
      ))}
    </Row>
  )
}

export default PropertyGrid
