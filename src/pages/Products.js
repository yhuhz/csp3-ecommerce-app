import { useState, useEffect, useContext } from 'react';
import { UserProvider } from '../context/UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
  const { user } = useContext(UserProvider);
  const [productData, setProductData] = useState([]);

  const fetchData = () => {
    let fetchUrl =
      user.isAdmin === true
        ? 'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/all'
        : 'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/active';

    fetch(fetchUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      {user.isAdmin ? (
        <AdminView productData={productData} fetchData={fetchData} />
      ) : (
        <UserView productData={productData} />
      )}
    </>
  );
}
