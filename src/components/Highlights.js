import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Highlights = ({ productData }) => {
  const products = productData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const currentProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div
      style={{
        padding: '50px 0',
        position: 'relative',
      }}
    >
      <Container>
        <h2 style={{ textAlign: 'center', color: 'white' }}>
          ✨ Highlights ✨
        </h2>
        <p style={{ textAlign: 'center', color: 'white' }}>
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
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                />

                <h5>{product.name}</h5>
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
