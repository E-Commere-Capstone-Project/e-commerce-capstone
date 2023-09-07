import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <h1>Website Name Here</h1>
      <div>
        <nav>
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to="/products">
            <h3>Products</h3>
          </Link>
        </nav>
      </div>
    </header>
  );
}
