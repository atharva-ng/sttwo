import React from'react';

import './Navbar.css';

const NavbarLogin=()=>{
  return(
    <nav className='nav'>
      <a href='/' className='site-title'>
        Sttwo
      </a>
      <ul>
        <li>
          <a href='/login/'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLogin;