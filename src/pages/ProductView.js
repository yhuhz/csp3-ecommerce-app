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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.imageUrl);
      });
  }, [user]);

  const addToCart = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
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
                  <>
                    <div className="d-flex flex-column align-items-center gap-2">
                      <span>Quantity:</span>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            if (quantity === 1 || quantity < 1) {
                              notyf.error('Quantity cannot be less than one');
                            } else {
                              setQuantity(quantity - 1);
                            }
                          }}
                        >
                          <i className="bi bi-dash"></i>
                        </Button>

                        <input
                          type="number"
                          className="form-control text-center px-0"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          style={{ width: '60px' }} // Adjust width if needed
                        />

                        <Button
                          variant="outline-secondary"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <i className="bi bi-plus"></i>
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="success"
                      className="w-100 mt-3"
                      onClick={addToCart}
                      disabled={quantity < 1}
                    >
                      Add to Cart
                    </Button>
                  </>
                ) : (
                  ''
                )
              ) : (
                <Link to="/login" className="btn btn-warning w-100 mt-3">
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
