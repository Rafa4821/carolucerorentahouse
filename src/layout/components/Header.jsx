import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { FiHome, FiGrid, FiEdit3, FiMail, FiLogIn } from 'react-icons/fi'
import { useAuth } from '../../features/auth/context/AuthContext'
import './Header.css'

function Header() {
  const [expanded, setExpanded] = useState(false)
  const { currentUser } = useAuth()

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm py-3"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/carolucero-rah.firebasestorage.app/o/logo%20rah%20horizontal%20sin%20fondo%20con%20nombre.png?alt=media"
            alt="Carolina Lucero RAH - Rent-A-House"
            className="navbar-logo"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="main-navbar" 
          onClick={() => setExpanded(!expanded)}
        />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              <FiHome className="me-2" />
              Inicio
            </Nav.Link>
            
            <Nav.Link 
              as={NavLink} 
              to="/propiedades" 
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              <FiGrid className="me-2" />
              Propiedades
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/conoce-tu-m2" 
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Conoce tu M²
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/blog" 
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              <FiEdit3 className="me-2" />
              Blog
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/contacto" 
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              <FiMail className="me-2" />
              Contacto
            </Nav.Link>

            {currentUser ? (
              <div className="d-flex gap-2">
                <Button 
                  as={Link} 
                  to="/admin" 
                  variant="primary" 
                  className="px-4"
                  onClick={() => setExpanded(false)}
                >
                  Panel Admin
                </Button>
              </div>
            ) : (
              <Button 
                as={Link} 
                to="/login" 
                variant="outline-primary" 
                className="px-4"
                onClick={() => setExpanded(false)}
              >
                <FiLogIn className="me-2" />
                Ingresar
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
