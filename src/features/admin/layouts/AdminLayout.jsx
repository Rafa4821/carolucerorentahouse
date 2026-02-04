import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import { FiHome, FiGrid, FiEdit3, FiLogOut, FiExternalLink, FiEye, FiMapPin, FiMail, FiMessageSquare, FiActivity, FiMenu } from 'react-icons/fi'
import { useAuth } from '../../auth/context/AuthContext'
import './AdminLayout.css'
import '../styles/admin-responsive.css'

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="admin-layout">
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} onToggle={setExpanded} className="py-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin" className="fw-bold">
            <span className="d-none d-md-inline">Panel Admin - Carolina Lucero RAH</span>
            <span className="d-inline d-md-none">Admin Panel</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav">
            <FiMenu size={24} color="white" />
          </Navbar.Toggle>
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-3">
              <Nav.Link as={Link} to="/admin" className="text-white" onClick={() => setExpanded(false)}>
              <FiHome className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/propiedades" className="text-white" onClick={() => setExpanded(false)}>
              <FiGrid className="me-2" />
              Propiedades
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/blog" className="text-white" onClick={() => setExpanded(false)}>
              <FiEdit3 className="me-2" />
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/zonas" className="text-white" onClick={() => setExpanded(false)}>
              <FiMapPin className="me-2" />
              Zonas
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/solicitudes-m2" className="text-white" onClick={() => setExpanded(false)}>
              <FiActivity className="me-2" />
              Solicitudes M²
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/consultas" className="text-white" onClick={() => setExpanded(false)}>
              <FiMessageSquare className="me-2" />
              Consultas
            </Nav.Link>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" size="sm">
                <FiEye className="me-2" />
                Ver Sitio
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/">
                  <FiHome className="me-2" />
                  Ir al Inicio
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/propiedades">
                  <FiGrid className="me-2" />
                  Ver Propiedades
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/blog">
                  <FiEdit3 className="me-2" />
                  Ver Blog
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  href="/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FiExternalLink className="me-2" />
                  Abrir en nueva pestaña
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={() => {
                handleLogout()
                setExpanded(false)
              }}
              className="mt-2 mt-lg-0 w-100 w-lg-auto"
            >
              <FiLogOut className="me-2" />
              Salir
            </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="admin-content">
        <Container fluid className="py-4">
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default AdminLayout
