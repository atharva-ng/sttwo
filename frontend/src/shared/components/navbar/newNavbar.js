import "./new.css";
import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { Link, useHistory } from 'react-router-dom';

const NewNavbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const history = useHistory(); // Hook for navigation

    const handleLogout = () => {
        logout();
        history.push("/login");
        
      }


    return (
        <>
        <div className="topnav shadow-md">
            <a className="left">
            <div className='nav-left'
            >
              <img src='/logo.svg' alt='Logo' className='nav-logo' />
              <span className='site-title'>ST II</span>
            </div>
            </a>
            <a className="split"
            onClick={handleLogout}
            >Logout</a>
        </div>
        </>
    );
};

export default NewNavbar;