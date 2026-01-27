import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap'
import SEO from '../../../layout/components/SEO'
import { FiMapPin, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiSend } from 'react-icons/fi'
import { useZones } from '../hooks/useZones'
import { marketRequestService } from '../services/marketRequestService'
import FadeIn from '../../../layout/components/FadeIn'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatPrice } from '../../../utils/formatters'
import './KnowYourM2Page.css'

function KnowYourM2Page() {
  const { zones, loading: zonesLoading } = useZones()
  const [selectedZone, setSelectedZone] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zone: '',
    propertyType: '',
    m2: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleZoneSelect = (e) => {
    const zoneName = e.target.value
    const zone = zones.find(z => z.name === zoneName)
    setSelectedZone(zone)
    setFormData(prev => ({ ...prev, zone: zoneName }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      setSubmitError(null)
      
      await marketRequestService.create({
        ...formData,
        source: 'know_your_m2',
        estimatedValue: selectedZone?.avgPriceM2 
          ? selectedZone.avgPriceM2 * Number(formData.m2) 
          : null
      })
      
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        zone: '',
        propertyType: '',
        m2: '',
        message: ''
      })
      setSelectedZone(null)
      setShowForm(false)
      
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError('Error al enviar la solicitud. Por favor intenta nuevamente.')
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const calculateEstimate = () => {
    if (!selectedZone || !formData.m2) return null
    return selectedZone.avgPriceM2 * Number(formData.m2)
  }

  if (zonesLoading) {
    return (
      <Container className="py-5">
        <LoadingSpinner />
      </Container>
    )
  }

  return (
    <>
      <SEO 
        title="Conoce el Valor de tu M² | Tasación Inmobiliaria Gratuita"
        description="Descubre el valor promedio por metro cuadrado de tu zona. Análisis de mercado inmobiliario gratuito y asesoría profesional en Caracas, Venezuela."
        keywords="valor m2, tasación, avalúo, precio metro cuadrado, mercado inmobiliario, valorización, Venezuela"
        url="/conoce-tu-m2"
      />

      <section className="hero-m2">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="mx-auto text-center text-white">
              <FadeIn delay={0.1}>
                <h1 className="display-4 fw-bold mb-4">
                  Conoce el Valor de tu M²
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="lead fs-4 mb-4">
                  Descubre el valor promedio por metro cuadrado en tu zona
                  y obtén una estimación profesional de tu propiedad
                </p>
              </FadeIn>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          {submitSuccess && (
            <Alert variant="success" className="mb-4">
              <FiCheckCircle className="me-2" />
              ¡Solicitud enviada exitosamente! Nos contactaremos contigo pronto.
            </Alert>
          )}

          <Row className="g-4">
            <Col lg={8} className="mx-auto">
              <FadeIn delay={0.2}>
                <Card className="shadow-sm border-0 mb-4">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <FiMapPin size={24} className="text-primary me-3" />
                      <h4 className="mb-0">Selecciona tu Zona</h4>
                    </div>

                    <Form.Group>
                      <Form.Select
                        size="lg"
                        value={selectedZone?.name || ''}
                        onChange={handleZoneSelect}
                        className="mb-3"
                      >
                        <option value="">Selecciona una zona...</option>
                        {zones.map(zone => (
                          <option key={zone.id} value={zone.name}>
                            {zone.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {selectedZone && (
                      <div className="zone-info mt-4">
                        <div className="value-display">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div>
                              <small className="text-muted d-block">Valor promedio por m²</small>
                              <h2 className="text-primary mb-0">
                                {formatPrice(selectedZone.avgPriceM2)}/m²
                              </h2>
                            </div>
                            <FiTrendingUp size={48} className="text-primary opacity-50" />
                          </div>
                        </div>

                        {selectedZone.description && (
                          <Alert variant="light" className="mt-3 border-primary">
                            <FiAlertCircle className="me-2 text-primary" />
                            {selectedZone.description}
                          </Alert>
                        )}

                        <div className="disclaimer mt-4 p-3 bg-light rounded">
                          <small className="text-muted">
                            <strong>Importante:</strong> Este valor es referencial y puede variar 
                            según características específicas de cada propiedad como ubicación exacta, 
                            antigüedad, estado de conservación, orientación y amenidades.
                          </small>
                        </div>

                        <div className="text-center mt-4">
                          <Button 
                            variant="primary" 
                            size="lg"
                            onClick={() => setShowForm(true)}
                            className="px-5"
                          >
                            <FiSend className="me-2" />
                            Solicitar Análisis Personalizado
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </FadeIn>

              {showForm && selectedZone && (
                <FadeIn delay={0.1}>
                  <Card className="shadow-sm border-primary">
                    <Card.Body className="p-4">
                      <h4 className="mb-4">Solicitud de Análisis</h4>

                      {submitError && (
                        <Alert variant="danger" className="mb-4">
                          {submitError}
                        </Alert>
                      )}

                      <Form onSubmit={handleSubmit}>
                        <Row className="g-3">
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Nombre Completo *</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Juan Pérez"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Email *</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="juan@email.com"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Teléfono *</Form.Label>
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="+56 9 1234 5678"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Tipo de Propiedad *</Form.Label>
                              <Form.Select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Selecciona...</option>
                                <option value="casa">Casa</option>
                                <option value="departamento">Departamento</option>
                                <option value="oficina">Oficina</option>
                                <option value="local">Local Comercial</option>
                                <option value="terreno">Terreno</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Metros Cuadrados *</Form.Label>
                              <Form.Control
                                type="number"
                                name="m2"
                                value={formData.m2}
                                onChange={handleInputChange}
                                required
                                min="0.01"
                                step="0.01"
                                placeholder="Ej: 120.50"
                              />
                            </Form.Group>
                          </Col>

                          {calculateEstimate() && (
                            <Col md={12}>
                              <Alert variant="success" className="mb-0">
                                <strong>Estimación referencial:</strong>{' '}
                                {formatPrice(calculateEstimate())}
                              </Alert>
                            </Col>
                          )}

                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Mensaje Adicional (opcional)</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Cuéntanos más sobre tu propiedad..."
                              />
                            </Form.Group>
                          </Col>

                          <Col md={12}>
                            <div className="d-grid gap-2">
                              <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={submitting}
                              >
                                {submitting ? 'Enviando...' : 'Enviar Solicitud'}
                              </Button>
                              <Button
                                type="button"
                                variant="outline-secondary"
                                onClick={() => setShowForm(false)}
                                disabled={submitting}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                </FadeIn>
              )}
            </Col>

            <Col lg={10} className="mx-auto mt-5">
              <Card className="bg-primary text-white">
                <Card.Body className="p-4 text-center">
                  <h4 className="mb-3">¿Por qué solicitar un análisis?</h4>
                  <Row className="g-4 mt-2">
                    <Col md={4}>
                      <FiCheckCircle size={32} className="mb-3" />
                      <h6>Valor Real de Mercado</h6>
                      <p className="small mb-0">
                        Conoce el valor actualizado de tu propiedad
                      </p>
                    </Col>
                    <Col md={4}>
                      <FiCheckCircle size={32} className="mb-3" />
                      <h6>Asesoría Profesional</h6>
                      <p className="small mb-0">
                        Expertos en el mercado inmobiliario
                      </p>
                    </Col>
                    <Col md={4}>
                      <FiCheckCircle size={32} className="mb-3" />
                      <h6>Sin Compromiso</h6>
                      <p className="small mb-0">
                        Análisis gratuito sin obligación
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default KnowYourM2Page
