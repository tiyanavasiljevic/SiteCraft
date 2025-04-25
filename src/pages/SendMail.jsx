import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";


const SendMail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleSend = () => {
    if (email && message) {
      const subject = "Message from SendMail Component";
      const body = encodeURIComponent(message);
      const mailToLink = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = mailToLink;
    } else {
      alert("Please provide both an email and a message.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Send Mail</h2>
      <div className="d-flex justify-content-center">
        <Form style={{ maxWidth: "400px", width: "100%" }}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handleSend}
          >
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};


export default SendMail;
