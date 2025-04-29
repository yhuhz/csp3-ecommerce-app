import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
} from "react-bootstrap";
import SearchResult from "./SearchResult";

export default function ProductSearch() {
  const [productName, setProductName] = useState("");
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
    setProductName("");
    setMinPrice(0);
    setMaxPrice(100000);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/search-by-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: productName }),
        }
      );
      const data = await response.json();
      setSearchResults(data[0]);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error searching for courses:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Product Search</h2>

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

        <div className="d-flex gap-2 mt-4">
          <Button variant="primary" onClick={handleSearch}>
            Search by Name
          </Button>
          <Button variant="primary">Search by Price</Button>
          <Button variant="danger" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </Form>
      {Array.isArray(searchResults) && searchResults.length > 0 && (
        <>
          <h4 className="mt-5">Search Results:</h4>
          {searchResults.map((product, index) => (
            <SearchResult key={index} product={product} />
          ))}
        </>
      )}
      <hr className="mt-5" />
    </Container>
  );
}
