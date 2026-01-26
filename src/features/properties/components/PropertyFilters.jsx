import { useState } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { FiSearch, FiX } from 'react-icons/fi'
import { PROPERTY_TYPES, OPERATION_TYPES, REGIONS } from '../../../utils/constants'

function PropertyFilters({ onFilter, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    type: initialFilters.type || '',
    operation: initialFilters.operation || '',
    city: initialFilters.city || '',
    zone: initialFilters.zone || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    bedrooms: initialFilters.bedrooms || '',
    bathrooms: initialFilters.bathrooms || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    )
    onFilter(cleanFilters)
  }

  const handleClear = () => {
    setFilters({
      type: '',
      operation: '',
      city: '',
      zone: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    })
    onFilter({})
  }

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body className="p-4">
        <h5 className="mb-4">Filtrar Propiedades</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Tipo</Form.Label>
                <Form.Select
                  name="type"
                  value={filters.type}
                  onChange={handleChange}
                >
                  <option value="">Todos los tipos</option>
                  {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Operación</Form.Label>
                <Form.Select
                  name="operation"
                  value={filters.operation}
                  onChange={handleChange}
                >
                  <option value="">Todas</option>
                  {Object.entries(OPERATION_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Ciudad/Región</Form.Label>
                <Form.Select
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                >
                  <option value="">Todas</option>
                  {REGIONS.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Zona/Comuna</Form.Label>
                <Form.Control
                  type="text"
                  name="zone"
                  value={filters.zone}
                  onChange={handleChange}
                  placeholder="Ej: Las Condes"
                />
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Precio Mínimo</Form.Label>
                <Form.Control
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="$ 0"
                  min="0"
                />
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Precio Máximo</Form.Label>
                <Form.Control
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="$ Sin límite"
                  min="0"
                />
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Dormitorios</Form.Label>
                <Form.Select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleChange}
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="small fw-medium">Baños</Form.Label>
                <Form.Select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleChange}
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <div className="d-flex gap-2 justify-content-end">
                <Button 
                  type="button" 
                  variant="outline-secondary" 
                  onClick={handleClear}
                >
                  <FiX className="me-2" />
                  Limpiar
                </Button>
                <Button type="submit" variant="primary">
                  <FiSearch className="me-2" />
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default PropertyFilters
