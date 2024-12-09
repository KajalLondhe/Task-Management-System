import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton'

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        Task Manager
      </h1>
      <LogoutButton />
    </nav>
  );
};

export default NavigationBar;
