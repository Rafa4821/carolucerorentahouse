import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiAward, FiHeart, FiShield, FiTrendingUp, FiPhone, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import SEO from '../../../layout/components/SEO'
import FadeIn from '../../../layout/components/FadeIn'
import './AboutPage.css'

function AboutPage() {
  const stats = [
    { icon: <FiTrendingUp size={32} />, number: '10+', label: 'Años de Experiencia' },
    { icon: <FiAward size={32} />, number: '500+', label: 'Propiedades Gestionadas' },
    { icon: <FiHeart size={32} />, number: '98%', label: 'Clientes Satisfechos' },
    { icon: <FiShield size={32} />, number: '100%', label: 'Confianza y Seguridad' }
  ]

  const values = [
    {
      icon: <FiHeart size={40} />,
      title: 'Compromiso',
      description: 'Nos dedicamos completamente a encontrar la propiedad perfecta para cada cliente, adaptándonos a sus necesidades específicas.'
    },
    {
      icon: <FiShield size={40} />,
      title: 'Transparencia',
      description: 'Mantenemos una comunicación clara y honesta en cada etapa del proceso, sin sorpresas ni costos ocultos.'
    },
    {
      icon: <FiAward size={40} />,
      title: 'Excelencia',
      description: 'Brindamos un servicio de la más alta calidad, respaldado por años de experiencia en el mercado inmobiliario venezolano.'
    }
  ]

  return (
    <>
      <SEO 
        title="Nosotros | Carolina Lucero RAH - Experta Inmobiliaria"
        description="Conoce a Carolina Lucero, asesora inmobiliaria certificada de RentaHouse con más de 10 años de experiencia ayudando a familias a encontrar su hogar ideal en Caracas y Venezuela."
        keywords="carolina lucero, rentahouse, asesora inmobiliaria, inmobiliaria caracas, bienes raíces venezuela"
      />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <Container>
            <Row className="align-items-center min-vh-50">
              <Col lg={8} className="text-white">
                <FadeIn>
                  <h1 className="display-4 fw-bold mb-4">
                    Tu Aliada en Bienes Raíces
                  </h1>
                  <p className="lead mb-0">
                    Transformando sueños en hogares con más de una década de experiencia 
                    y el respaldo de RentaHouse, la red inmobiliaria líder en Venezuela.
                  </p>
                </FadeIn>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Sobre Carolina */}
      <section className="py-4 bg-light">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <FadeIn>
                <div className="about-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
                    alt="Carolina Lucero"
                    className="about-profile-image"
                  />
                </div>
              </FadeIn>
            </Col>
            <Col lg={6}>
              <FadeIn delay={200}>
                <h2 className="section-title mb-4">
                  Carolina Lucero
                  <span className="text-primary d-block mt-2">Asesora Inmobiliaria Certificada RAH</span>
                </h2>
                <p className="text-muted mb-4">
                  Con más de 10 años de experiencia en el mercado inmobiliario venezolano, 
                  me especializo en ayudar a familias y personas a encontrar su hogar ideal 
                  o invertir inteligentemente en propiedades.
                </p>
                <p className="text-muted mb-4">
                  Como parte del equipo RentaHouse, cuento con el respaldo de la red 
                  inmobiliaria más reconocida del país, lo que me permite ofrecerte acceso 
                  exclusivo a las mejores propiedades y un servicio profesional de primer nivel.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/contacto" className="btn btn-primary">
                    <FiMail className="me-2" />
                    Contáctame
                  </Link>
                  <a 
                    href="https://wa.me/584129529660" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-success"
                  >
                    <FaWhatsapp className="me-2" />
                    WhatsApp
                  </a>
                </div>
              </FadeIn>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Estadísticas */}
      <section className="py-4 bg-dark text-white">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} md={6} lg={3}>
                <FadeIn delay={index * 100}>
                  <div className="stat-card text-center">
                    <div className="stat-icon mb-3">
                      {stat.icon}
                    </div>
                    <h3 className="stat-number mb-2">{stat.number}</h3>
                    <p className="stat-label mb-0">{stat.label}</p>
                  </div>
                </FadeIn>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Misión y Visión */}
      <section className="py-4">
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <FadeIn>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-5">
                    <div className="mission-icon mb-4">
                      <FiTrendingUp size={48} className="text-primary" />
                    </div>
                    <h3 className="mb-3">Nuestra Misión</h3>
                    <p className="text-muted">
                      Facilitar el proceso de compra, venta o alquiler de propiedades, 
                      ofreciendo un servicio personalizado, transparente y eficiente que 
                      supere las expectativas de nuestros clientes. Nos comprometemos a 
                      ser el puente entre tus sueños y tu hogar ideal.
                    </p>
                  </Card.Body>
                </Card>
              </FadeIn>
            </Col>
            <Col lg={6}>
              <FadeIn delay={200}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-5">
                    <div className="mission-icon mb-4">
                      <FiAward size={48} className="text-primary" />
                    </div>
                    <h3 className="mb-3">Nuestra Visión</h3>
                    <p className="text-muted">
                      Ser reconocidos como la asesora inmobiliaria de confianza en Venezuela, 
                      destacándonos por nuestra excelencia en el servicio, innovación en 
                      procesos y el compromiso inquebrantable con la satisfacción de cada 
                      cliente que confía en nosotros.
                    </p>
                  </Card.Body>
                </Card>
              </FadeIn>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-4 bg-light">
        <Container>
          <div className="text-center mb-4">
            <FadeIn>
              <h2 className="section-title mb-3">¿Por Qué Trabajar Conmigo?</h2>
              <p className="text-muted">
                Mi compromiso es hacer de tu experiencia inmobiliaria algo excepcional
              </p>
            </FadeIn>
          </div>
          <Row className="g-4">
            {values.map((value, index) => (
              <Col key={index} lg={4}>
                <FadeIn delay={index * 100}>
                  <Card className="value-card h-100 border-0 shadow-sm">
                    <Card.Body className="p-4 text-center">
                      <div className="value-icon mb-3 text-primary">
                        {value.icon}
                      </div>
                      <h4 className="mb-3">{value.title}</h4>
                      <p className="text-muted mb-0">{value.description}</p>
                    </Card.Body>
                  </Card>
                </FadeIn>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-4 about-cta">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center text-white">
              <FadeIn>
                <h2 className="display-5 fw-bold mb-4">
                  ¿Listo para Encontrar tu Hogar Ideal?
                </h2>
                <p className="lead mb-4">
                  Déjame acompañarte en este importante paso. Juntos encontraremos 
                  la propiedad perfecta para ti y tu familia.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/propiedades" className="btn btn-light btn-lg">
                    Ver Propiedades
                  </Link>
                  <Link to="/contacto" className="btn btn-outline-light btn-lg">
                    Agenda una Cita
                  </Link>
                </div>
              </FadeIn>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default AboutPage
