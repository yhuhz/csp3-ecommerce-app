import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function ProductView() {
  const { user } = useContext(UserContext);

  const notyf = new Notyf();

  const { productId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/${productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.imageUrl);
      });
  }, [user]);

  const addToCart = () => {
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
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Img
              variant="top"
              src={image}
              style={{
                height: '300px',
                objectFit: 'contain',
                backgroundColor: '#f8f9fa',
              }}
              alt={name}
            />
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>

              <Card.Subtitle className="mt-3 mb-1 text-muted">
                Description:
              </Card.Subtitle>
              <Card.Text>{description}</Card.Text>

              <Card.Subtitle className="mt-3 mb-1 text-muted">
                Price:
              </Card.Subtitle>
              <Card.Title style={{ color: 'orange', fontWeight: 'bold' }}>
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(price)}
              </Card.Title>

              {user.id !== null ? (
                !user.isAdmin ? (
                  <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  ''
                )
              ) : (
                <Link to="/login" className="btn btn-danger w-100 mt-3">
                  Login to Add to Cart
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
