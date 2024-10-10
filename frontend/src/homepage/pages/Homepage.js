import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../shared/components/sidebar/Sidebar';
import './Homepage.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Sidebar />
        <div className='main-content'>
          <h1 className='homepage-title'>Homepage</h1>
          <p className='homepage-description'>
            Welcome to the homepage! Here you can find various resources and links to navigate through the site.
          </p>
        </div>
      </div>
    </Router>
  );
};

export default App;