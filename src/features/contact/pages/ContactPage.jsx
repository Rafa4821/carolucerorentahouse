import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Helmet>
        <title>Contacto - Carolina Lucero RAH</title>
        <meta name="description" content="Contáctanos para más información sobre nuestras propiedades" />
      </Helmet>

      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h1 className="section-title text-center mb-5">Contáctanos</h1>

              <Row className="g-4">
                <Col lg={4}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body className="p-4">
                      <div className="contact-icon mb-3">
                        <FiMapPin size={32} />
                      </div>
                      <h5 className="fw-bold">Ubicación</h5>
                      <p className="text-muted">
                        Caracas, Venezuela<br />
                        Distrito Capital
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={4}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body className="p-4">
                      <div className="contact-icon mb-3">
                        <FiPhone size={32} />
                      </div>
                      <h5 className="fw-bold">Teléfono</h5>
                      <p className="text-muted">
                        +56 9 1234 5678<br />
                        Lun - Vie: 9:00 - 18:00
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={4}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body className="p-4">
                      <div className="contact-icon mb-3">
                        <FiMail size={32} />
                      </div>
                      <h5 className="fw-bold">Email</h5>
                      <p className="text-muted">
                        info@carolucero.cl<br />
                        contacto@carolucero.cl
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mt-5 border-0 shadow-sm">
                <Card.Body className="p-5">
                  <h3 className="mb-4">Envíanos un mensaje</h3>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre completo</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        required
                      />
                    </Form.Group>

                    <Button type="submit" variant="primary" size="lg" className="px-5">
                      <FiSend className="me-2" />
                      Enviar Mensaje
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default ContactPage
