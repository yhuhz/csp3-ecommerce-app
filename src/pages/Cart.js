import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import UserContext from '../context/UserContext';

export default function Products() {
  const { user } = useContext(UserContext);

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/cart/get-cart`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPrice(data.cart.totalPrice);
        setCartData(
          data.cart.cartItems.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(item.subtotal)}
                </td>
              </tr>
            );
          })
        );
      });
  }, [user]);

  return user.id === null && user.isAdmin ? (
    <Navigate to="/login" />
  ) : (
    <>
      <h3 className="text-center my-5">My Cart</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartData}
          <tr>
            <td colSpan="3" className="fw-bold text-center">
              {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(totalPrice)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
