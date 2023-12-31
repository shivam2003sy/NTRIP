import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate =useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { username, email, password } = user;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.123.120:8000/register-server', {
                username,
                email,
                password
            });

            // Handle successful response
            console.log("Registration success:", response.data);

            // Reset form fields after successful registration
            setUser({
                username: "",
                email: "",
                password: ""
            });
            navigate("/login")
        } catch (error) {
            // Handle error
            console.error("Registration error:", error);
        }
    };

    return (
        <form className="registration-form" onSubmit={registerUser}>
            <div className="container">
                <div className="card">
                    <h3>SignUp</h3>
                    <label><strong>Name</strong></label>
                    <input
                        name="username"
                        value={username}
                        placeholder="Enter Your Name"
                        required
                        onChange={handleInputChange}
                    />

                    <label><strong>Email</strong></label>
                    <input
                        name="email"
                        value={email}
                        placeholder="Enter Your Email"
                        required
                        onChange={handleInputChange}
                    />

                    <label><strong>Password</strong></label>
                    <input
                        name="password"
                        value={password}
                        placeholder="Enter Your Password"
                        required
                        onChange={handleInputChange}
                        type="password" // Added input type for password field
                    />

                    <div className="card-content-center">
                        <button className="login-button" type="submit"><strong>Create Account</strong></button>
                    </div>
                    <p className="footer-text">Already have an account?<a className="signup" href="login"><strong>Login</strong></a></p>
                </div>
            </div>
        </form>
    );
};

export default Registration;
