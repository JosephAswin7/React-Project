import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ cart }) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * 80, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully for ₹${Math.round(total)}!`);
    // You can also reset cart or redirect here
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Shipping Details</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <button type="submit">Place Order</button>
        </form>
      </div>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - ₹{Math.round(item.price * 80)}
            </li>
          ))}
        </ul>
        <h3>Total: ₹{Math.round(total)}</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;