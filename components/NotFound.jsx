import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Apologies, that page doesn't seem to exist.</p>
      <Link to="/"> Return to Home</Link>
    </div>
  );
}

export default NotFound;
