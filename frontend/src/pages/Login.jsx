import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || email.length >= 3;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email or username is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email or username';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (formData.email === 'demo@codequorem.com' && formData.password === 'demo123') {
        alert('Login successful! Welcome to CodeQuorem 🎉');
      } else {
        setErrors({ password: 'Invalid email/username or password' });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider.toUpperCase()} login functionality will be implemented here`);
  };

  const handleForgotPassword = () => {
    const email = prompt('Enter your email address:');
    if (email && validateEmail(email)) {
      alert('Password reset link sent to your email!');
    } else if (email) {
      alert('Please enter a valid email address');
    }
  };

  const handleSignup = () => {
    alert('Signup page will be implemented here');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <div className="logo">CodeQuorem</div>
          <div className="tagline">Code. Learn. Compete.</div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email or username"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span 
                className="password-toggle" 
                onClick={togglePassword}
                role="button"
                tabIndex={0}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="forgot-password">
            <button 
              type="button" 
              className="forgot-link"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="login-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button 
            type="button"
            className="social-btn" 
            onClick={() => handleSocialLogin('google')}
          >
            🔍 Google
          </button>
          <button 
            type="button"
            className="social-btn" 
            onClick={() => handleSocialLogin('github')}
          >
            🐱 GitHub
          </button>
        </div>

        <div className="signup-link">
          Don't have an account?{' '}
          <button 
            type="button" 
            className="signup-btn"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
