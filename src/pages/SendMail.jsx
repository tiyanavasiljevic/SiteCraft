import React from "react";


const SendMail = () => {
    const [email, setEmail] = useState("");
  
    const handleSend = () => {
    
      console.log("Sending email to:", email);
    };
  
    return (
      <div>
        <h2>Send Mail</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    );
  };

  
export default SendMail;
