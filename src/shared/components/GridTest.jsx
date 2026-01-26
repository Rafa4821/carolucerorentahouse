import { Container, Row, Col } from 'react-bootstrap'

function GridTest() {
  return (
    <Container className="my-5">
      <h3 className="mb-4">Bootstrap Grid Test - Responsive</h3>
      <Row className="g-3">
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className="p-3 bg-primary text-white text-center">
            xs=12 sm=6 md=4 lg=3
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className="p-3 bg-secondary text-white text-center">
            xs=12 sm=6 md=4 lg=3
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className="p-3 bg-success text-white text-center">
            xs=12 sm=6 md=4 lg=3
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className="p-3 bg-danger text-white text-center">
            xs=12 sm=6 md=4 lg=3
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default GridTest
