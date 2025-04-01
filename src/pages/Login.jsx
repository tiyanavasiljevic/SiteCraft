import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const navigate = useNavigate();
    
   const handleSubmit = async (e) => {
      e.preventDefault();
      
    

    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // STORE TOKEN TO LOCALSTORAGE
  } catch (error) {
      console.error(error);
  }
};
  
    return (
      <div>
        <h2>Log In</h2>
        <Form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </Form>
      </div>
    );
  }
  
  export default Login;