import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
FaUser,
FaEnvelope,
FaLock,
FaEye,
FaEyeSlash,
FaArrowRight,
} from "react-icons/fa";

import "./Register.css";

function Register() {
const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [formData, setFormData] = useState({
full_name: "",
email: "",
password: "",
confirm_password: "",
});

const handleChange = (e) => {
const { name, value } = e.target;

setFormData((previous) => ({
  ...previous,
  [name]: value,
}));

setError("");

};

const handleSubmit = async (e) => {
e.preventDefault();

if (formData.password !== formData.confirm_password) {
  setError("Passwords do not match.");
  return;
}

if (formData.password.length < 6) {
  setError("Password must be at least 6 characters.");
  return;
}

try {
  setLoading(true);
  setError("");

  const response = await fetch(
    "http://localhost:5000/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: "couple",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || "Registration failed.");
    return;
  }

  alert("Couple account created successfully!");

  navigate("/login");
} catch (error) {
  console.error(error);
  setError(
    "Unable to connect to the server. Please make sure the backend is running."
  );
} finally {
  setLoading(false);
}

};

return (
<div className="register-page">
<div className="register-container">

    <div className="register-brand-panel">

      <div className="register-brand-logo">
        ✦
      </div>

      <span className="register-brand-eyebrow">
        WEDDING BLOOM
      </span>

      <h1>
        Create your
        <br />
        beautiful story.
      </h1>

      <p>
        Start organizing your wedding details,
        guests, events, budget, and vendors
        all in one beautiful place.
      </p>

      <div className="register-brand-heart">
        ♥
      </div>

    </div>

    <div className="register-form-panel">

      <div className="register-form-header">

        <span className="register-mobile-logo">
          ✦
        </span>

        <h2>Create Account</h2>

        <p>
          Join Wedding Bloom and start planning your perfect day.
        </p>

      </div>

      <form
        className="register-form"
        onSubmit={handleSubmit}
      >

        <div className="register-field">

          <label htmlFor="full_name">
            Full Name
          </label>

          <div className="register-input">

            <FaUser />

            <input
              id="full_name"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

          </div>

        </div>

        <div className="register-field">

          <label htmlFor="email">
            Email Address
          </label>

          <div className="register-input">

            <FaEnvelope />

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

          </div>

        </div>

        <div className="register-field">

          <label htmlFor="password">
            Password
          </label>

          <div className="register-input">

            <FaLock />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="register-password-toggle"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        <div className="register-field">

          <label htmlFor="confirm_password">
            Confirm Password
          </label>

          <div className="register-input">

            <FaLock />

            <input
              id="confirm_password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="register-password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) => !previous
                )
              }
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

        </div>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="register-submit-btn"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
          {!loading && <FaArrowRight />}
        </button>

      </form>

      <div className="register-switch">

        <span>
          Already have an account?
        </span>

        <Link to="/login">
          Sign in
        </Link>

      </div>

    </div>

  </div>
</div>

);
}

export default Register;