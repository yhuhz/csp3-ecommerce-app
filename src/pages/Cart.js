import { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
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

  const clearCart = () => {
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/cart/clear-cart`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Cart cleared successfully') {
          notyf.success('Cart cleared successfully');
          fetchData();
        } else {
          notyf.error('Error clearing cart');
        }
      });
  };

  const checkoutItems = () => {
    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/orders/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productsOrdered: cartData,
          totalPrice: totalPrice,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notyf.error('Error checking out items');
        } else {
          notyf.success('Items checked out successfully');
          fetchData();
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
                  <td className="text-center">
                    {new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(item.subtotal / item.quantity)}
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-success btn-sm p-0 mx-0 px-1"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <i className="bi bi-dash-circle"></i>
                      </button>
                      <div className="mx-3">{item.quantity}</div>
                      <button
                        className="btn btn-success btn-sm p-0 mx-0 px-1"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <i className="bi bi-plus-circle"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    {new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(item.subtotal)}
                  </td>

                  <td className="text-center">
                    <Button
                      variant="danger"
                      className="btn-sm p-0 px-1"
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
    <Navigate to="/" />
  ) : (
    <>
      <h3 className="text-center my-5">My Cart</h3>

      {cartData.length > 0 ? (
        <>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center col-1">Subtotal</th>
                <th className="text-center col-1">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartData}
              <tr className="align-items-center">
                <td style={{ backgroundColor: '#d9b768' }}>
                  <Button
                    variant="success"
                    className="px-2 py-0"
                    onClick={checkoutItems}
                  >
                    Checkout <i className="bi bi-cart-check-fill"></i>
                  </Button>
                </td>
                <td
                  colSpan="4"
                  className="fw-bold text-center"
                  style={{ backgroundColor: '#d9b768' }}
                >
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(totalPrice || 0)}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="danger" className="px-1 py-1" onClick={clearCart}>
            Clear Cart <i className="bi bi-trash3-fill"></i>
          </Button>
        </>
      ) : (
        <div className="text-center">
          <h4>Your cart is empty right now.</h4>
          <Link to={'/products'} className="btn btn-primary">
            Let's add some!
          </Link>
        </div>
      )}
    </>
  );
}
