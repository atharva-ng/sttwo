import React from 'react';

import './Sidebar.css';

const Sidebar = () => {
  
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        <li className='sidebar-item'>
          <img src='/dashboard.svg' alt='Dashboard' className='sidebar-icon' />
          <span>Dashboard</span>
        </li>
        <li className='sidebar-item'>
          <img src='/fin-man.svg' alt='Finance Management' className='sidebar-icon' />
          <span>Finance Management</span>
        </li>
        <li className='sidebar-item'>
          <img src='/fac-man.svg' alt='Facility Management' className='sidebar-icon' />
          <span>Facility Management</span>
        </li>
        <li className='sidebar-item'>
          <img src='/admin-report.svg' alt='Admin Reports' className='sidebar-icon' />
          <span>Admin Reports</span>
        </li>
        <li className='sidebar-item'>
          <img src='/account-edit.svg' alt='Account Edit' className='sidebar-icon' />
          <span>Account Edit</span>
        </li>
        <li className='sidebar-item'>
          <img src='/settings.svg' alt='Settings' className='sidebar-icon' />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;