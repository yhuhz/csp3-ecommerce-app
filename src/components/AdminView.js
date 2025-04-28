import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProducts from './ArchiveProducts';
import AddProduct from './AddProduct';

export default function Products({ productData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(productData)) {
      setProducts(
        productData.map((product) => {
          return (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.imageUrl.slice(0, 15)}...</td>
              <td className={product.isActive ? 'text-success' : 'text-danger'}>
                {product.isActive ? 'Available' : 'Unavailable'}
              </td>
              <td className="text-center">
                <Button variant="info">Orders</Button>
              </td>
              <td>
                <EditProduct product={product} fetchData={fetchData} />
              </td>
              <td>
                <ArchiveProducts product={product} fetchData={fetchData} />
              </td>
            </tr>
          );
        })
      );
    }
  }, [productData, fetchData]);

  return (
    <>
      <h3 className="text-center mt-5">Admin Dashboard</h3>
      <AddProduct fetchData={fetchData} />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image URL</th>
            <th>Availability</th>
            <th className="text-center" colSpan={'3'}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    </>
  );
}
