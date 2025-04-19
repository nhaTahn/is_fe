import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@mui/material';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate(); 
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission (e.g., validation and sign-up logic)
    console.log("Submitted:", { name, email, password, confirmPassword });
    navigate('/newEssay');
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setPasswordVisible((prevState) => !prevState);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible((prevState) => !prevState);
    }
  };

  return (
    <div className="container">
      <div className="signup-form">
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="password-toggle"
              >
                👁️
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="password-toggle"
              >
                👁️
              </button>
            </div>
          </div>
          <Button type="submit" variant="contained">Sign up</Button>
        </form>
        <Button href="/signin" variant="text"> Sign in</Button>
      </div>
    </div>
  );
};

export default SignupPage;
