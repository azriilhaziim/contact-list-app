import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <nav className="navbar">
        <Link to="/" className="logo">
          Cloud Contact
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}