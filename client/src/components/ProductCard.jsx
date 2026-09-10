import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
      <h3>{product.name}</h3>
      <p>₹{product.discount_price || product.price}</p>
      <p>⭐ {product.rating}</p>
      <Link to={`/products/${product.id}`}>
        <button>View Product</button>
      </Link>
    </div>
  );
}

export default ProductCard;