import React from'react';

import './Navbar.css';

const NavbarSignup=()=>{
  return(
    <nav className='nav'>
      <a href='/' className='site-title'>
        Sttwo
      </a>
      <ul>
        <li>
          <a href='/signup/'>Signup</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarSignup;