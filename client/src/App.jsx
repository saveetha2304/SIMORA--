import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NeuralBackground from "./components/NeuralBackground";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Whishlist";


function App() {
  const contentRef = useRef(null);

  useEffect(() => {
    const PARALLAX_STRENGTH = 12;

    const handleMove = (e) => {
      const offsetX = (e.clientX / window.innerWidth - 0.5) * PARALLAX_STRENGTH;
      const offsetY = (e.clientY / window.innerHeight - 0.5) * PARALLAX_STRENGTH;
      if (contentRef.current) {
        contentRef.current.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
      }
    };

    const handleLeave = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = "translate(0px, 0px)";
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <BrowserRouter>
      <NeuralBackground />
      <div ref={contentRef} style={{ transition: "transform 0.15s ease-out" }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;