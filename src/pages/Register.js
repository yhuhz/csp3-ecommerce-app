import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function Register() {
  const notyf = new Notyf();

  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      mobileNo.length === 11 &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();
    fetch(
      'https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          password: password,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          setFirstName('');
          setLastName('');
          setEmail('');
          setMobileNo(0);
          setPassword('');
          setConfirmPassword('');
          notyf.success('User registered successfully');
        } else if (data.message === 'Mobile number is invalid') {
          notyf.error('Mobile number is invalid');
        } else if (
          data.message === 'Password must be atleast 8 characters long'
        ) {
          notyf.error('Password must be atleast 8 characters long');
        } else {
          notyf.error('Internal Server Error. Notify system admin.');
        }
      });
  }

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <div>
      <h1 className="text-center mt-5">Register</h1>

      <Form onSubmit={(e) => registerUser(e)}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter 11 Digit No."
            required
            value={mobileNo}
            onChange={(e) => {
              setMobileNo(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        {isActive ? (
          <Button variant="primary" type="submit" id="submitButton">
            Register
          </Button>
        ) : (
          <Button variant="danger" type="submit" id="submitButton" disabled>
            Register
          </Button>
        )}
      </Form>
    </div>
  );
}
