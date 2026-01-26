import { Row, Col, Card } from 'react-bootstrap'
import { FiHome, FiEdit3, FiUsers, FiTrendingUp } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard - Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <h1 className="mb-4">Dashboard</h1>

        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <FiHome size={40} className="text-primary mb-3" />
                <h3 className="fw-bold">0</h3>
                <p className="text-muted mb-0">Propiedades</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <FiEdit3 size={40} className="text-success mb-3" />
                <h3 className="fw-bold">0</h3>
                <p className="text-muted mb-0">Artículos</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <FiUsers size={40} className="text-info mb-3" />
                <h3 className="fw-bold">0</h3>
                <p className="text-muted mb-0">Visitas</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <FiTrendingUp size={40} className="text-warning mb-3" />
                <h3 className="fw-bold">0</h3>
                <p className="text-muted mb-0">Consultas</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <h5 className="mb-3">Bienvenido al Backoffice</h5>
            <p className="text-muted">
              Desde aquí podrás administrar todas las propiedades, artículos del blog y contenido de tu sitio inmobiliario.
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default DashboardPage
