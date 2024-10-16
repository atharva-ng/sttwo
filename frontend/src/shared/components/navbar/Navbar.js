import React, { useContext } from 'react';

import './Navbar.css';
import { AuthContext } from '../../context/auth-context';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  let navElement;
  if (isLoggedIn) {
    
      navElement = (
        <>
          <nav className='nav'>
            <div className='nav-left'>
              <img src='/logo.svg' alt='Logo' className='nav-logo' />
              <span className='site-title'>ST II</span>
            </div>
            <ul className='nav-right'>
              <li>
                <Link to='/flatsInformation'>Flat Info</Link>
              </li>
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li>
                <Link to='/notice'>Notice</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </nav>
          <div className='nav-divider'></div> 
        </>
      );
  } else {
    navElement = (
      <>
        <nav className='nav'>
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