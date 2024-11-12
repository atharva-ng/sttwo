import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ChevronUp, ChevronDown, Home, DollarSign, PencilRuler, ScrollText, Megaphone, UserRoundPen, Settings } from 'lucide-react';

const NavItem = ({ icon: Icon, label, children, isActive, activeChild, parentKey, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <div className="my-1">
      <div 
        className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 relative
          ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
        onClick={() => {
          onClick();
          if (hasChildren) setIsOpen(!isOpen);
        }}
      >
        {isActive && (
          <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-e-full" />
        )}
        <Icon className="w-5 h-5 mr-3" />
        <span className="flex-grow">{label}</span>
        {hasChildren && (
          isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </div>
      {isOpen && children && (
        <div className="relative ml-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
          {children.map((child, index) => (
            <div
              key={index}
              className={`py-3 px-4 cursor-pointer hover:bg-gray-100 relative
                ${activeChild === child && parentKey === label ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                onClick(child);
              }}
            >
              {activeChild === child && parentKey === label && (
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-e-full" />
              )}
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
// 
    // const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState('Help-desk');
  const [activeChild, setActiveChild] = useState('Help-desk');
  const [activeParent, setActiveParent] = useState('Community Communications');

  const handleClick = (item, child = null) => {
    if (child) {
      setActiveItem(item);
      setActiveChild(child);
      setActiveParent(item);
    } else {
      setActiveItem(item);
      setActiveChild(null);
      setActiveParent(null);
    }
  };

  return (
    <div className="w-64 h-screen bg-white border-r">
      <NavItem
        icon={Home}
        label="Dashboard"
        isActive={activeItem === 'Dashboard'}
        onClick={<Redirect to="/dashboard" />}
      />
      <NavItem
        icon={DollarSign}
        label="Finance Management"
        children={['On-line ballots', 'On-line AGM']}
        isActive={activeItem === 'Finance Management'}
        activeChild={activeChild}
        parentKey="Finance Management"
        onClick={(child) => handleClick('Finance Management', child)}
      />
      <NavItem
        icon={PencilRuler}
        label="Facility Management"
        isActive={activeItem === 'Facility Management'}
        onClick={() => handleClick('Facility Management')}
      />
      <NavItem
        icon={ScrollText}
        label="Admin Reports"
        isActive={activeItem === 'Admin Reports'}
        onClick={() => handleClick('Admin Reports')}
      />
      <NavItem
        icon={Megaphone}
        label="Community Communications"
        children={['Notices', 'Help-desk', 'On-line ballots', 'On-line AGM']}
        isActive={activeItem === 'Community Communications'}
        activeChild={activeChild}
        parentKey="Community Communications"
        onClick={(child) => handleClick('Community Communications', child)}
      />
      <NavItem
        icon={UserRoundPen}
        label="Account Edit"
        isActive={activeItem === 'Account Edit'}
        onClick={() => handleClick('Account Edit')}
      />
      <NavItem
        icon={Settings}
        label="Settings"
        isActive={activeItem === 'Settings'}
        onClick={() => handleClick('Settings')}
      />
    </div>
  );
};

export default Sidebar;