import React, { useContext } from 'react';

import './Navbar.css';
import { AuthContext } from '../../context/auth-context';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { userType, isLoggedIn, logout } = useContext(AuthContext);

  let navElement;
  if (isLoggedIn) {
    if (userType === "SOCIETY") {
      navElement = (<nav className='nav'>
        <a href='/' className='site-title'>
          Sttwo
        </a>
        Welcome society
        <ul>
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
      </nav>)
    } else {
      navElement = (<nav className='nav'>
        <a href='/' className='site-title'>
          Sttwo
        </a>
        Welcome Owner
        <ul>
          <li>
            <a href='http://localhost:3000/dashboard/'>Dashboard</a>
          </li>
        </ul>
      </nav>)
    }
  } else {
    navElement = (
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
    )
  }

  return navElement;
};

export default Navbar;