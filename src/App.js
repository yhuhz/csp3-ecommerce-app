import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductView from './pages/ProductView';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import ResetPassword from './components/ResetPassword';
import Error from './pages/Error';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  function unsetUser() {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null,
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Set temporary user state before fetching to prevent redirection
      setUser((prevUser) => ({
        ...prevUser,
        id: localStorage.getItem('userId') || prevUser.id,
        isAdmin: localStorage.getItem('isAdmin') || prevUser.isAdmin,
      }));

      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) {
            localStorage.setItem('userId', data._id);
            localStorage.setItem('isAdmin', data.isAdmin);

            setUser({ id: data._id, isAdmin: data.isAdmin });
          } else {
            localStorage.clear();
            setUser({ id: null, isAdmin: null });
          }
        })
        .catch(() => {
          localStorage.clear();
          setUser({ id: null, isAdmin: null });
        });
    } else {
      setUser({ id: null, isAdmin: null });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/reset-password" element={<ResetPassword />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
