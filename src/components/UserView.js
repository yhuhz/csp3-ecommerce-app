import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';



export default function UserView({ productData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(
      productData.map((products) => {
        return <></>
      })
    );
  }, [productData]);

  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Our Products</h1>
        </Col>
      </Row>
      

      {products}
    </>
  );
}
