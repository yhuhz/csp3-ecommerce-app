import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Row, Col, Card, Container } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { Notyf } from "notyf";
import ResetPassword from "../components/ResetPassword";

export default function Profile() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notyf = new Notyf();

  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.id !== null) {
      fetch(
        "https://einvfmh2fe.execute-api.us-west-2.amazonaws.com/production/users/details",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setDetails({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              mobileNo: data.mobileNo,
            });
          } else {
            // If user is not found
            notyf.error("User not found.");
          }
        })
        .catch((error) => {
          // For any other errors
          console.error("Error fetching user details:", error);
          notyf.error(
            "Something went wrong, kindly contact us for assistance."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [notyf, user.id]);

  if (user.id === null && !isLoading) {
    return <Navigate to="/products" />;
  }

  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <h1 className="mb-4">User Profile</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <p className="text-center">Loading user details...</p>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Personal Information</Card.Title>
                <Card.Text>
                  <strong>First Name:</strong> {details.firstName}
                </Card.Text>
                <Card.Text>
                  <strong>Last Name:</strong> {details.lastName}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {details.email}
                </Card.Text>
                <Card.Text>
                  <strong>Mobile Number:</strong> {details.mobileNo}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Container>
            <ResetPassword />
          </Container>
        </Row>
      )}
    </>
  );
}
