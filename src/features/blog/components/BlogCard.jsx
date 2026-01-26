import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiCalendar, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { formatDate } from '../../../utils/formatters'
import './BlogCard.css'

function BlogCard({ post }) {
  const readingTime = Math.ceil(post.content?.split(' ').length / 200) || 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/blog/${post.slug}`} className="text-decoration-none">
        <Card className="blog-card h-100">
          <div className="blog-card-image">
            <Card.Img 
              variant="top" 
              src={post.coverImage || 'https://via.placeholder.com/800x400?text=Blog+Post'} 
              alt={post.title}
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Sin+Imagen'
              }}
            />
            <Badge bg="primary" className="blog-card-badge">
              Inmobiliaria
            </Badge>
          </div>

          <Card.Body className="p-4">
            <div className="blog-card-meta mb-3">
              <span className="meta-item">
                <FiCalendar size={16} />
                {formatDate(post.createdAt)}
              </span>
              <span className="meta-item">
                <FiClock size={16} />
                {readingTime} min
              </span>
            </div>

            <Card.Title className="blog-card-title">
              {post.title}
            </Card.Title>

            <Card.Text className="blog-card-excerpt">
              {post.excerpt}
            </Card.Text>

            <div className="blog-card-footer">
              <span className="read-more">
                Leer más →
              </span>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </motion.div>
  )
}

export default BlogCard
