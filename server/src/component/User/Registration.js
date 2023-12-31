import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://192.168.123.120:8000/register-client",
        {
          username,
          email,
          password,
        }
      );

      // Handle successful response
      console.log("Registration success:", response.data);
      navigate("/");

      // Reset form fields after successful registration
      setUser({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      // Handle error
      console.error("Registration error:", error);
      setError("Login failed. Please check your credentials!");
    } finally {
      setLoading(false); // Set loading to false when registration completes (success or failure)
    }
  };

  return (
    <form className="registration-form" onSubmit={registerUser}>
      <div className="container">
        <div className="card">
          <h3>SignUp</h3>
          
          {error && (
            <p className="error-message">{error}</p>
          )}
          <label>
            <strong>Name</strong>
          </label>
          <input
            name="username"
            value={username}
            placeholder="Enter Your Name"
            required
            onChange={handleInputChange}
          />

          <label>
            <strong>Email</strong>
          </label>
          <input
            name="email"
            value={email}
            placeholder="Enter Your Email"
            required
            onChange={handleInputChange}
          />

          <label>
            <strong>Password</strong>
          </label>
          <input
            name="password"
            value={password}
            placeholder="Enter Your Password"
            required
            onChange={handleInputChange}
            type="password" 
          />

          <div className="card-content-center">
            <button type="submit" className="login-button">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <strong>Login</strong>
              )}
            </button>
          </div>
          <p className="footer-text">
            Already have an account?
            <a className="signup" href="/">
              <strong>Login</strong>
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Registration;
