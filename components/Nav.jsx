import { Link } from "react-router";

function Nav() {
  return (
    <nav className="nav-list">
      <ul>
        <Link to="/" className="nav-link">
          Articles
        </Link>
        <Link to="/topics" className="nav-link">
          Topics
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
