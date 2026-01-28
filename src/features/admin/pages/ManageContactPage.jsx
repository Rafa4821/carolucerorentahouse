import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Row, Col, Badge, Alert, Card, InputGroup } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { FiMail, FiPhone, FiUser, FiMessageSquare, FiCheckCircle, FiClock, FiX, FiDownload, FiSearch, FiFilter, FiTrash2 } from 'react-icons/fi'
import { contactService } from '../../contact/services/contactService'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatDate } from '../../../utils/formatters'

function ManageContactPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [updating, setUpdating] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const data = await contactService.getAll()
      setMessages(data)
    } catch (err) {
      console.error('Error loading messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredMessages.map(m => m.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un mensaje para eliminar')
      return
    }

    if (!window.confirm(`¿Estás seguro de eliminar ${selectedItems.length} mensaje(s)?`)) return

    try {
      setUpdating(true)
      await Promise.all(selectedItems.map(id => contactService.delete(id)))
      setSelectedItems([])
      setSelectAll(false)
      await loadMessages()
      alert('Mensajes eliminados exitosamente')
    } catch (err) {
      alert('Error al eliminar mensajes: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un mensaje')
      return
    }

    try {
      setUpdating(true)
      await Promise.all(selectedItems.map(id => 
        contactService.updateStatus(id, newStatus)
      ))
      setSelectedItems([])
      setSelectAll(false)
      await loadMessages()
      alert(`Estado actualizado para ${selectedItems.length} mensaje(s)`)
    } catch (err) {
      alert('Error al actualizar estado: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      setUpdating(true)
      await contactService.updateStatus(messageId, newStatus)
      await loadMessages()
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Error al actualizar el estado')
    } finally {
      setUpdating(false)
    }
  }

  const handleShowDetail = (message) => {
    setSelectedMessage(message)
    setShowDetailModal(true)
  }

  const handleExportCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Mensaje', 'Estado']
    const rows = filteredMessages.map(msg => [
      new Date(msg.createdAt).toLocaleString(),
      msg.name,
      msg.email,
      msg.phone || 'N/A',
      msg.message,
      getStatusLabel(msg.status)
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `consultas_contacto_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusLabel = (status) => {
    const labels = {
      'pending': 'Pendiente',
      'contacted': 'Contactado',
      'completed': 'Completado'
    }
    return labels[status] || status
  }

  const getStatusBadge = (status) => {
    const variants = {
      'pending': 'warning',
      'contacted': 'info',
      'completed': 'success'
    }
    return variants[status] || 'secondary'
  }

  const filteredMessages = messages.filter(msg => {
    const matchesStatus = filterStatus === 'all' || msg.status === filterStatus
    const matchesSearch = !searchTerm || 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Helmet>
        <title>Gestionar Consultas - Panel Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="mb-4">
        <h2 className="mb-3">Consultas de Contacto</h2>
        <p className="text-muted">
          Gestiona las consultas recibidas desde el formulario de contacto
        </p>
      </div>

      {/* Filtros */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={6}>
              <Form.Group>
                <Form.Label><FiSearch className="me-2" />Buscar</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FiSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre, email o mensaje..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label><FiFilter className="me-2" />Estado</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="pending">Pendiente</option>
                  <option value="contacted">Contactado</option>
                  <option value="completed">Completado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button
                variant="success"
                className="w-100"
                onClick={handleExportCSV}
                disabled={filteredMessages.length === 0}
              >
                <FiDownload className="me-2" />
                Exportar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Barra de acciones masivas */}
      {selectedItems.length > 0 && (
        <Alert variant="info" className="d-flex justify-content-between align-items-center">
          <span><strong>{selectedItems.length}</strong> mensaje(s) seleccionado(s)</span>
          <div className="d-flex gap-2">
            <Button variant="outline-info" size="sm" onClick={() => handleBulkStatusChange('contacted')}>
              Marcar Contactado
            </Button>
            <Button variant="outline-success" size="sm" onClick={() => handleBulkStatusChange('completed')}>
              Marcar Completado
            </Button>
            <Button variant="danger" size="sm" onClick={handleBulkDelete} disabled={updating}>
              <FiTrash2 className="me-1" /> Eliminar
            </Button>
          </div>
        </Alert>
      )}

      {/* Tabla de mensajes */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {filteredMessages.length === 0 ? (
            <Alert variant="light" className="m-4 text-center border">
              <FiClock size={48} className="text-muted mb-3" />
              <p className="mb-0">
                {searchTerm || filterStatus !== 'all' 
                  ? 'No se encontraron mensajes con los filtros aplicados' 
                  : 'No hay mensajes aún'}
              </p>
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '50px' }}>
                      <Form.Check
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        label=""
                      />
                    </th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Mensaje</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map(message => (
                    <tr key={message.id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedItems.includes(message.id)}
                          onChange={() => handleSelectItem(message.id)}
                          label=""
                        />
                      </td>
                      <td>
                        <small className="text-muted">
                          {formatDate(message.createdAt)}
                        </small>
                      </td>
                      <td>
                        <strong>{message.name}</strong>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <small>
                            <FiMail size={12} className="me-1" />
                            {message.email}
                          </small>
                          {message.phone && (
                            <small>
                              <FiPhone size={12} className="me-1" />
                              {message.phone}
                            </small>
                          )}
                        </div>
                      </td>
                      <td>
                        <small className="text-muted">
                          {message.message.substring(0, 50)}...
                        </small>
                      </td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={message.status}
                          onChange={(e) => handleStatusChange(message.id, e.target.value)}
                          disabled={updating}
                          style={{ width: 'auto', minWidth: '140px' }}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="contacted">Contactado</option>
                          <option value="completed">Completado</option>
                        </Form.Select>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleShowDetail(message)}
                        >
                          Ver Detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Detalles */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <p className="mb-2">
                    <FiUser className="me-2" />
                    <strong>Nombre:</strong> {selectedMessage.name}
                  </p>
                  <p className="mb-2">
                    <FiMail className="me-2" />
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                  </p>
                  {selectedMessage.phone && (
                    <p className="mb-2">
                      <FiPhone className="me-2" />
                      <strong>Teléfono:</strong>{' '}
                      <a href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a>
                    </p>
                  )}
                </Col>
                <Col md={6}>
                  <p className="mb-2">
                    <FiClock className="me-2" />
                    <strong>Fecha:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Estado:</strong>{' '}
                    <Badge bg={getStatusBadge(selectedMessage.status)}>
                      {getStatusLabel(selectedMessage.status)}
                    </Badge>
                  </p>
                </Col>
              </Row>
              <hr />
              <div>
                <p className="mb-2">
                  <FiMessageSquare className="me-2" />
                  <strong>Mensaje:</strong>
                </p>
                <Card className="bg-light">
                  <Card.Body>
                    <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedMessage.message}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ManageContactPage
