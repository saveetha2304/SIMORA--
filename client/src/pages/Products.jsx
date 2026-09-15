import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, searchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    setLoading(true);
    const fetcher = query ? searchProducts(query) : getProducts();

    fetcher
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <h1>SIMORA Products</h1>
      {query && <p>Showing results for "{query}"</p>}

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;