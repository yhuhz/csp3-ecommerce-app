import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Navigate, Link} from "react-router-dom";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";

export default function CourseView() {

    const {user} = useContext(UserContext);

    const notyf = new Notyf();
    const navigate = new useNavigate();

    const { productId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    useEffect(() => {
        fetch(`https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setImage(data.imageUrl);
        })
    })

    return (
        <Container className="mt-5">
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Card>
              <Card.Img 
                    variant="top" 
                    src={image} 
                    style={{ 
                        height: "300px",         
                        objectFit: "contain",    
                        backgroundColor: "#f8f9fa"
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
                  <Card.Title style={{ color: "orange", fontWeight: "bold" }}>
                    ₱{price}
                  </Card.Title>
      
                  {
                    user.id !== null ? (
                      <Button variant="primary" className="w-100 mt-3">
                        Add to Cart
                      </Button>
                    ) : (
                      <Link to="/login" className="btn btn-danger w-100 mt-3">
                        Login to Add to Cart
                      </Link>
                    )
                  }
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
      
}