import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import { FiHome, FiGrid, FiEdit3, FiLogOut, FiExternalLink, FiEye, FiMapPin, FiMail } from 'react-icons/fi'
import { useAuth } from '../../auth/context/AuthContext'
import './AdminLayout.css'

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

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
      <Navbar bg="dark" variant="dark" className="py-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin" className="fw-bold">
            Panel Admin - Carolina Lucero RAH
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/admin" className="text-white">
              <FiHome className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/propiedades" className="text-white">
              <FiGrid className="me-2" />
              Propiedades
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/blog" className="text-white">
              <FiEdit3 className="me-2" />
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/zonas" className="text-white">
              <FiMapPin className="me-2" />
              Zonas
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/solicitudes" className="text-white">
              <FiMail className="me-2" />
              Solicitudes
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

            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              <FiLogOut className="me-2" />
              Salir
            </Button>
          </Nav>
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
