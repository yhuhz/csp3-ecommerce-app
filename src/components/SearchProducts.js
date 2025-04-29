import { useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchResult from './SearchResult';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function ProductSearch() {
  const { user } = useContext(UserContext);
  const notyf = new Notyf();

  const [productName, setProductName] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [searchResults, setSearchResults] = useState([]);

  const handleMinIncrease = () => setMinPrice((prev) => prev + 100);
  const handleMinDecrease = () =>
    setMinPrice((prev) => Math.max(0, prev - 100));

  const handleMaxIncrease = () => setMaxPrice((prev) => prev + 100);
  const handleMaxDecrease = () =>
    setMaxPrice((prev) => Math.max(0, prev - 100));

  const handleClear = () => {
    setProductName('');
    setMinPrice(0);
    setMaxPrice(100000);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/search-by-name',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: productName }),
        }
      );
      const data = await response.json();
      setSearchResults(data[0]);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  const handleSearchByPrice = async () => {
    try {
      const response = await fetch(
        'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/search-by-price',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            minPrice: minPrice,
            maxPrice: maxPrice,
          }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6} md={8} sm={10}>
          <Card className="p-3 shadow-sm">
            <h2 className="text-center">Product Search</h2>
            <Form>
              <Form.Group controlId="productName" className="mb-3">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="minPrice" className="mb-3">
                <Form.Label>Minimum Price:</Form.Label>
                <InputGroup>
                  <Button variant="dark" onClick={handleMinDecrease}>
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="text-center"
                  />
                  <Button variant="dark" onClick={handleMinIncrease}>
                    +
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="maxPrice" className="mb-3">
                <Form.Label>Maximum Price:</Form.Label>
                <InputGroup>
                  <Button variant="dark" onClick={handleMaxDecrease}>
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="text-center"
                  />
                  <Button variant="dark" onClick={handleMaxIncrease}>
                    +
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-center gap-2 mt-4">
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleSearch}
                  disabled={!productName.trim()}
                  style={{ fontSize: '0.75rem' }} // Adjust size
                >
                  <i className="bi bi-search"></i> Search by Name
                </Button>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleSearchByPrice}
                  disabled={maxPrice < minPrice}
                  style={{ fontSize: '0.75rem' }} // Adjust size
                >
                  <i className="bi bi-tags"></i> Search by Price
                </Button>

                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleClear}
                  style={{ fontSize: '0.75rem' }} // Adjust size
                >
                  <i className="bi bi-x-square"></i> Clear
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      {searchResults.length > 0 ? (
        <>
          <h4 className="mt-5">Search Results:</h4>
          <Row xs={1} sm={2} md={3} className="g-4">
            {searchResults
              .filter((product) => product.isActive)
              .map((product, index) => (
                <Col key={index} className="d-flex">
                  <Card className="w-100 h-100 shadow-sm d-flex flex-column">
                    {/* Image at the top */}
                    <Card.Img
                      variant="top"
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />

                    <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                      {/* Title */}
                      <Card.Title className="text-center">
                        {product.name}
                      </Card.Title>

                      {/* Description */}
                      <Card.Text className="flex-grow-1 overflow-hidden">
                        {product.description}
                      </Card.Text>

                      {/* Buttons at the bottom */}
                      <div className="d-flex flex-column flex-sm-row justify-content-center mt-3 gap-2">
                        <Link
                          className="btn btn-primary w-100"
                          to={`/products/${product._id}`}
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
              ))}
          </Row>
        </>
      ) : (
        ''
      )}

      <hr className="mt-5" />
    </Container>
  );
}
