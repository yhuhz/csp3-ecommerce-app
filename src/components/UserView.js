import { Row, Col, Card, Button } from 'react-bootstrap';

export default function UserView({ productData }) {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Our Products</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {productData.map((product) => (
          <Col key={product._id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>
                    <a 
                      href="#"
                      style={{
                        textDecoration: "underline",
                        color: "#0d6efd",
                        fontWeight: "bold",
                        fontSize: "1.1rem"
                      }}
                    >
                      {product.name}
                    </a>
                  </Card.Title>
                  <Card.Text className="mt-3">
                    {product.description}
                  </Card.Text>
                  <Card.Text 
                    style={{ 
                      color: "orange", 
                      fontWeight: "bold",
                      fontSize: "1.2rem"
                    }}
                  >
                    ₱{product.price}
                  </Card.Text>
                </div>

                <div className="mt-3">
                  <Button 
                    variant="primary" 
                    className="w-100"
                  >
                    Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
