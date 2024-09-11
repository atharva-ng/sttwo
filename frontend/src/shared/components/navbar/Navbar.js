import React from'react';

import './Navbar.css';

const Navbar=()=>{
  
  return(
    <nav className='nav'>
      <a href='/' className='site-title'>
        Sttwo
      </a>
      <ul>
        <li>
          <a href='http://localhost:3000/login/'>Login</a>
        </li>
        <li>
          <a href='http://localhost:3000/signup/'>Sign Up</a>
        </li>
        <li>
          <a href='http://localhost:3000/about/'>About</a>
        </li>
        <li>
          <a href='http://localhost:3000/contact-us/'>Contact Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;