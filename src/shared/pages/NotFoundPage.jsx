import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - Carol Lucero RAH</title>
      </Helmet>
      
      <Container className="py-5 text-center">
        <div className="py-5 my-5">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="mb-4">Página no encontrada</h2>
          <p className="lead text-muted mb-4">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg" className="px-5">
            <FiHome className="me-2" />
            Volver al Inicio
          </Button>
        </div>
      </Container>
    </>
  )
}

export default NotFoundPage
