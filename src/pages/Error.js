import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Container className="text-center my-5">
      <img
        src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png"
        alt="404"
        className="img-fluid"
      />
      <h1>Page not found</h1>
      <Link to="/" className="btn btn-primary mt-3">
        Return to homepage
      </Link>
    </Container>
  );
}
