import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Banner = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #eeaeca, #94bbe9)',
        padding: '50px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h1>Welcome to Our Store!</h1>
              <p>
                Your one-stop shop for everything you love. Explore now and find
                amazing deals!
              </p>
              <Button variant="light" size="lg">
                Shop Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
