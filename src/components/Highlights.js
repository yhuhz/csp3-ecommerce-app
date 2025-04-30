import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Highlights = ({ productData }) => {
  const products = productData;

  const [currentIndex] = useState(0);
  const itemsPerPage = 3;

  const currentProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div
      style={{
        padding: '20px 0',
        position: 'relative',
      }}
    >
      <Container>
        <h1 style={{ textAlign: 'center' }}>Featured Products</h1>
        <p style={{ textAlign: 'center' }}>
          Discover our top picks and latest features!
        </p>
        <Row>
          {currentProducts.map((product, index) => (
            <Col
              key={index}
              md={4}
              style={{ textAlign: 'center', padding: '10px' }}
            >
              <div>
                <img
                  src={
                    product.imageUrl
                      ? product.imageUrl
                      : 'https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg'
                  }
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    transition: 'transform 0.3s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                  onClick={() => {
                    window.location.href = `/products/${product._id}`;
                  }}
                />

                <h5 className="mt-3">{product.name}</h5>
                <p>{product.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Highlights;
