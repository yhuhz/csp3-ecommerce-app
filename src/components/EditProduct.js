import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function EditProduct({ product, fetchData }) {
  const notyf = new Notyf();

  const [productId] = useState(product._id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const [showEdit, setShowEdit] = useState(false);

  const editOpen = () => {
    setShowEdit(true);
  };

  const editClose = () => {
    setShowEdit(false);
  };

  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/${productId}/update`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          notyf.success('Successfully Updated');
          editClose();
          fetchData();
        } else {
          notyf.error('Something went wrong. Please try again');
          editClose();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button variant="primary" className="mx-1" onClick={() => editOpen()}>
        Edit
      </Button>

      <Modal show={showEdit} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="Number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={editClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
