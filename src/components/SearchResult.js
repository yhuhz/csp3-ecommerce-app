import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SearchResult({ product }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Img
          variant="top"
          src={product.imageUrl}
          style={{
            height: "300px",
            objectFit: "contain",
            backgroundColor: "#f8f9fa",
          }}
          alt={product.name}
        />
        <Card.Title>
          <a href="#" className="text-primary text-uppercase fw-bold">
            {product.name}
          </a>
        </Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <h5 className="text-warning"> ₱{product.price}</h5>
      </Card.Body>
      <Card.Footer>
        <Link
          to={`/products/${product._id}`}
          className="btn btn-primary w-100 mt-3"
        >
          Details
        </Link>
      </Card.Footer>
    </Card>
  );
}
