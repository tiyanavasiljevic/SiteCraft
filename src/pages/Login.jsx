import React, { useState } from "react"; // Grupisani importi
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Form, Button, Container, Alert } from "react-bootstrap";

// 1. Definišemo bazu URL-a koja se menja zavisno od okruženja
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetujemo grešku na početku

    // Validacija
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || !passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long, include one number and one special character.');
      return;
    }

    try {
      // 2. KORISTIMO API_BASE_URL varijablu umesto localhost-a
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { 
        email, 
        password 
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      login(token);
      navigate('/dashboard');

    } catch (error) {
      // 3. BOLJE RUKOVANJE GREŠKAMA
      // Ako backend vrati grešku (npr. pogrešna lozinka), prikaži tu poruku
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
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