import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#ffc107' }}>
        <div className="text-center">
          <h2>
            Please <Link to="/login" style={{ textDecoration: 'none', color: 'gray' }}>Login</Link> or <Link to="/register" style={{ textDecoration: 'none', color: 'gray' }}>Register</Link>
          </h2>
        </div>
      </Container>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
