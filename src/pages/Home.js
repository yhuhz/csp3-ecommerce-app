import { useState, useEffect, useContext } from 'react';
import { UserProvider } from '../context/UserContext';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

export default function Home() {
  const { user } = useContext(UserProvider);
  const [productData, setProductData] = useState([]);

  const fetchData = () => {
    let fetchUrl =
      'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/products/active';

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
      <Banner />
      <Highlights productData={productData} />
    </>
  );
}
