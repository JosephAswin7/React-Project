
import React from 'react';
import './CartPage.css';
import { Link } from 'react-router-dom';


const CartPage = ({ cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * 80, 0);

  return (
    <div className="cart-page">
      <h2 className='UrCart-Btn'>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>₹{Math.round(item.price * 80)}</p>
                  <button onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className='total'>Total: ₹{Math.round(total)}</h3>

          <Link to="/checkout">
             <button className="checkout-btn">Proceed to Checkout</button>
          </Link>

        </>
      )}
    </div>
  );
};

export default CartPage;