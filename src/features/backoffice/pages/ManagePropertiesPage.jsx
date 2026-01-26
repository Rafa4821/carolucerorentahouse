import { Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

function ManagePropertiesPage() {
  return (
    <>
      <Helmet>
        <title>Gestión de Propiedades - Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <h1 className="mb-4">Gestión de Propiedades</h1>
        <Card>
          <Card.Body>
            <p className="text-muted">Próximamente: CRUD completo de propiedades</p>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default ManagePropertiesPage
