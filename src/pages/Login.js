import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {
  const notyf = new Notyf();

  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function loginUser(e) {
    e.preventDefault();
    fetch(
      'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/users/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.access !== undefined) {
          // console.log( data.access);
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);

          setEmail('');
          setPassword('');
          notyf.success('You are logged in');
        } else if (data.message === 'Incorrect email or password') {
          notyf.error(data.message);
        } else if (data.message === 'No email found') {
          notyf.error('Email does not exist');
        } else {
          notyf.error('Error logging in');
        }
      });
  }

  function retrieveUserDetails(token) {
    fetch(
      'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/users/details',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  }

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center">
          <h1 className="mb-4">Login</h1>
        </Col>
      </Row>

      <Form onSubmit={(e) => loginUser(e)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        {isActive ? (
          <Button variant="primary" type="submit">
            Login
          </Button>
        ) : (
          <Button variant="danger" type="submit" disabled>
            Login
          </Button>
        )}
      </Form>
    </>
  );
}
