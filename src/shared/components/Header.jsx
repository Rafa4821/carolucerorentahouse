import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { FiHome, FiGrid, FiEdit3, FiLogIn } from 'react-icons/fi'
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
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <span className="text-primary">Carol Lucero</span>
          <span className="text-secondary ms-2">RAH</span>
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
              to="/blog" 
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              <FiEdit3 className="me-2" />
              Blog
            </Nav.Link>

            {currentUser ? (
              <Button 
                as={Link} 
                to="/admin" 
                variant="primary" 
                className="px-4"
                onClick={() => setExpanded(false)}
              >
                Admin
              </Button>
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
