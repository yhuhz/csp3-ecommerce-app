import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Banner = () => {
  return (
    <div
      style={{
        padding: '50px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={8}>
            <div
              style={{
                backgroundColor: '#a5a5a5',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h1>Welcome to JN Store!</h1>
              <p>
                Your one-stop shop for everything you love. Explore now and find
                amazing deals!
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/products')}
              >
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
