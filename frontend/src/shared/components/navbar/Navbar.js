import React, { useContext } from 'react';

import './Navbar.css';
import { AuthContext } from '../../context/auth-context';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { userType, isLoggedIn, logout } = useContext(AuthContext);

  let navElement;
  if (isLoggedIn) {
    if (userType === "SOCIETY") {
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
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </nav>
          <div className='nav-divider'></div> {/* Divider moved here */}
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
                <a href='http://localhost:3000/contact-us/' className='nav-link'>Contact Us</a>
              </li>
              <li>
                <a href='http://localhost:3000/about/' className='nav-link'>About Us</a>
              </li>
              <li>
                <a href='http://localhost:3000/login/' className='nav-link'>Login</a>
              </li>
              <li>
                <a href='http://localhost:3000/signup/' className='nav-link signup'>Sign Up</a>
              </li>
            </ul>
          </nav>
          <div className='nav-divider'></div> {/* Divider moved here */}
        </>
      );
    }
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
              <a href='http://localhost:3000/contact-us/'>Contact Us</a>
            </li>
            <li>
              <a href='http://localhost:3000/about/'>About Us</a>
            </li>
            <li>
              <a href='http://localhost:3000/login/'>Login</a>
            </li>
            <li>
              <a href='http://localhost:3000/signup/'>Sign Up</a>
            </li>
          </ul>
        </nav>
        <div className='nav-divider'></div> {/* Divider moved here */}
      </>
    );
  }

  return navElement;
};
export default Navbar;