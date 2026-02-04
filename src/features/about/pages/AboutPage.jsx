import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiAward, FiHeart, FiShield, FiTrendingUp, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import SEO from '../../../layout/components/SEO'
import './AboutPage.css'

function AboutPage() {
  const stats = [
    { icon: <FiTrendingUp size={28} />, number: '10+', label: 'Años de Experiencia' },
    { icon: <FiAward size={28} />, number: '500+', label: 'Propiedades Gestionadas' },
    { icon: <FiHeart size={28} />, number: '98%', label: 'Clientes Satisfechos' },
    { icon: <FiShield size={28} />, number: '100%', label: 'Confianza y Seguridad' }
  ]

  const values = [
    {
      icon: <FiHeart size={32} />,
      title: 'Compromiso',
      description: 'Nos dedicamos completamente a encontrar la propiedad perfecta para cada cliente.'
    },
    {
      icon: <FiShield size={32} />,
      title: 'Transparencia',
      description: 'Comunicación clara y honesta en cada etapa del proceso.'
    },
    {
      icon: <FiAward size={32} />,
      title: 'Excelencia',
      description: 'Servicio de alta calidad respaldado por años de experiencia.'
    }
  ]

  return (
    <>
      <SEO 
        title="Nosotros | Carolina Lucero RAH - Experta Inmobiliaria"
        description="Conoce a Carolina Lucero, asesora inmobiliaria certificada de RentaHouse con más de 10 años de experiencia."
        keywords="carolina lucero, rentahouse, asesora inmobiliaria, inmobiliaria caracas"
      />

      {/* Hero Section */}
      <section className="about-hero-compact">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="text-white py-4">
              <h1 className="display-5 fw-bold mb-3">Tu Aliada en Bienes Raíces</h1>
              <p className="lead mb-0">
                Transformando sueños en hogares con el respaldo de RentaHouse.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sobre Carolina */}
      <section className="py-3 bg-light">
        <Container>
          <Row className="align-items-center g-3">
            <Col lg={5}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop"
                alt="Carolina Lucero"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
            <Col lg={7}>
              <h2 className="fw-bold mb-2">Carolina Lucero</h2>
              <p className="text-primary fw-semibold mb-3">Asesora Inmobiliaria Certificada RAH</p>
              <p className="text-muted mb-3">
                Más de 10 años ayudando a familias a encontrar su hogar ideal 
                con el respaldo de RentaHouse, la red inmobiliaria líder en Venezuela.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/contacto" className="btn btn-primary">
                  <FiMail className="me-2" />Contáctame
                </Link>
                <a 
                  href="https://wa.me/584129529660" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  <FaWhatsapp className="me-2" />WhatsApp
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Estadísticas */}
      <section className="py-3 bg-dark text-white">
        <Container>
          <Row className="g-3">
            {stats.map((stat, index) => (
              <Col key={index} xs={6} lg={3}>
                <div className="text-center">
                  <div className="text-primary mb-2">{stat.icon}</div>
                  <h3 className="h4 mb-1">{stat.number}</h3>
                  <p className="small mb-0 text-white-50">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Misión y Visión */}
      <section className="py-3">
        <Container>
          <Row className="g-3">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-3">
                  <FiTrendingUp size={36} className="text-primary mb-2" />
                  <h3 className="h5 mb-2">Nuestra Misión</h3>
                  <p className="text-muted small mb-0">
                    Facilitar el proceso de compra, venta o alquiler de propiedades 
                    con servicio personalizado y transparente.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-3">
                  <FiAward size={36} className="text-primary mb-2" />
                  <h3 className="h5 mb-2">Nuestra Visión</h3>
                  <p className="text-muted small mb-0">
                    Ser la asesora inmobiliaria de confianza en Venezuela, 
                    destacando por excelencia e innovación.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Valores */}
      <section className="py-3 bg-light">
        <Container>
          <div className="text-center mb-3">
            <h2 className="fw-bold mb-2">¿Por Qué Trabajar Conmigo?</h2>
            <p className="text-muted">Experiencia inmobiliaria excepcional</p>
          </div>
          <Row className="g-3">
            {values.map((value, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-3">
                    <div className="text-primary mb-2">{value.icon}</div>
                    <h4 className="h6 mb-2">{value.title}</h4>
                    <p className="text-muted small mb-0">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-3 bg-dark text-white">
        <Container>
          <div className="text-center">
            <h2 className="h4 fw-bold mb-2">¿Listo para Encontrar tu Hogar Ideal?</h2>
            <p className="mb-3">Juntos encontraremos la propiedad perfecta para ti.</p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <Link to="/propiedades" className="btn btn-light">Ver Propiedades</Link>
              <Link to="/contacto" className="btn btn-outline-light">Agenda una Cita</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default AboutPage
