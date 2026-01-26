import { Row, Col, Alert } from 'react-bootstrap'
import BlogCard from './BlogCard'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'

function BlogGrid({ posts, loading, error }) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error al cargar artículos: {error}
      </Alert>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <Alert variant="info">
        No hay artículos publicados aún.
      </Alert>
    )
  }

  return (
    <Row className="g-4">
      {posts.map(post => (
        <Col key={post.id} xs={12} md={6} lg={4}>
          <BlogCard post={post} />
        </Col>
      ))}
    </Row>
  )
}

export default BlogGrid
