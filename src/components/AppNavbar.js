import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  // const [user, setUser] = useState(localStorage.getItem('token'));
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#a5a5a5' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          JN Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            {user.id !== null && !user.isAdmin ? (
              <Nav.Link as={NavLink} to="/cart">
                Cart
              </Nav.Link>
            ) : (
              ''
            )}

            {user.id !== null ? (
              <>
                <Nav.Link as={NavLink} to="/orders">
                  Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
