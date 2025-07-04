
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import ProductCard from "./Components/productCard";
import CartPage from "./Components/CartPage";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import CheckoutPage from './Components/CheckoutPage'; 
import LoginPage from './Components/LoginPage';
import Footer from "./Components/Footer";
import Chatbot from "./Components/Chatbot";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    Promise.all([
      fetch('https://fakestoreapi.com/products').then(res => res.json()),
      fetch('https://dummyjson.com/products').then(res => res.json()),
      fetch('https://dummyjson.com/products/category/smartphones').then(res => res.json()),
      fetch('https://dummyjson.com/products/category/laptops').then(res => res.json()),
      fetch('https://dummyjson.com/products/category/fragrances').then(res => res.json()),
      fetch('https://dummyjson.com/products/category/skincare').then(res => res.json()),
      fetch('https://dummyjson.com/products/category/groceries').then(res => res.json()),
      fetch('https://dummyjson.com/products/category/furniture').then(res => res.json())
    ])
      .then(([fakeStoreData, dummyData, phonesData, laptopsData, fragrancesData, skincareData, groceriesData, furnitureData]) => {
        const combined = [
          ...fakeStoreData.map(p => ({
            id: `f_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.image
          })),
          ...dummyData.products.map(p => ({
            id: `d_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail
          })),
          ...phonesData.products.map(p => ({
            id: `p_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail
          })),
          ...laptopsData.products.map(p => ({
            id: `l_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail
          })),
          ...fragrancesData.products.map(p => ({
            id: `fr_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail
          })),
          ...skincareData.products.map(p => ({
            id: `sc_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail
          })),
          ...groceriesData.products.map(p => ({
            id: `gr_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail || p.images?.[0] || "https://via.placeholder.com/150"
          })),
          ...furnitureData.products.map(p => ({
            id: `furn_${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail || p.images?.[0] || "https://via.placeholder.com/150"
          }))
        ];
        setProducts(combined);
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "smartphones" && product.id.startsWith("p_")) ||
      (selectedCategory === "laptops" && product.id.startsWith("l_")) ||
      (selectedCategory === "fragrances" && product.id.startsWith("fr_")) ||
      (selectedCategory === "skincare" && product.id.startsWith("sc_")) ||
      (selectedCategory === "groceries" && product.id.startsWith("gr_")) ||
      (selectedCategory === "furniture" && product.id.startsWith("furn_"));

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Navbar user={user} onLogout={() => setUser(null)} onSearch={setSearchTerm} cartCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="category-filter">
                {["all", "smartphones", "laptops", "fragrances", "skincare", "groceries", "furniture"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? "active" : ""}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          }
        />
        <Route path="/product/:id" element={<ProductDetails products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemove={handleRemoveFromCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>

      <Chatbot />
      <Footer />
    </>
  );
}

export default App;