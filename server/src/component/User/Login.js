import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError("");
    try {
      const response = await axios.post(
        "http://192.168.123.120:8000/rover/login/",
        {
          username,
          password,
        }
      );
      setLoading(false);
      console.log("Login success:", response.data);
      const { refresh } = response.data;
      const { access } = response.data;

      localStorage.setItem("token", refresh);

      try {
        const response2 = await axios.get("http://192.168.123.120:8000/get-server", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        console.log(response2.data);
        alert("Login Successful" , response2.data);
        localStorage.setItem("server", response2.data.id);
      } catch (error) {
        // Handle errors, for example:
        console.error("Error fetching data:", error.message);
      }
      
      // console.log("response2", response2.data);
      // alert("Login Successful" , response2.data);

      setUsername("");
      setPassword("");
      console.log(navigate)
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials!");
    }
  };

  return (
    <form className="login-form" onSubmit={loginSubmit}>
      <div className="container">
        <div className="card">
          <h3>Login to Your Base Station</h3>

          {error && <p className="error-message">{error}</p>}
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
          {/* <div className="card-content-center">
            <button type="submit" className="login-button">
              <strong>Login</strong>
            </button>
          </div> */}
          
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
            Not a member?
            <a className="signup" href="register">
              <strong>SignUp</strong>
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
