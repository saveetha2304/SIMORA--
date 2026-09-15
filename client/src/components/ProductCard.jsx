import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const [showTryOn, setShowTryOn] = useState(false);
  const hasModel = Boolean(product.model_url);

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x300?text=SIMORA";
          }}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            background: "#f3f3f3",
          }}
        />
      </Link>

      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>{product.name}</h3>

        <div style={{ marginBottom: "10px" }}>
          {product.discount_price ? (
            <>
              <span style={{ textDecoration: "line-through", color: "#999", marginRight: "8px" }}>
                ₹{product.price}
              </span>
              <strong>₹{product.discount_price}</strong>
            </>
          ) : (
            <strong>₹{product.price}</strong>
          )}
        </div>

        <button
          onClick={() => setShowTryOn(true)}
          disabled={!hasModel}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            background: hasModel ? "#4338ca" : "#ccc",
            color: "#fff",
            cursor: hasModel ? "pointer" : "not-allowed",
          }}
        >
          {hasModel ? "Try On" : "Try On (coming soon)"}
        </button>
      </div>

      {showTryOn && hasModel && (
        <div
          onClick={() => setShowTryOn(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "16px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowTryOn(false)}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <model-viewer
              src={product.model_url}
              alt={product.name}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              style={{ width: "100%", height: "400px" }}
            ></model-viewer>

            <p style={{ fontSize: "13px", color: "#666", textAlign: "center", marginTop: "8px" }}>
              Rotate to view in 3D. Mobile la AR icon click pannunga, camera la try pannalam.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;