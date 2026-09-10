import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav>
      <Link to="/">SIMORA</Link>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;