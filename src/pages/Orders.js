import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);

  const fetchData = () => {
    const fetchURL = user.isAdmin
      ? `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/orders/all-orders`
      : `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/orders/my-orders`;

    fetch(fetchURL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const rows = [];

        data.orders.forEach((order) => {
          let orderArray = [];

          if (user.isAdmin) {
            order.productsOrdered.forEach((product) => {
              orderArray.push({
                orderId: order._id,
                productId: product.productId,
                productName: product.productName,
                quantity: product.quantity,
                subtotal: product.subtotal,
                orderedOn: order.orderedOn,
              });
            });

            orderArray.forEach((o) => {
              rows.push(
                <tr key={`${o.productId}-${o.orderedOn}`}>
                  <td>{o.orderId}</td>
                  <td>{o.productName}</td>
                  <td>
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(o.subtotal / o.quantity)}
                  </td>
                  <td>{o.quantity}</td>
                  <td>
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(o.subtotal)}
                  </td>
                  <td>
                    {new Date(o.orderedOn).toLocaleDateString()}{" "}
                    {new Date(o.orderedOn).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              );
            });
          } else {
            order.productsOrdered.forEach((product) => {
              orderArray.push({
                productId: product.productId,
                productName: product.productName,
                quantity: product.quantity,
                subtotal: product.subtotal,
                orderedOn: order.orderedOn,
              });
            });

            orderArray.forEach((o) => {
              rows.push(
                <tr key={`${o.productId}-${o.orderedOn}`}>
                  <td>{o.productName}</td>
                  <td>
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(o.subtotal / o.quantity)}
                  </td>
                  <td>{o.quantity}</td>
                  <td>
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(o.subtotal)}
                  </td>
                  <td>
                    {new Date(o.orderedOn).toLocaleDateString()}{" "}
                    {new Date(o.orderedOn).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              );
            });
          }
        });

        setOrderData(rows);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return user.id === null ? (
    <Navigate to={"/orders"} />
  ) : (
    <>
      {user.isAdmin ? (
        <>
          <h3>All Orders</h3>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>{orderData}</tbody>
          </Table>
        </>
      ) : (
        <>
          <h3 className="text-center my-5">My Orders</h3>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>{orderData}</tbody>
          </Table>
        </>
      )}
    </>
  );
}
