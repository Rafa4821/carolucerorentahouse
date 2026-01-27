import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Row, Col, Badge, Alert, Card, InputGroup } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { FiMail, FiPhone, FiMapPin, FiHome, FiCheckCircle, FiClock, FiX, FiDownload, FiSearch, FiFilter } from 'react-icons/fi'
import { marketRequestService } from '../../zones/services/marketRequestService'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatPrice, formatDate } from '../../../utils/formatters'

function ManageRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const data = await marketRequestService.getAll()
      setRequests(data)
    } catch (err) {
      console.error('Error loading requests:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      setUpdating(true)
      await marketRequestService.updateStatus(requestId, newStatus)
      await loadRequests()
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Error al actualizar el estado')
    } finally {
      setUpdating(false)
    }
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setShowDetailModal(true)
  }

  const handleCloseDetail = () => {
    setShowDetailModal(false)
    setSelectedRequest(null)
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { variant: 'warning', text: 'Pendiente' },
      contacted: { variant: 'info', text: 'Contactado' },
      completed: { variant: 'success', text: 'Completado' },
      cancelled: { variant: 'secondary', text: 'Cancelado' }
    }
    const badge = badges[status] || badges.pending
    return <Badge bg={badge.variant}>{badge.text}</Badge>
  }

  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Zona', 'Tipo', 'Dormitorios', 'Baños', 'Estacionamientos', 'M²', 'Estimación', 'Estado']
    const rows = filteredRequests.map(req => [
      formatDate(req.createdAt),
      req.name,
      req.email,
      req.phone,
      req.zone,
      req.propertyType,
      req.bedrooms || 'N/A',
      req.bathrooms || 'N/A',
      req.parkingSpaces || 'N/A',
      req.m2,
      req.estimatedValue ? formatPrice(req.estimatedValue) : 'N/A',
      req.status || 'pending'
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `solicitudes_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || (req.status || 'pending') === filterStatus
    const matchesSearch = 
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.zone.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: requests.length,
    pending: requests.filter(r => (r.status || 'pending') === 'pending').length,
    contacted: requests.filter(r => r.status === 'contacted').length,
    completed: requests.filter(r => r.status === 'completed').length
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Helmet>
        <title>Gestionar Solicitudes - Panel Admin</title>
      </Helmet>

      <div className="mb-4">
        <h2 className="mb-3">Solicitudes de Análisis M²</h2>
        <p className="text-muted">
          Gestiona las solicitudes de análisis de propiedades de tus clientes
        </p>
      </div>

      {/* Estadísticas */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="mb-0">{stats.total}</h3>
              <small className="text-muted">Total</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <h3 className="mb-0 text-warning">{stats.pending}</h3>
              <small className="text-muted">Pendientes</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body>
              <h3 className="mb-0 text-info">{stats.contacted}</h3>
              <small className="text-muted">Contactados</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <h3 className="mb-0 text-success">{stats.completed}</h3>
              <small className="text-muted">Completados</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros y búsqueda */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre, email o zona..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FiFilter />
                </InputGroup.Text>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendientes</option>
                  <option value="contacted">Contactados</option>
                  <option value="completed">Completados</option>
                  <option value="cancelled">Cancelados</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button 
                variant="outline-primary" 
                onClick={exportToCSV}
                className="w-100"
                disabled={filteredRequests.length === 0}
              >
                <FiDownload className="me-2" />
                Exportar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabla de solicitudes */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {filteredRequests.length === 0 ? (
            <Alert variant="light" className="m-4 text-center border">
              <FiClock size={48} className="text-muted mb-3" />
              <p className="mb-0">
                {searchTerm || filterStatus !== 'all' 
                  ? 'No se encontraron solicitudes con los filtros aplicados' 
                  : 'No hay solicitudes aún'}
              </p>
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Zona</th>
                    <th>Propiedad</th>
                    <th>M²</th>
                    <th>Estimación</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(request => (
                    <tr key={request.id}>
                      <td>
                        <small className="text-muted">
                          {formatDate(request.createdAt)}
                        </small>
                      </td>
                      <td>
                        <strong>{request.name}</strong>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <small>
                            <FiMail size={12} className="me-1" />
                            {request.email}
                          </small>
                          <small>
                            <FiPhone size={12} className="me-1" />
                            {request.phone}
                          </small>
                        </div>
                      </td>
                      <td>
                        <Badge bg="light" text="dark">
                          <FiMapPin size={12} className="me-1" />
                          {request.zone}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <small>
                            <FiHome size={12} className="me-1" />
                            {request.propertyType}
                          </small>
                          {(request.bedrooms || request.bathrooms || request.parkingSpaces) && (
                            <small className="text-muted">
                              {request.bedrooms && `${request.bedrooms} dorm.`}
                              {request.bathrooms && ` • ${request.bathrooms} baños`}
                              {request.parkingSpaces && ` • ${request.parkingSpaces} estac.`}
                            </small>
                          )}
                        </div>
                      </td>
                      <td>
                        <Badge bg="secondary">{request.m2} m²</Badge>
                      </td>
                      <td>
                        {request.estimatedValue ? (
                          <strong className="text-primary">
                            {formatPrice(request.estimatedValue)}
                          </strong>
                        ) : (
                          <small className="text-muted">N/A</small>
                        )}
                      </td>
                      <td>
                        {getStatusBadge(request.status || 'pending')}
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => handleViewDetails(request)}
                            title="Ver detalles"
                          >
                            Ver
                          </Button>
                          <a
                            href={`mailto:${request.email}`}
                            className="btn btn-sm btn-outline-success"
                            title="Enviar email"
                          >
                            <FiMail />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal de detalles */}
      <Modal show={showDetailModal} onHide={handleCloseDetail} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <Row className="g-3">
                <Col md={12}>
                  <div className="bg-light p-3 rounded mb-3">
                    <h5 className="mb-3">Información del Cliente</h5>
                    <Row>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>Nombre:</strong><br />
                          {selectedRequest.name}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>Email:</strong><br />
                          <a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a>
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-0">
                          <strong>Teléfono:</strong><br />
                          <a href={`tel:${selectedRequest.phone}`}>{selectedRequest.phone}</a>
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-0">
                          <strong>Fecha:</strong><br />
                          {formatDate(selectedRequest.createdAt)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col md={12}>
                  <div className="bg-light p-3 rounded mb-3">
                    <h5 className="mb-3">Detalles de la Propiedad</h5>
                    <Row>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>Zona:</strong><br />
                          {selectedRequest.zone}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>Tipo:</strong><br />
                          {selectedRequest.propertyType}
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-2">
                          <strong>Dormitorios:</strong><br />
                          {selectedRequest.bedrooms || 'N/A'}
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-2">
                          <strong>Baños:</strong><br />
                          {selectedRequest.bathrooms || 'N/A'}
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-2">
                          <strong>Estacionamientos:</strong><br />
                          {selectedRequest.parkingSpaces || 'N/A'}
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>M²:</strong><br />
                          {selectedRequest.m2} m²
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {selectedRequest.estimatedValue && (
                  <Col md={12}>
                    <Alert variant="success">
                      <strong>Estimación Calculada:</strong><br />
                      <h4 className="mb-0 mt-2">{formatPrice(selectedRequest.estimatedValue)}</h4>
                    </Alert>
                  </Col>
                )}

                {selectedRequest.message && (
                  <Col md={12}>
                    <div className="bg-light p-3 rounded">
                      <strong>Mensaje Adicional:</strong>
                      <p className="mb-0 mt-2">{selectedRequest.message}</p>
                    </div>
                  </Col>
                )}

                <Col md={12}>
                  <hr />
                  <h5 className="mb-3">Estado de la Solicitud</h5>
                  <Form.Group>
                    <Form.Select
                      value={selectedRequest.status || 'pending'}
                      onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value)}
                      disabled={updating}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="contacted">Contactado</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Cambia el estado según el progreso de atención
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Cerrar
          </Button>
          {selectedRequest && (
            <a
              href={`mailto:${selectedRequest.email}?subject=Análisis de Propiedad - ${selectedRequest.zone}`}
              className="btn btn-primary"
            >
              <FiMail className="me-2" />
              Contactar Cliente
            </a>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ManageRequestsPage
