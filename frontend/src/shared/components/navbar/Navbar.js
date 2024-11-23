import React, { useContext } from 'react';

import './Navbar.css';
import { AuthContext } from '../../context/auth-context';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const history = useHistory(); // Hook for navigation

  const handleLogout = () => {
    logout();
    history.push("/login");
    
  }

  let navElement;
  if (isLoggedIn) {
    
      navElement = (
        <>
          <div className='nav z-50 h-100'
          >
            <div className='nav-left'
            
            >
              <img src='/logo.svg' alt='Logo' className='nav-logo' />
              <span className='site-title'>ST II</span>
            </div>
            <ul className='nav-right'>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          {/* <div className='nav-divider'></div>    */}
        </>
      );
  } else {
    navElement = (
      <>
        <nav className='nav'
        style={{
          position:"sticky",
          top:"0"
        }}
        >
          <div className='nav-left'>
            <img src='/logo.svg' alt='Logo' className='nav-logo' />
            <span className='site-title'>ST II</span>
          </div>
          <ul className='nav-right'>
            <li>
              <Link to='/contact-us'>Contact Us</Link>
            </li>
            <li>
              <Link to='/about'>About Us</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </ul>
        </nav>
        <div className='nav-divider'></div> 
      </>
    );
  }

  return navElement;
};
export default Navbar;