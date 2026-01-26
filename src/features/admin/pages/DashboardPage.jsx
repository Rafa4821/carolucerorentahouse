import { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiHome, FiEdit3, FiMapPin, FiMail } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { propertyService } from '../../properties/services/propertyService'
import { blogService } from '../../blog/services/blogService'
import { zoneService } from '../../zones/services/zoneService'
import { marketRequestService } from '../../zones/services/marketRequestService'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatDate } from '../../../utils/formatters'

function DashboardPage() {
  const [stats, setStats] = useState({
    properties: 0,
    posts: 0,
    zones: 0,
    requests: 0
  })
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      const [properties, posts, zones, requests] = await Promise.all([
        propertyService.getAll(),
        blogService.getAll(),
        zoneService.getAll(),
        marketRequestService.getRecent(5)
      ])

      setStats({
        properties: properties.length,
        posts: posts.length,
        zones: zones.length,
        requests: requests.length
      })

      setRecentRequests(requests)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Panel Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <h1 className="mb-4">Dashboard</h1>

        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <Card className="text-center h-100 border-primary">
              <Card.Body>
                <FiHome size={40} className="text-primary mb-3" />
                <h3 className="fw-bold">{stats.properties}</h3>
                <p className="text-muted mb-0">Propiedades</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="text-center h-100 border-success">
              <Card.Body>
                <FiEdit3 size={40} className="text-success mb-3" />
                <h3 className="fw-bold">{stats.posts}</h3>
                <p className="text-muted mb-0">Artículos Blog</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="text-center h-100 border-info">
              <Card.Body>
                <FiMapPin size={40} className="text-info mb-3" />
                <h3 className="fw-bold">{stats.zones}</h3>
                <p className="text-muted mb-0">Zonas Activas</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="text-center h-100 border-warning">
              <Card.Body>
                <FiMail size={40} className="text-warning mb-3" />
                <h3 className="fw-bold">{stats.requests}</h3>
                <p className="text-muted mb-0">Consultas</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={12}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Solicitudes Recientes (Conoce tu M²)</h5>
              </Card.Header>
              <Card.Body className="p-0">
                {recentRequests.length > 0 ? (
                  <Table responsive hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Zona</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRequests.map(request => (
                        <tr key={request.id}>
                          <td>{formatDate(request.createdAt)}</td>
                          <td>{request.name}</td>
                          <td>{request.email}</td>
                          <td>{request.zone}</td>
                          <td>
                            <Badge bg="secondary">{request.propertyType}</Badge>
                          </td>
                          <td>
                            <Badge bg={request.status === 'pending' ? 'warning' : 'success'}>
                              {request.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="p-4 text-center text-muted">
                    No hay solicitudes recientes
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={12}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Accesos Rápidos</h5>
                <div className="d-flex gap-3 flex-wrap">
                  <Link to="/admin/propiedades" className="btn btn-primary">
                    <FiHome className="me-2" />
                    Gestionar Propiedades
                  </Link>
                  <Link to="/admin/blog" className="btn btn-success">
                    <FiEdit3 className="me-2" />
                    Gestionar Blog
                  </Link>
                  <Link to="/admin/zonas" className="btn btn-info">
                    <FiMapPin className="me-2" />
                    Gestionar Zonas
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DashboardPage
