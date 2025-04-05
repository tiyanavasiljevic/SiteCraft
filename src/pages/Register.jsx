import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit =  async (e) => {
      e.preventDefault();

      try {
        await axios.post('http://localhost:4000/api/register', { username, email, password });
            navigate('/login'); // REDIRECT USER TO LOGIN
        } catch (error) {
            console.error(error);
        }
    };
     
    
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }



export default Register;
