import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import SEO from '../../../layout/components/SEO'
import { FiCalendar, FiClock, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import { useBlogPost } from '../hooks/useBlog'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'
import FadeIn from '../../../layout/components/FadeIn'
import { formatDate } from '../../../utils/formatters'
import './BlogPostPage.css'

function BlogPostPage() {
  const { slug } = useParams()
  const { post, loading, error } = useBlogPost(slug)

  if (loading) {
    return (
      <Container className="py-5">
        <LoadingSpinner fullPage />
      </Container>
    )
  }

  if (error || !post) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Artículo no encontrado</h2>
          <p className="text-muted">El artículo que buscas no existe o ha sido eliminado.</p>
          <Button as={Link} to="/blog" variant="primary">
            <FiArrowLeft className="me-2" />
            Volver al Blog
          </Button>
        </div>
      </Container>
    )
  }

  const readingTime = Math.ceil(post.content?.split(' ').length / 200) || 5

  return (
    <>
      <SEO 
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        image={post.coverImage}
        url={`/blog/${post.slug}`}
        type="article"
        keywords="blog inmobiliario, consejos inmobiliarios, mercado inmobiliario, Venezuela"
      />

      <section className="py-4 bg-light">
        <Container>
          <Button 
            as={Link} 
            to="/blog" 
            variant="outline-secondary" 
            className="mb-3"
          >
            <FiArrowLeft className="me-2" />
            Volver al Blog
          </Button>
        </Container>
      </section>

      <article className="py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <FadeIn>
                {post.coverImage && (
                  <div className="post-cover-image mb-4">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-100 rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x600?text=Artículo'
                      }}
                    />
                  </div>
                )}

                <div className="post-header mb-4">
                  <Badge bg="primary" className="mb-3">Inmobiliaria</Badge>
                  
                  <h1 className="post-title">{post.title}</h1>
                  
                  <div className="post-meta">
                    <span className="meta-item">
                      <FiCalendar size={18} />
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="meta-item">
                      <FiClock size={18} />
                      {readingTime} min de lectura
                    </span>
                  </div>

                  <p className="post-excerpt">{post.excerpt}</p>
                </div>

                <div className="post-content">
                  {post.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index}>{paragraph}</p>
                    )
                  ))}
                </div>

                <div className="post-footer mt-5 pt-4 border-top">
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="outline-secondary" as={Link} to="/blog">
                      <FiArrowLeft className="me-2" />
                      Ver más artículos
                    </Button>
                    <Button variant="outline-primary">
                      <FiShare2 className="me-2" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <Card className="bg-primary text-white">
                <Card.Body className="p-4 text-center">
                  <h4 className="mb-3">¿Necesitas asesoría profesional?</h4>
                  <p className="mb-4">
                    Nuestro equipo está listo para ayudarte con todas tus necesidades inmobiliarias
                  </p>
                  <Button 
                    as={Link} 
                    to="/contacto" 
                    variant="light" 
                    size="lg"
                  >
                    Contáctanos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </article>
    </>
  )
}

export default BlogPostPage
