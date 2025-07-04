import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
              <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      </Link>
      <p>₹{Math.round(product.price * 80)}</p>
      <button onClick={()=>{  console.log("Clicked:", product.title);
onAddToCart(product)}}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;