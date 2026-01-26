import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { FiLock, FiMail } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, currentUser } = useAuth()
  const navigate = useNavigate()

  // Navigate to admin when user is authenticated
  useEffect(() => {
    if (currentUser) {
      navigate('/admin', { replace: true })
    }
  }, [currentUser, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    try {
      setError('')
      setLoading(true)
      await login(email, password)
      // Don't navigate here - let the useEffect handle it when currentUser updates
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      setError('Credenciales inválidas. Por favor verifica tu email y contraseña.')
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Carolina Lucero RAH</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="login-page">
        <Container>
          <div className="login-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="login-card shadow-lg">
                <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="login-icon mb-3">
                    <FiLock size={48} />
                  </div>
                  <h2 className="fw-bold">Bienvenido</h2>
                  <p className="text-muted">Ingresa a tu cuenta de administrador</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FiMail className="me-2" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FiLock className="me-2" />
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                  </Button>
                </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default LoginPage
