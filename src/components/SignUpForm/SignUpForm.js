import React, { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log("User registered:", formData);
    // Ajouter ici l’envoi vers le backend
  };

  return (
    <div className="SignUp-Form">
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>

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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email"
          />
          <HiMail className="icon" />
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

        <div className="input-box">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            aria-label="Confirm Password"
          />
          <MdPassword className="icon" />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">SIGN UP</button>

        <div className="register-link">
          <p>
            Already have an account?&nbsp;<Link to="/SignIn">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
