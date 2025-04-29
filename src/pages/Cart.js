import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Products() {
  const { user } = useContext(UserContext);
  const notyf = new Notyf();

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (itemId, itemQuantity) => {
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/cart/update-cart-quantity`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: itemId,
          newQuantity: itemQuantity,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Item quantity changed successfully') {
          fetchData();
        } else {
          notyf.error('Error changing item quantity');
        }
      });
  };

  const removeItem = (itemId) => {
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/cart/${itemId}/remove-from-cart`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Item removed from cart successfully') {
          notyf.success('Item removed successfully');
          fetchData();
        } else {
          notyf.error('Error removing item');
        }
      });
  };

  const fetchData = () => {
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
        if (data.message === `User's cart not found`) {
          setTotalPrice(0);
          setCartData([]);
        } else {
          setTotalPrice(data.cart.totalPrice);
          setCartData(
            data.cart.cartItems.map((item) => {
              return (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>
                    {new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(item.subtotal)}
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-success btn-sm mx-2"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <i className="bi bi-dash-circle"></i>
                      </button>
                      <div className="mx-3">{item.quantity}</div>

                      <button
                        className="btn btn-success btn-sm mx-2"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <i className="bi bi-plus-circle"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => removeItem(item.productId)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })
          );
        }
      });
  };

  useEffect(() => {
    fetchData();
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
            <th className="text-center">Subtotal</th>
            <th className="text-center">Remove Item</th>
          </tr>
        </thead>
        <tbody>
          {cartData}
          <tr>
            <td colSpan="4" className="fw-bold text-center">
              {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(totalPrice || 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
