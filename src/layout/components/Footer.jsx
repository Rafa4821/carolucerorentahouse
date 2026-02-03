import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer bg-dark text-white mt-auto">
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3">Carolina Lucero RAH</h5>
            <p className="text-muted">
              Inmobiliaria profesional especializada en la compra, venta y alquiler de propiedades. Tu socio de confianza en el mercado inmobiliario.
            </p>
            <div className="social-links d-flex gap-3 mt-3">
              <a href="https://www.facebook.com/share/17dZusHejB/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FiFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/carolucero.rah?igsh=cTdtdGZtYmc4Y2s1" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FiInstagram size={20} />
              </a>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="fw-bold text-white mb-3">Navegación</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/propiedades">Propiedades</Link></li>
              <li><Link to="/conoce-tu-m2">Conoce tu M²</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-3">Servicios</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/propiedades?tipo=venta">Venta</Link></li>
              <li><Link to="/propiedades?operation=ARRIENDO">Alquiler</Link></li>
              <li><Link to="/conoce-tu-m2">Tasaciones</Link></li>
              <li><Link to="/contacto">Asesoría</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-3">Contacto</h5>
            <ul className="list-unstyled footer-contact">
              <li>
                <FiMapPin className="me-2" />
                Av. Estancia C/C Calle Ernesto Blohm, C.C. Ciudad Tamanaco, Torre B, Piso 3, Ofc. B-301, Caracas
              </li>
              <li>
                <FiPhone className="me-2" />
                04129529660
              </li>
              <li>
                <FiMail className="me-2" />
                carolinalucero.rah@gmail.com
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <Row>
          <Col className="text-center">
            <p className="mb-0 text-light-gray">
              © {currentYear} Carol Lucero RAH. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
