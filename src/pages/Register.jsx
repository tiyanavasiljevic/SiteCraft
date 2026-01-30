import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from "react-bootstrap";

// Definišemo URL bazu - Vite će uzeti vrednost sa Vercela ili koristiti localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetujemo grešku na početku

    // Validacija
    if (!username) {
      setError('Username is required.');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || !passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long, include one number and one special character.');
      return;
    }

    try {
      // KORISTIMO API_BASE_URL varijablu
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password
      });

      // Ako je uspešno, šaljemo korisnika na login
      navigate('/login'); 
      
    } catch (error) {
      console.error('Error during registration:', error);
      
      // Prikazujemo pravu grešku sa bekenda ako postoji (npr. "User already exists")
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#ffc107' }}
    >
      <div className="w-50">
        <h2 className="text-center mb-4">Register</h2>
        
        {/* Prikaz greške */}
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

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

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: '#444' }}
          >
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Register;