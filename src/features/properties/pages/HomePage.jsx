import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiSearch, FiHome, FiDollarSign, FiAward } from 'react-icons/fi'
import SEO from '../../../layout/components/SEO'
import { motion } from 'framer-motion'
import FadeIn from '../../../layout/components/FadeIn'
import SlideIn from '../../../layout/components/SlideIn'
import GridTest from '../../../shared/components/GridTest'
import FirebaseTest from '../../../shared/components/FirebaseTest'
import './HomePage.css'

function HomePage() {
  return (
    <>
      <SEO 
        title="Inmobiliaria Profesional | Propiedades en Venta y Alquiler"
        description="Encuentra tu propiedad ideal con Carolina Lucero RAH. Especialistas en compra, venta y alquiler de propiedades. Asesoría profesional inmobiliaria en Caracas, Venezuela."
        keywords="inmobiliaria, propiedades, casas, apartamentos, venta, alquiler, Carolina Lucero, Caracas, Venezuela"
        url="/"
      />

      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="text-white">
              <motion.h1 
                className="display-3 fw-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Encuentra tu hogar ideal
              </motion.h1>
              
              <motion.p 
                className="lead mb-4 fs-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Te ayudamos a encontrar la propiedad perfecta para ti y tu familia. 
                Asesoría profesional en cada paso del camino.
              </motion.p>
              
              <motion.div 
                className="d-flex gap-3 flex-wrap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    as={Link} 
                    to="/propiedades" 
                    variant="light" 
                    size="lg" 
                    className="px-5 py-3"
                  >
                    <FiSearch className="me-2" />
                    Ver Propiedades
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    as={Link} 
                    to="/propiedades?tipo=venta" 
                    variant="outline-light" 
                    size="lg" 
                    className="px-5 py-3"
                  >
                    Comprar
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">¿Por qué elegirnos?</h2>
              <p className="lead text-muted">Somos expertos en el mercado inmobiliario</p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <FadeIn delay={0.2}>
                <Card className="text-center h-100 border-0 feature-card">
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <FiHome size={40} />
                    </div>
                    <h4 className="fw-bold mb-3">Amplio Portafolio</h4>
                    <p className="text-muted">
                      Miles de propiedades disponibles en las mejores ubicaciones. 
                      Encuentra lo que buscas con nosotros.
                    </p>
                  </Card.Body>
                </Card>
              </FadeIn>
            </Col>

            <Col md={4}>
              <FadeIn delay={0.4}>
                <Card className="text-center h-100 border-0 feature-card">
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <FiDollarSign size={40} />
                    </div>
                    <h4 className="fw-bold mb-3">Mejores Precios</h4>
                    <p className="text-muted">
                      Precios competitivos y transparentes. Te ayudamos a hacer 
                      la mejor inversión.
                    </p>
                  </Card.Body>
                </Card>
              </FadeIn>
            </Col>

            <Col md={4}>
              <FadeIn delay={0.6}>
                <Card className="text-center h-100 border-0 feature-card">
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <FiAward size={40} />
                    </div>
                    <h4 className="fw-bold mb-3">Experiencia</h4>
                    <p className="text-muted">
                      Años de experiencia en el mercado inmobiliario respaldando 
                      cada operación.
                    </p>
                  </Card.Body>
                </Card>
              </FadeIn>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <FadeIn delay={0.2}>
                <h3 className="fw-bold mb-3">¿Cuánto vale tu propiedad?</h3>
                <p className="text-muted mb-4">
                  Descubre el valor promedio por metro cuadrado en tu zona
                  y obtén una estimación profesional de tu propiedad.
                </p>
                <Button 
                  as={Link} 
                  to="/conoce-tu-m2" 
                  variant="primary" 
                  size="lg"
                >
                  Conoce tu M²
                </Button>
              </FadeIn>
            </Col>
            <Col lg={6} className="text-center">
              <FadeIn delay={0.4}>
                <div className="display-1 text-primary">📊</div>
              </FadeIn>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold text-white mb-3">
                ¿Listo para encontrar tu propiedad ideal?
              </h2>
              <p className="text-white-50 fs-5">
                Contáctanos hoy y te ayudaremos en cada paso del camino
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button 
                as={Link} 
                to="/contacto" 
                variant="light" 
                size="lg" 
                className="px-5 py-3"
              >
                Contáctanos
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <h3 className="mb-4">🔧 Verificaciones de Sistema</h3>
          <FirebaseTest />
          <GridTest />
        </Container>
      </section>
    </>
  )
}

export default HomePage
