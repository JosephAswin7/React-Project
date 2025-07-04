import React,  { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = ({onSearch, cartCount,user, onLogout }) => {
    const[input, setInput] = useState("");

     const handleSearch = () => {
    onSearch(input);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Shop<span>Ease</span></div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
        <li>
          {user ? (
            
              <button onClick={onLogout}>Logout</button>
            
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>

      <div className='navbar-search'>
        <input type="text" placeholder='Search...' 
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />
        <button onClick={()=>onSearch(input)}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;