import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiHome, FiDroplet, FiMapPin, FiMaximize2 } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { formatPrice, formatArea } from '../../../utils/formatters'
import { PROPERTY_TYPES, OPERATION_TYPES } from '../../../utils/constants'
import './PropertyCard.css'

function PropertyCard({ property }) {
  const mainImage = property.images?.[0] || '/placeholder-property.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/propiedades/${property.id}`} className="text-decoration-none">
        <Card className="property-card h-100">
          <div className="property-card-image">
            <Card.Img 
              variant="top" 
              src={mainImage} 
              alt={property.title}
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'
              }}
            />
            <div className="property-card-badges">
              <Badge bg="dark" className="me-2">
                {OPERATION_TYPES[property.operation] || property.operation}
              </Badge>
              <Badge bg="danger">
                {PROPERTY_TYPES[property.type] || property.type}
              </Badge>
            </div>
          </div>

          <Card.Body>
            <div className="property-card-price mb-2">
              {formatPrice(property.price)}
            </div>

            <Card.Title className="property-card-title">
              {property.title}
            </Card.Title>

            <div className="property-card-location mb-3">
              <FiMapPin size={16} className="me-1" />
              <span>{property.zone}, {property.city}</span>
            </div>

            <div className="property-card-features">
              {property.bedrooms && (
                <span className="property-feature">
                  <FiHome size={18} />
                  {property.bedrooms} dorm.
                </span>
              )}
              {property.bathrooms && (
                <span className="property-feature">
                  <FiDroplet size={18} />
                  {property.bathrooms} baños
                </span>
              )}
              {property.m2 && (
                <div className="feature-item">
                  <FiMaximize2 size={18} />
                  <span>{formatArea(property.m2)}</span>
                </div>
              )}
            </div>

            {property.code && (
              <div className="property-card-code mt-2">
                Código: {property.code}
              </div>
            )}
          </Card.Body>
        </Card>
      </Link>
    </motion.div>
  )
}

export default PropertyCard
