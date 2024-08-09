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
          <a href='login/'>Login</a>
        </li>
        <li>
          <a href='signup/'>Sign Up</a>
        </li>
        <li>
          <a href='about/'>About</a>
        </li>
        <li>
          <a href='contact-us/'>Contact Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;