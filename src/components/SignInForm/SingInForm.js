import React, { useState } from 'react';
import { FaUserAstronaut } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link } from 'react-router-dom';
import './SignInForm.css';

function SignInForm() {
  const [formData, setFormData] = useState({ username: '', password: '', remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Ajouter ici la logique d'authentification
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-form">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                aria-label="Username"
              />
              <FaUserAstronaut className="icon" />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-label="Password"
              />
              <MdPassword className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <br />

            <button type="submit">Sign In</button>

            <div className="register-link">
              <p>Don't have an account? <Link to="/signup">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
