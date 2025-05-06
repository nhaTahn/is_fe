import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signup } from "../apis/auth/authApi";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // Call the signup API function
      const response = await signup(name, email, password, username);
      console.log("Signup successful:", response);

      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
    }
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
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
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
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div style={{ display: "flex", position: "relative", width: "100%" }}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  paddingRight: "40px", // Space for the icon
                  marginBottom: "10px",
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "20%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  maxWidth: "30px",
                  zIndex: 0, // Ensure the icon is clickable above the input
                }}
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <div style={{ display: "flex", position: "relative", width: "100%" }}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  paddingRight: "40px", // Space for the icon
                  marginBottom: "10px",
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "20%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  maxWidth: "30px",
                  zIndex: 0, // Ensure the icon is clickable above the input
                }}
              >
                {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>
          <Button type="submit" variant="contained" sx={{ width: "100%", padding: "10px", fontSize: "16px" }}>Sign up</Button>
        </form>
        <Button href="/signin" variant="text" sx={{ marginTop: "10px" }}>Sign in</Button>
      </div>
    </div>
  );
};

export default SignupPage;
