import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const navigate = useNavigate();
    
   const handleSubmit = async (e) => {
      e.preventDefault();
      
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