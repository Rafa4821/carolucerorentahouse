import { useEffect, useState } from 'react'
import { Container, Alert, Spinner, Card, Row, Col } from 'react-bootstrap'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { testFirebaseConnection, auth, db, storage } from '../../services/firebase'

function FirebaseTest() {
  const [status, setStatus] = useState({
    loading: true,
    connected: false,
    auth: false,
    firestore: false,
    storage: false
  })

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await testFirebaseConnection()
        
        setStatus({
          loading: false,
          connected: true,
          auth: !!auth,
          firestore: !!db,
          storage: !!storage
        })
      } catch (error) {
        console.error('Error verificando Firebase:', error)
        setStatus({
          loading: false,
          connected: false,
          auth: false,
          firestore: false,
          storage: false
        })
      }
    }

    checkConnection()
  }, [])

  if (status.loading) {
    return (
      <Container className="my-4">
        <Card>
          <Card.Body className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 mb-0">Verificando conexión a Firebase...</p>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <h5 className="mb-3">🔥 Estado de Firebase</h5>
          
          {status.connected ? (
            <Alert variant="success">
              <FiCheckCircle className="me-2" />
              Firebase inicializado correctamente
            </Alert>
          ) : (
            <Alert variant="warning">
              <FiXCircle className="me-2" />
              Configura las variables de entorno en .env
            </Alert>
          )}

          <Row className="g-3">
            <Col md={4}>
              <div className="d-flex align-items-center">
                {status.auth ? (
                  <FiCheckCircle className="text-success me-2" size={24} />
                ) : (
                  <FiXCircle className="text-danger me-2" size={24} />
                )}
                <div>
                  <strong>Authentication</strong>
                  <div className="small text-muted">
                    {status.auth ? 'Conectado' : 'Desconectado'}
                  </div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="d-flex align-items-center">
                {status.firestore ? (
                  <FiCheckCircle className="text-success me-2" size={24} />
                ) : (
                  <FiXCircle className="text-danger me-2" size={24} />
                )}
                <div>
                  <strong>Firestore</strong>
                  <div className="small text-muted">
                    {status.firestore ? 'Conectado' : 'Desconectado'}
                  </div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="d-flex align-items-center">
                {status.storage ? (
                  <FiCheckCircle className="text-success me-2" size={24} />
                ) : (
                  <FiXCircle className="text-danger me-2" size={24} />
                )}
                <div>
                  <strong>Storage</strong>
                  <div className="small text-muted">
                    {status.storage ? 'Conectado' : 'Desconectado'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {!status.connected && (
            <div className="mt-3">
              <Alert variant="info" className="mb-0">
                <strong>Instrucciones:</strong>
                <ol className="mb-0 mt-2">
                  <li>Crea un proyecto en Firebase Console</li>
                  <li>Copia las credenciales del proyecto</li>
                  <li>Pégalas en el archivo <code>.env</code></li>
                  <li>Reinicia el servidor de desarrollo</li>
                </ol>
              </Alert>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default FirebaseTest
