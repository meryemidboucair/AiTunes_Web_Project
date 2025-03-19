import React, { useState } from "react";
import "../../App.css";
import "./ContactUsForm.css";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    setError("");
    setSuccessMessage("Your message has been sent successfully!");
    console.log("Message sent:", formData);

    // Réinitialiser le formulaire après soumission
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Effacer le message de succès après 3 secondes
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <hr className="contact-border" />

        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:AiTunes2025@gmail.com">AiTunes2025@gmail.com</a>
            </p>
            <p>
              <strong>Phone:</strong> +33 XX XX XX XX
            </p>
            <p>
              Feel free to reach out to us for any inquiries or collaboration
              opportunities.
            </p>
          </div>

          {/* Section Formulaire */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Name"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Email"
                />
              </div>
              <div className="input-group">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-label="Message"
                ></textarea>
              </div>

              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}

              <button className="contact-btn" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsForm;
