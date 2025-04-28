import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function AddProduct({ fetchData }) {
  const notyf = new Notyf();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [showAdd, setShowAdd] = useState(false);

  const addOpen = () => {
    setShowAdd(true);
  };

  const addClose = () => {
    setShowAdd(false);
  };

  const addProduct = (e, productId) => {
    e.preventDefault();

    fetch(
      `https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          imageUrl: imageUrl,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data._id !== null) {
          notyf.success('Product Added');
          addClose();
          fetchData();
        } else {
          notyf.error('Something went wrong. Please try again');
          addClose();
          fetchData();
        }
      });
  };

  return (
    <>
      <div className="text-center">
        <Button variant="primary" className="mb-5" onClick={() => addOpen()}>
          Add Product
        </Button>
      </div>

      <Modal show={showAdd} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => addProduct(e)}>
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
            <Button variant="secondary" onClick={addClose}>
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
