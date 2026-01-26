import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Row, Col, Alert, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { zoneService } from '../../zones/services/zoneService'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatPrice } from '../../../utils/formatters'

function ManageZonesPage() {
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingZone, setEditingZone] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    avgPriceM2: '',
    description: ''
  })

  useEffect(() => {
    loadZones()
  }, [])

  const loadZones = async () => {
    try {
      setLoading(true)
      const data = await zoneService.getAll()
      setZones(data)
    } catch (err) {
      setError('Error al cargar zonas')
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (zone = null) => {
    if (zone) {
      setEditingZone(zone)
      setFormData({
        name: zone.name,
        avgPriceM2: zone.avgPriceM2,
        description: zone.description || ''
      })
    } else {
      setEditingZone(null)
      setFormData({
        name: '',
        avgPriceM2: '',
        description: ''
      })
    }
    setShowModal(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingZone(null)
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
      setError(null)

      const zoneData = {
        ...formData,
        avgPriceM2: Number(formData.avgPriceM2)
      }

      if (editingZone) {
        await zoneService.update(editingZone.id, zoneData)
      } else {
        await zoneService.create(zoneData)
      }

      await loadZones()
      handleCloseModal()
    } catch (err) {
      setError('Error al guardar la zona')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta zona?')) return

    try {
      await zoneService.delete(id)
      await loadZones()
    } catch (err) {
      setError('Error al eliminar la zona')
      console.error(err)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Helmet>
        <title>Gestionar Zonas - Panel Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Gestionar Zonas (Valor M²)</h1>
          <Button variant="info" onClick={() => handleShowModal()}>
            <FiPlus className="me-2" />
            Nueva Zona
          </Button>
        </div>

        {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

        <Card>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Zona/Comuna</th>
                  <th>Valor Promedio M²</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {zones.length > 0 ? (
                  zones.map(zone => (
                    <tr key={zone.id}>
                      <td><strong>{zone.name}</strong></td>
                      <td className="text-primary fw-bold">{formatPrice(zone.avgPriceM2)}</td>
                      <td>
                        <small className="text-muted">
                          {zone.description ? zone.description.substring(0, 80) + '...' : 'Sin descripción'}
                        </small>
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleShowModal(zone)}
                        >
                          <FiEdit2 />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(zone.id)}
                        >
                          <FiTrash2 />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No hay zonas registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingZone ? 'Editar Zona' : 'Nueva Zona'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Nombre de la Zona/Comuna *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: Las Condes, Providencia, Ñuñoa"
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Valor Promedio por M² *</Form.Label>
                    <Form.Control
                      type="number"
                      name="avgPriceM2"
                      value={formData.avgPriceM2}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="Ej: 4500000"
                    />
                    <Form.Text className="text-muted">
                      Valor en dólares estadounidenses (USD)
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Descripción (opcional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Información adicional sobre la zona, tendencias, características..."
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="info" type="submit" disabled={submitting}>
                {submitting ? 'Guardando...' : editingZone ? 'Actualizar' : 'Crear'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default ManageZonesPage
