import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Row, Col, Badge, Alert, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiX, FiUpload, FiExternalLink, FiDownload, FiCheckSquare } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { propertyService } from '../../properties/services/propertyService'
import { storageService } from '../../../services/storageService'
import { PROPERTY_TYPES, OPERATION_TYPES, REGIONS, ZONES_BY_STATE } from '../../../utils/constants'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatPrice, formatDate } from '../../../utils/formatters'
import BulkImportModal from '../components/BulkImportModal'
import SearchableSelect from '../../../shared/components/SearchableSelect'

function ManagePropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [imagePreviews, setImagePreviews] = useState([])
  const [showBulkImport, setShowBulkImport] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    type: 'CASA',
    operation: 'VENTA',
    city: '',
    zone: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpaces: '',
    m2: '',
    yearBuilt: '',
    description: '',
    observations: '',
    images: [],
    code: '',
    flexCode: ''
  })

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await propertyService.getAll()
      setProperties(data)
    } catch (err) {
      setError('Error al cargar propiedades')
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (property = null) => {
    if (property) {
      setEditingProperty(property)
      setFormData({
        title: property.title,
        type: property.type,
        operation: property.operation,
        city: property.city,
        zone: property.zone,
        price: property.price,
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        parkingSpaces: property.parkingSpaces || '',
        m2: property.m2 || '',
        yearBuilt: property.yearBuilt || '',
        description: property.description,
        observations: property.observations || '',
        images: property.images || [],
        code: property.code,
        flexCode: property.flexCode || ''
      })
      setImagePreviews(property.images || [])
    } else {
      setEditingProperty(null)
      setFormData({
        title: '',
        type: 'CASA',
        operation: 'VENTA',
        city: '',
        zone: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        parkingSpaces: '',
        m2: '',
        yearBuilt: '',
        description: '',
        observations: '',
        images: [],
        code: propertyService.generateCode(),
        flexCode: ''
      })
      setImagePreviews([])
    }
    setShowModal(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProperty(null)
    setImagePreviews([])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Si cambia el estado, resetear la zona
    if (name === 'city') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        zone: ''
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const availableZones = formData.city ? ZONES_BY_STATE[formData.city] || [] : []

  const handleImageUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      setUploadingImages(true)
      const urls = await storageService.uploadMultipleImages(files, 'properties')
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }))
      setImagePreviews(prev => [...prev, ...urls])
    } catch (err) {
      setError('Error al subir imágenes')
      console.error(err)
    } finally {
      setUploadingImages(false)
    }
  }

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // Drag and drop para reordenar imágenes
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'))
    
    if (dragIndex === dropIndex) return

    const newImages = [...formData.images]
    const draggedImage = newImages[dragIndex]
    newImages.splice(dragIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)

    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
    setImagePreviews(newImages)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      setError(null)

      const propertyData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : 0,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : 0,
        parkingSpaces: formData.parkingSpaces ? Number(formData.parkingSpaces) : 0,
        m2: formData.m2 ? Number(formData.m2) : 0,
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : null
      }

      if (editingProperty) {
        await propertyService.update(editingProperty.id, propertyData)
      } else {
        await propertyService.create(propertyData)
      }

      await loadProperties()
      handleCloseModal()
    } catch (err) {
      setError('Error al guardar la propiedad')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(properties.map(p => p.id))
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
      alert('Selecciona al menos una propiedad para eliminar')
      return
    }

    if (!window.confirm(`¿Estás seguro de eliminar ${selectedItems.length} propiedad(es)?`)) return

    try {
      setSubmitting(true)
      await Promise.all(selectedItems.map(id => propertyService.delete(id)))
      setSelectedItems([])
      setSelectAll(false)
      await loadProperties()
      alert('Propiedades eliminadas exitosamente')
    } catch (err) {
      alert('Error al eliminar propiedades: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleBulkStatusChange = async (status) => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos una propiedad')
      return
    }

    try {
      setSubmitting(true)
      await Promise.all(selectedItems.map(id => 
        propertyService.update(id, { status })
      ))
      setSelectedItems([])
      setSelectAll(false)
      await loadProperties()
      alert(`Estado actualizado para ${selectedItems.length} propiedad(es)`)
    } catch (err) {
      alert('Error al actualizar estado: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleExportSelected = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos una propiedad para exportar')
      return
    }

    const selectedProps = properties.filter(p => selectedItems.includes(p.id))
    const headers = ['Título', 'Tipo', 'Operación', 'Estado', 'Zona', 'Precio', 'M²', 'Dormitorios', 'Baños', 'Código Flex']
    const rows = selectedProps.map(p => [
      p.title,
      p.type,
      p.operation,
      p.city,
      p.zone,
      p.price,
      p.m2,
      p.bedrooms,
      p.bathrooms,
      p.flexCode
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `propiedades_seleccionadas_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta propiedad?')) return

    try {
      await propertyService.delete(id)
      await loadProperties()
    } catch (err) {
      setError('Error al eliminar la propiedad')
      console.error(err)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Helmet>
        <title>Gestionar Propiedades - Panel Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Gestionar Propiedades</h1>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setShowBulkImport(true)}>
              <FiUpload className="me-2" />
              Importación Masiva
            </Button>
            <Button variant="primary" onClick={() => handleShowModal()}>
              <FiPlus className="me-2" />
              Nueva Propiedad
            </Button>
          </div>
        </div>

        {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

        {selectedItems.length > 0 && (
          <Alert variant="info" className="d-flex justify-content-between align-items-center">
            <span><strong>{selectedItems.length}</strong> propiedad(es) seleccionada(s)</span>
            <div className="d-flex gap-2">
              <Button variant="outline-success" size="sm" onClick={handleExportSelected}>
                <FiDownload className="me-1" /> Exportar
              </Button>
              <Button variant="outline-warning" size="sm" onClick={() => handleBulkStatusChange('DISPONIBLE')}>
                Marcar Disponible
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={() => handleBulkStatusChange('VENDIDA')}>
                Marcar Vendida
              </Button>
              <Button variant="danger" size="sm" onClick={handleBulkDelete} disabled={submitting}>
                <FiTrash2 className="me-1" /> Eliminar
              </Button>
            </div>
          </Alert>
        )}

        <Card>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>
                    <Form.Check
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      label=""
                    />
                  </th>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Operación</th>
                  <th>Ubicación</th>
                  <th>Precio</th>
                  <th>Fecha</th>
                  <th style={{ width: '200px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {properties.length > 0 ? (
                  properties.map(property => (
                    <tr key={property.id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedItems.includes(property.id)}
                          onChange={() => handleSelectItem(property.id)}
                          label=""
                        />
                      </td>
                      <td><Badge bg="secondary">{property.code}</Badge></td>
                      <td>{property.title}</td>
                      <td>{PROPERTY_TYPES[property.type]}</td>
                      <td><Badge bg="primary">{OPERATION_TYPES[property.operation]}</Badge></td>
                      <td>{property.zone}, {property.city}</td>
                      <td className="text-primary fw-bold">{formatPrice(property.price)}</td>
                      <td>{formatDate(property.createdAt)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button 
                            as={Link}
                            to={`/propiedades/${property.id}`}
                            variant="outline-success" 
                            size="sm"
                            title="Ver en sitio"
                          >
                            <FiExternalLink />
                          </Button>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleShowModal(property)}
                            title="Editar"
                          >
                            <FiEdit2 />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                            title="Eliminar"
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No hay propiedades registradas. <Link to="/propiedades">Ver todas las propiedades del sitio</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="g-3">
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Título *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: Casa moderna en Las Condes"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                      type="text"
                      name="code"
                      value={formData.code}
                      readOnly
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tipo *</Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Operación *</Form.Label>
                    <Form.Select
                      name="operation"
                      value={formData.operation}
                      onChange={handleInputChange}
                      required
                    >
                      {Object.entries(OPERATION_TYPES).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Estados *</Form.Label>
                    <Form.Select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona...</option>
                      {REGIONS.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Zonas *</Form.Label>
                    <SearchableSelect
                      name="zone"
                      value={formData.zone}
                      onChange={handleInputChange}
                      options={availableZones}
                      placeholder={formData.city ? 'Selecciona una zona' : 'Primero selecciona un estado'}
                      disabled={!formData.city}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="0"
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Dorm.</Form.Label>
                    <Form.Control
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Baños</Form.Label>
                    <Form.Control
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Estac.</Form.Label>
                    <Form.Control
                      type="number"
                      name="parkingSpaces"
                      value={formData.parkingSpaces}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>m²</Form.Label>
                    <Form.Control
                      type="number"
                      name="m2"
                      value={formData.m2}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="Ej: 125.50"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Año Construcción</Form.Label>
                    <Form.Control
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      placeholder="Ej: 2020"
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Código Flex (ID del inmueble) *</Form.Label>
                    <Form.Control
                      type="text"
                      name="flexCode"
                      value={formData.flexCode}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: FLEX-12345"
                    />
                    <Form.Text className="text-muted">
                      Este es el identificador del inmueble en tu base de datos externa
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Descripción *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Descripción detallada de la propiedad..."
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="observations"
                      value={formData.observations}
                      onChange={handleInputChange}
                      placeholder="Notas adicionales, estado de la propiedad, reparaciones necesarias, etc."
                    />
                    <Form.Text className="text-muted">
                      Este campo es opcional y puede incluir información interna sobre el inmueble
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Imágenes</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImages}
                    />
                    <Form.Text className="text-muted">
                      {uploadingImages ? 'Subiendo imágenes...' : 'Puedes subir múltiples imágenes'}
                    </Form.Text>
                  </Form.Group>
                </Col>

                {imagePreviews.length > 0 && (
                  <Col md={12}>
                    <div className="mb-2">
                      <small className="text-muted">
                        <strong>Tip:</strong> Arrastra las imágenes para cambiar el orden. La primera imagen será la portada.
                      </small>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {imagePreviews.map((url, index) => (
                        <div 
                          key={index} 
                          className="position-relative" 
                          style={{ 
                            width: '120px', 
                            height: '120px',
                            cursor: 'move',
                            border: index === 0 ? '3px solid var(--color-primary)' : '2px solid transparent',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                          }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          {index === 0 && (
                            <Badge 
                              bg="danger" 
                              className="position-absolute top-0 start-0 m-1"
                              style={{ zIndex: 2 }}
                            >
                              Portada
                            </Badge>
                          )}
                          <img 
                            src={url} 
                            alt={`Preview ${index + 1}`}
                            className="w-100 h-100 object-fit-cover rounded"
                            style={{ pointerEvents: 'none' }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-1"
                            style={{ zIndex: 2 }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <FiX size={12} />
                          </Button>
                          <div 
                            className="position-absolute bottom-0 start-0 w-100 text-center py-1"
                            style={{ 
                              background: 'rgba(0,0,0,0.7)', 
                              color: 'white',
                              fontSize: '11px',
                              borderBottomLeftRadius: '6px',
                              borderBottomRightRadius: '6px'
                            }}
                          >
                            Imagen {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                )}
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={submitting || uploadingImages}>
                {submitting ? 'Guardando...' : editingProperty ? 'Actualizar' : 'Crear'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <BulkImportModal
          show={showBulkImport}
          onHide={() => setShowBulkImport(false)}
          onSuccess={loadProperties}
        />
      </div>
    </>
  )
}

export default ManagePropertiesPage
