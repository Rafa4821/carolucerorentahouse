import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Row, Col, Badge, Alert, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { blogService } from '../../blog/services/blogService'
import { storageService } from '../../../services/storageService'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import { formatDate } from '../../../utils/formatters'

function ManageBlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    published: false
  })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await blogService.getAll()
      setPosts(data)
    } catch (err) {
      setError('Error al cargar artículos')
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (post = null) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || '',
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || '',
        published: post.published || false
      })
    } else {
      setEditingPost(null)
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        seoTitle: '',
        seoDescription: '',
        published: false
      })
    }
    setShowModal(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingPost(null)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const url = await storageService.uploadImage(file, 'blog')
      setFormData(prev => ({
        ...prev,
        coverImage: url
      }))
    } catch (err) {
      setError('Error al subir imagen')
      console.error(err)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      setError(null)

      if (editingPost) {
        await blogService.update(editingPost.id, formData)
      } else {
        await blogService.create(formData)
      }

      await loadPosts()
      handleCloseModal()
    } catch (err) {
      setError('Error al guardar el artículo')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return

    try {
      await blogService.delete(id)
      await loadPosts()
    } catch (err) {
      setError('Error al eliminar el artículo')
      console.error(err)
    }
  }

  const handleTogglePublish = async (post) => {
    try {
      await blogService.update(post.id, { published: !post.published })
      await loadPosts()
    } catch (err) {
      setError('Error al cambiar estado')
      console.error(err)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Helmet>
        <title>Gestionar Blog - Panel Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Gestionar Blog</h1>
          <Button variant="success" onClick={() => handleShowModal()}>
            <FiPlus className="me-2" />
            Nuevo Artículo
          </Button>
        </div>

        {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

        <Card>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th style={{ width: '180px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? (
                  posts.map(post => (
                    <tr key={post.id}>
                      <td>
                        <div>
                          <strong>{post.title}</strong>
                          <br />
                          <small className="text-muted">{post.excerpt?.substring(0, 80)}...</small>
                        </div>
                      </td>
                      <td>
                        <Badge bg={post.published ? 'success' : 'secondary'}>
                          {post.published ? 'Publicado' : 'Borrador'}
                        </Badge>
                      </td>
                      <td>{formatDate(post.createdAt)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button 
                            as={Link}
                            to={`/blog/${post.slug}`}
                            variant="outline-success" 
                            size="sm"
                            title="Ver en sitio"
                          >
                            <FiExternalLink />
                          </Button>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleShowModal(post)}
                            title="Editar"
                          >
                            <FiEdit2 />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            title="Eliminar"
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No hay artículos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Título *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Título del artículo"
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Extracto *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      placeholder="Resumen breve del artículo..."
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Contenido *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={15}
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      placeholder="Contenido completo del artículo (usa saltos de línea para separar párrafos)..."
                    />
                    <Form.Text className="text-muted">
                      Escribe el contenido completo. Cada párrafo en una nueva línea.
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Imagen Destacada</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    <Form.Text className="text-muted">
                      {uploadingImage ? 'Subiendo imagen...' : 'Imagen principal del artículo'}
                    </Form.Text>
                  </Form.Group>
                  {formData.coverImage && (
                    <div className="mt-2">
                      <img 
                        src={formData.coverImage} 
                        alt="Preview"
                        style={{ maxWidth: '300px', height: 'auto' }}
                        className="rounded"
                      />
                    </div>
                  )}
                </Col>

                <Col md={12}><hr /></Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>SEO - Título</Form.Label>
                    <Form.Control
                      type="text"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleInputChange}
                      placeholder="Título optimizado para SEO (50-60 caracteres)"
                      maxLength={60}
                    />
                    <Form.Text className="text-muted">
                      {formData.seoTitle.length}/60
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>SEO - Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleInputChange}
                      placeholder="Meta descripción (150-160 caracteres)"
                      maxLength={160}
                    />
                    <Form.Text className="text-muted">
                      {formData.seoDescription.length}/160
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Check
                    type="checkbox"
                    name="published"
                    label="Publicar artículo"
                    checked={formData.published}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="success" type="submit" disabled={submitting || uploadingImage}>
                {submitting ? 'Guardando...' : editingPost ? 'Actualizar' : 'Crear'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default ManageBlogPage
