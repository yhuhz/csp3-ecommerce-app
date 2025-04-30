import { useState, useEffect, useContext } from 'react';
import { UserProvider } from '../context/UserContext';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

export default function Home() {
  const { user } = useContext(UserProvider);
  const [productData, setProductData] = useState([]);

  const fetchData = () => {
    let fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/products/active`;

    fetch(fetchUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 3) {
          // Shuffle the array and select three random items
          const shuffled = data.sort(() => 0.5 - Math.random());
          setProductData(shuffled.slice(0, 3));
        } else {
          setProductData(data); // Use the full list if there are 3 or fewer items
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
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
