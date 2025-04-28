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
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
                <h5>{product.name}</h5>
                <p>{product.description}</p>
              </div>
            </Col>
          ))}
        </Row>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <button
            onClick={handlePrev}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              pointerEvents: currentIndex === 0 ? 'none' : 'auto',
              marginLeft: '10px',
            }}
          >
            &#60;
          </button>
          <button
            onClick={handleNext}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor:
                currentIndex + itemsPerPage >= products.length
                  ? 'not-allowed'
                  : 'pointer',
              pointerEvents:
                currentIndex + itemsPerPage >= products.length
                  ? 'none'
                  : 'auto',
              marginRight: '10px',
            }}
          >
            &#62;
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Highlights;
