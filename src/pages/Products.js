import { useState, useEffect, useContext } from 'react';
import { UserProvider } from '../context/UserContext';
import { Row, Col } from 'react-bootstrap';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
  const { user } = useContext(UserProvider);
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);

  const fetchData = () => {
    let fetchUrl =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
        : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

    fetch(fetchUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <p className="text-center my-5">Loading products...</p>
          </Col>
        </Row>
      ) : user.isAdmin ? (
        <AdminView productData={productData} fetchData={fetchData} />
      ) : (
        <UserView productData={productData} />
      )}
    </>
  );
}
