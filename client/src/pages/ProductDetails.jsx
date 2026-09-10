import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSimilarProducts } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);

        if (data.product?.category_id) {
          const similarProducts = await getSimilarProducts(data.product.category_id, id);
          setSimilar(similarProducts);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>⭐ {product.rating}</p>

      {product.model_url ? (
        <div style={{ margin: "24px 0" }}>
          <model-viewer
            src={product.model_url}
            ios-src={product.model_url_usdz || undefined}
            alt={`3D view of ${product.name}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            style={{ width: "100%", height: "400px", backgroundColor: "#f5f5f5", borderRadius: "12px" }}
          >
            <button slot="ar-button" style={{ position: "absolute", bottom: "16px", right: "16px", padding: "10px 16px", background: "#111827", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              View in your space
            </button>
          </model-viewer>
        </div>
      ) : (
        <img src={product.image_url} alt={product.name} style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }} />
      )}

      <button style={{ marginTop: "16px" }}>Add to Cart</button>

      {similar.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <h2>Compare Similar Products</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "8px" }}>Product</th>
                <th style={{ padding: "8px" }}>Price</th>
                <th style={{ padding: "8px" }}>Rating</th>
                <th style={{ padding: "8px" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#eef", fontWeight: "bold" }}>
                <td style={{ padding: "8px" }}>{product.name} (this item)</td>
                <td style={{ padding: "8px" }}>₹{product.price}</td>
                <td style={{ padding: "8px" }}>⭐ {product.rating}</td>
                <td style={{ padding: "8px" }}></td>
              </tr>
              {similar.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{p.name}</td>
                  <td style={{ padding: "8px" }}>
                    ₹{p.price}{" "}
                    {p.price < product.price && (
                      <span style={{ color: "green", fontSize: "12px" }}>▼ cheaper</span>
                    )}
                    {p.price > product.price && (
                      <span style={{ color: "red", fontSize: "12px" }}>▲ pricier</span>
                    )}
                  </td>
                  <td style={{ padding: "8px" }}>⭐ {p.rating}</td>
                  <td style={{ padding: "8px" }}>
                    <Link to={`/products/${p.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;