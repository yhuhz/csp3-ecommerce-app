import { Form, Button, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function Register() {
  const notyf = new Notyf();

  const { user } = useContext(UserContext);

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={10} sm={6} md={4} className="text-center">
        <h1 className="mb-4">Register</h1>
        <Form onSubmit={registerUser}>
          {[
            {
              type: 'text',
              placeholder: 'First Name',
              state: firstName,
              setState: setFirstName,
            },
            {
              type: 'text',
              placeholder: 'Last Name',
              state: lastName,
              setState: setLastName,
            },
            {
              type: 'email',
              placeholder: 'Email',
              state: email,
              setState: setEmail,
            },
            {
              type: 'number',
              placeholder: 'Mobile Number',
              state: mobileNo,
              setState: setMobileNo,
            },
            {
              type: 'password',
              placeholder: 'Password',
              state: password,
              setState: setPassword,
            },
            {
              type: 'password',
              placeholder: 'Confirm Password',
              state: confirmPassword,
              setState: setConfirmPassword,
            },
          ].map(({ type, placeholder, state, setState }, index) => (
            <Form.Group
              className="mb-3"
              controlId={`form${placeholder.replace(' ', '')}`}
              key={index}
            >
              <Form.Control
                type={type}
                placeholder={placeholder}
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
          ))}

          <Button
            variant={isActive ? 'primary' : 'danger'}
            type="submit"
            disabled={!isActive}
            className="w-100"
          >
            Register
          </Button>
        </Form>
      </Col>
    </div>
  );
}
