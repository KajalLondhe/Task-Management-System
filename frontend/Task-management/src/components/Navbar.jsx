import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CSS/Navbar.css'; 
const Navbar = () => {
  const { isAuthenticated, user, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div style={{ marginRight: '100px', height: '40px', width: '230px' }}>
        {isAuthenticated ? (
          <div>
            <button 
              onClick={handleLogout} 
              className='logout-button' 
              style={{
                padding: '8px 12px',
                
                
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                border: 'none',
                display: 'block',
                margin: '0 auto',
                width: '100%', 
                maxWidth: 'auto', 
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link 
              to="/register" 
              className="register-button" 
              style={{
                padding: '8px 16px',
                textDecoration: 'none',
                color: '#f57d81',
                backgroundColor: 'rgb(250, 251, 253)',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
                marginRight: '10px',
                display: 'inline-block',
                width: 'auto',
              }}
            >
              Register
            </Link>
            <Link 
              to="/login" 
              className="login-button" 
              style={{
                padding: '8px 16px',
                textDecoration: 'none',
                color: '#f57d81',
                backgroundColor: 'rgb(250, 251, 253)',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
                display: 'inline-block',
                width: 'auto',
              }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
