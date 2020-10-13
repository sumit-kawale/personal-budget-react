import React from 'react';

import{
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <nav className="menu-nav">
        <ul>
{/* <!-- This is an A11y Change(aria-label) --> */}
            <li><Link to="/" aria-label="Home page">Home</Link></li>
            <li><Link to="/about" aria-label="About us">About</Link></li>
            <li><Link to="/login" aria-label="User Login">Login</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;
