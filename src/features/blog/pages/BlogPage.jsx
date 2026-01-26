import { Container } from 'react-bootstrap'
import SEO from '../../../layout/components/SEO'
import { useBlogPosts } from '../hooks/useBlog'
import BlogGrid from '../components/BlogGrid'
import FadeIn from '../../../layout/components/FadeIn'

function BlogPage() {
  const { posts, loading, error } = useBlogPosts({ published: true })

  return (
    <>
      <SEO 
        title="Blog Inmobiliario | Consejos y Tendencias del Mercado"
        description="Lee nuestros artículos sobre el mercado inmobiliario, consejos para comprar y vender propiedades, inversiones y tendencias del sector en Venezuela."
        keywords="blog inmobiliario, consejos inmobiliarios, mercado inmobiliario, comprar casa, vender propiedad, inversión, Venezuela"
        url="/blog"
      />

      <section className="py-5 bg-light">
        <Container>
          <FadeIn>
            <h1 className="section-title text-center mb-2">Blog Inmobiliario</h1>
            <p className="text-center text-muted mb-5 lead">
              Consejos, tendencias y novedades del mercado inmobiliario
            </p>
          </FadeIn>

          <BlogGrid posts={posts} loading={loading} error={error} />

          {!loading && posts.length > 0 && (
            <div className="text-center mt-4">
              <p className="text-muted">
                Mostrando {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default BlogPage
