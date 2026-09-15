import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "12px 24px" }}>
      <Link to="/">SIMORA</Link>
      <div style={{ flex: 1, maxWidth: "480px" }}>
        <SearchBar onSearch={handleSearch} />
      </div>
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