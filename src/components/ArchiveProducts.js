import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function ArchiveProducts({ product, fetchData }) {
  const notyf = new Notyf();

  const [productId] = useState(product._id);
  const [isActive, setIsActive] = useState(product.isActive);

  function archiveToggle() {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`,
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
        if (data.success) {
          notyf.success('Product archived successfully');
          fetchData();
          setIsActive(false);
        } else {
          notyf.error('Something went wrong. Please try again');
          fetchData();
        }
      });
  }

  function activateToggle() {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`,
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
        if (data.success) {
          notyf.success('Product archived successfully');
          fetchData();
          setIsActive(true);
        } else {
          notyf.error('Something went wrong. Please try again');
          fetchData();
        }
      });
  }

  return (
    <>
      {isActive ? (
        <Button
          variant="danger"
          className="px-1 py-0"
          onClick={() => {
            archiveToggle();
          }}
        >
          <i class="bi bi-archive-fill"></i>
        </Button>
      ) : (
        <Button
          variant="success"
          className="px-1 py-0"
          onClick={() => {
            activateToggle();
          }}
        >
          <i class="bi bi-check-circle-fill"></i>
        </Button>
      )}
    </>
  );
}
