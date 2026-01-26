import { Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

function ManageBlogPage() {
  return (
    <>
      <Helmet>
        <title>Gestión de Blog - Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <h1 className="mb-4">Gestión de Blog</h1>
        <Card>
          <Card.Body>
            <p className="text-muted">Próximamente: CRUD completo de artículos</p>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default ManageBlogPage
