
import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Form, Button, Container, Alert } from "react-bootstrap";


//LOGIN FUNCTION
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      const token = response.data.token;// STORE TOKEN TO LOCALSTORAGE

      localStorage.setItem('token', token);
      login(token);

      navigate('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#ffc107' }} >
      <div className="w-50">
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100"
            style={{ backgroundColor: '#444' }}
          >
            Log In
          </Button>
        </Form>
      </div>
    </Container>

  );
}

export default Login;