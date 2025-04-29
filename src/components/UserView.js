import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductSearch from './SearchProducts';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function UserView({ productData }) {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const notyf = new Notyf();

  useEffect(() => {
    setProducts(productData);
  }, [productData]);

  const addToCart = (e, productId) => {
    e.preventDefault();
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/cart/add-to-cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Item added to cart successfully') {
          notyf.success('Product Added to Cart');
        } else {
          notyf.error('Problem adding to cart');
        }
      });
  };

  return (
    <>
      <ProductSearch />
      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Our Products</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <Card
                className="h-100"
                style={{ boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  style={{ height: '250px', objectFit: 'cover' }}
                  alt={product.name}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>
                      <a
                        href={`/products/${product._id}`}
                        style={{
                          textDecoration: 'underline',
                          color: '#0d6efd',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
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
                        color: 'orange',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                    >
                      {new Intl.NumberFormat('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(product.price)}
                    </Card.Text>
                  </div>

                  <div className="d-flex flex-column flex-sm-row justify-content-center mt-3 gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-primary w-100"
                    >
                      Details
                    </Link>
                    {user.id !== null ? (
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={(e) => addToCart(e, product._id)}
                      >
                        <i className="bi bi-bag-plus-fill"></i> Add to Cart
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8} className="text-center">
            <h4>No products available.</h4>
          </Col>
        )}
      </Row>
    </>
  );
}
