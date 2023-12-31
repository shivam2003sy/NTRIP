import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.123.120:8000/rover/login/",
        {
          username,
          password,
        }
      );
      console.log("Login success:", response.data);
      const { refresh } = response.data;
      localStorage.setItem("token", refresh);
      const { access } = response.data;

      setUsername("");
      setPassword("");

      const response2 = await axios.get(
        "http://192.168.123.120:8000/get-client",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log("Login success:", response2.data);
      alert("Login Success", response2.data.id);
      localStorage.setItem("client", response2.data.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={loginSubmit}>
      <div className="container">
        <div className="card">
          <h3>Login to your Client</h3>
          <label>
            <strong>Username</strong>
          </label>
          <input
            type="text"
            name="username"
            value={username}
            required
            placeholder="Enter Your username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>
            <strong>Password</strong>
          </label>
          <input
            type="password"
            name="password"
            required
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <a className="forgetPassword" href="/password/forgot">
            Forgot Password?
          </a>
          <div className="card-content-center">
            <button type="submit" className="login-button">
              <strong>Login</strong>
            </button>
          </div>
          <p className="footer-text">
            Not a member?
            <Link className="signup" to="/">
              <strong>SignUp</strong>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
