import { Container, Row, Col, Card, Badge, Button, ListGroup } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import SEO from '../../../layout/components/SEO'
import { FiHome, FiDroplet, FiMaximize2, FiMapPin, FiPhone, FiMail, FiArrowLeft, FiShare2, FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { FaCar } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { useProperty } from '../hooks/useProperties'
import PropertyGallery from '../components/PropertyGallery'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import FadeIn from '../../../layout/components/FadeIn'
import { formatPrice, formatArea, formatDate } from '../../../utils/formatters'
import { PROPERTY_TYPES, OPERATION_TYPES } from '../../../utils/constants'
import './PropertyDetailPage.css'

function PropertyDetailPage() {
  const { id } = useParams()
  const { property, loading, error } = useProperty(id)
  
  // Calcular antigüedad del inmueble
  const calculatePropertyAge = (yearBuilt) => {
    if (!yearBuilt) return null
    const currentYear = new Date().getFullYear()
    const age = currentYear - yearBuilt
    if (age === 0) return 'Nuevo'
    if (age === 1) return '1 año'
    return `${age} años`
  }

  if (loading) {
    return (
      <Container className="py-5">
        <LoadingSpinner fullPage />
      </Container>
    )
  }

  if (error || !property) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Propiedad no encontrada</h2>
          <p className="text-muted">La propiedad que buscas no existe o ha sido eliminada.</p>
          <Button as={Link} to="/propiedades" variant="primary">
            <FiArrowLeft className="me-2" />
            Volver a Propiedades
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <>
      <SEO 
        title={`${property.title} | ${property.zone}, ${property.city}`}
        description={`${property.description.substring(0, 150)}... | ${property.bedrooms} dormitorios, ${property.bathrooms} baños, ${property.m2} m². ${formatPrice(property.price)}`}
        image={property.images?.[0]}
        url={`/propiedades/${property.id}`}
        type="product"
        keywords={`${property.type}, ${property.operation}, ${property.zone}, ${property.city}, propiedad, inmobiliaria`}
      />

      <section className="py-4 bg-light">
        <Container>
          <Button 
            as={Link} 
            to="/propiedades" 
            variant="outline-secondary" 
            className="mb-3"
          >
            <FiArrowLeft className="me-2" />
            Volver
          </Button>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <FadeIn>
                <PropertyGallery images={property.images} />
              </FadeIn>

              <Card className="mt-4">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="mb-2">
                        <Badge bg="dark" className="me-2">
                          {OPERATION_TYPES[property.operation] || property.operation}
                        </Badge>
                        <Badge bg="danger">
                          {PROPERTY_TYPES[property.type] || property.type}
                        </Badge>
                      </div>
                      <h1 className="property-detail-title">{property.title}</h1>
                      <div className="property-detail-location">
                        <FiMapPin className="me-2" />
                        {property.zone}, {property.city}
                      </div>
                    </div>
                    <Button variant="outline-secondary" size="sm">
                      <FiShare2 className="me-2" />
                      Compartir
                    </Button>
                  </div>

                  <div className="property-detail-price mb-4">
                    {formatPrice(property.price)}
                  </div>

                  <div className="property-detail-features mb-4">
                    {property.bedrooms && (
                      <div className="feature-box">
                        <FiHome size={24} />
                        <span className="feature-value">{property.bedrooms}</span>
                        <span className="feature-label">Dormitorios</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="feature-box">
                        <FiDroplet size={24} />
                        <span className="feature-value">{property.bathrooms}</span>
                        <span className="feature-label">Baños</span>
                      </div>
                    )}
                    {property.parkingSpaces > 0 && (
                      <div className="feature-box">
                        <FaCar size={24} />
                        <span className="feature-value">{property.parkingSpaces}</span>
                        <span className="feature-label">Estacionamiento</span>
                      </div>
                    )}
                    {property.m2 && (
                      <div className="feature-box">
                        <FiMaximize2 size={24} />
                        <span className="feature-value">{property.m2}</span>
                        <span className="feature-label">m² Totales</span>
                      </div>
                    )}
                    {property.yearBuilt && (
                      <div className="feature-box">
                        <FiCalendar size={24} />
                        <span className="feature-value">{calculatePropertyAge(property.yearBuilt)}</span>
                        <span className="feature-label">Antigüedad</span>
                      </div>
                    )}
                  </div>

                  <hr />

                  {property.features && property.features.length > 0 && (
                    <div className="mt-4">
                      <h4 className="mb-3">Características</h4>
                      <Row className="g-2">
                        {property.features.map((feature, index) => (
                          <Col xs={6} md={4} key={index}>
                            <div className="d-flex align-items-center">
                              <FiCheckCircle className="text-success me-2" size={16} />
                              <span className="small">{feature}</span>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {property.features && property.features.length > 0 && <hr />}

                  <div className="mt-4">
                    <h4 className="mb-3">Descripción</h4>
                    <p className="property-description">{property.description}</p>
                  </div>

                  {property.yearBuilt && (
                    <div className="mt-3">
                      <p className="text-muted mb-0">
                        <strong>Año de construcción:</strong> {property.yearBuilt}
                      </p>
                    </div>
                  )}

                  {property.observations && (
                    <div className="mt-4">
                      <h4 className="mb-3">Observaciones</h4>
                      <p className="property-description text-muted">{property.observations}</p>
                    </div>
                  )}

                  {property.flexCode && (
                    <div className="mt-4">
                      <small className="text-muted">Código: {property.flexCode}</small>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <div className="sticky-sidebar">
                <Card className="shadow-sm contact-card">
                  <Card.Body className="p-4">
                    <h4 className="mb-3">¿Interesado en esta propiedad?</h4>
                    <p className="text-muted mb-4">
                      Contáctanos y te ayudaremos a encontrar tu hogar ideal
                    </p>

                    <div className="d-grid gap-3">
                      <Button 
                        variant="primary" 
                        size="lg"
                        as={Link}
                        to="/contacto"
                        className="w-100"
                      >
                        <FiMail className="me-2" />
                        Enviar Consulta
                      </Button>

                      <Button
                        variant="success"
                        size="lg"
                        href={`https://wa.me/584129529660?text=${encodeURIComponent(`Hola, estoy interesado en la propiedad: ${property.title} - ${property.zone}, ${property.city}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-100"
                      >
                        <FaWhatsapp className="me-2" />
                        Consultar por WhatsApp
                      </Button>
                    </div>

                    <hr className="my-4" />

                    <div className="contact-info">
                      <h6 className="mb-3">Información de Contacto</h6>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="px-0">
                          <FiPhone className="me-2 text-primary" />
                          04129529660
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0">
                          <FiMail className="me-2 text-primary" />
                          carolinalucero.rah@gmail.com
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>

                {property.createdAt && (
                  <Card className="mt-3">
                    <Card.Body>
                      <small className="text-muted">
                        Publicado el {formatDate(property.createdAt)}
                      </small>
                    </Card.Body>
                  </Card>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default PropertyDetailPage
