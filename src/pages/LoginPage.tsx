import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { Form, TextBox } from '../components/Utils';


const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null); // User session state

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("user");
    setUserName(storedUserName); // Set the username state
  }, []); // Empty dependency array means this will run once when the component mounts

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log("Submitted:", { email, password });

    sessionStorage.setItem("user", "Nguyen Van A"); 
    navigate('/newEssay');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Welcome back</h2>
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
            </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
              <button type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle" /> 
            </div>
          </div>
          <Button type="submit" variant="contained">Sign in</Button>
          <Button href="/signup" variant="text"> Sign Up</Button>
        </Form>
         
      </div>
    </div>
  );
};

export default LoginPage;
