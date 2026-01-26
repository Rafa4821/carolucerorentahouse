import { Spinner } from 'react-bootstrap'

function LoadingSpinner({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="text-center py-4">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  )
}

export default LoadingSpinner
