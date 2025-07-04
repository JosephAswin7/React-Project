import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductDetails.css';

const ProductDetails = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found.</p>;

  // Simulated images array (you can replace or extend these)
  const images = [
    product.image,
    product.image,
    "https://via.placeholder.com/300x300?text=Another+View",
  ];

  return (
    <div className="details-container">
      <div className="details-carousel">
        <Carousel showThumbs={false} infiniteLoop>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`slide-${index}`} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="details-content">
        <h2>{product.title}</h2>
        <div className="rating">⭐⭐⭐⭐☆ (4.2)</div>
        <p className="details-price">₹{Math.round(product.price * 80)}</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, soluta sed magnam nam error incidunt totam dicta reiciendis eligendi, assumenda, at labore minus. Enim culpa, quaerat cupiditate consequatur reiciendis iure, officia ad temporibus illum ea tenetur. Incidunt tenetur soluta, necessitatibus molestias iure amet sunt labore aperiam possimus nisi iste obcaecati rem explicabo laboriosam suscipit reprehenderit odit nostrum delectus. Iusto facere fugit quod dignissimos accusamus saepe molestias nam consequatur praesentium. Quos minima, consequuntur quod asperiores libero id necessitatibus at sint explicabo incidunt quia! Veritatis, blanditiis laudantium. Magnam voluptatem placeat nesciunt quas, quos perspiciatis nemo! Quia deserunt consequatur nostrum quibusdam temporibus quo.
        </p>
        <button onClick={() => onAddToCart(product)}className='addToCrtbtn'>Add to Cart</button>
        <button onClick={() => navigate(-1)} className="back-btn">← Go Back</button>

        <div className="reviews-section">
          <h4>Customer Reviews</h4>
          <ul>
            <li>👍 Great quality and value for money!</li>
            <li>🚚 Fast delivery and well packaged.</li>
            <li>⭐ Slightly smaller than expected but still good.</li>
          </ul>
        </div>
      </div>
    </div>
  );

};

export default ProductDetails;