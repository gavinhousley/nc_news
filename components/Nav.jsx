import { Link } from "react-router";

function Nav() {
  return (
    <nav className="nav-list">
      <ul>
        <Link to="/" className="nav-link">
          Articles
        </Link>
        <li>Topics</li>
        <li>Users</li>
      </ul>
    </nav>
  );
}

export default Nav;
