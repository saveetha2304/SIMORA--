import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        // Duplicate product names remove pannі, unique products mattum kaattanum
        const seen = new Set();
        const unique = data.filter((p) => {
          if (seen.has(p.name)) return false;
          seen.add(p.name);
          return true;
        });
        setFeatured(unique);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          padding: "72px 24px",
          textAlign: "center",
          background: "linear-gradient(180deg, #f5f7ff 0%, #ffffff 100%)",
        }}
      >
        <h1 style={{ fontSize: "42px", margin: "0 0 12px" }}>
          Welcome to SIMORA
        </h1>
        <p style={{ fontSize: "18px", color: "#555", margin: "0 0 28px" }}>
          Search. Experience. Decide.
        </p>
        <Link to="/products">
          <button
            style={{
              padding: "12px 32px",
              fontSize: "16px",
              borderRadius: "999px",
              border: "none",
              background: "#4338ca",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </Link>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "48px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto 24px",
          }}
        >
          <h2 style={{ margin: 0 }}>Featured Products</h2>
          <Link to="/products" style={{ color: "#4338ca", textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : featured.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products available right now.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;