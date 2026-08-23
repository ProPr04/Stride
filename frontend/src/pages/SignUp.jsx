import { useState } from 'react';
import { Eye, EyeOff, Check, User, Building2, X } from 'lucide-react';
import { api, authStorage, isAuthEnabled } from '../services/api';

export default function SignUp({ onSwitchToLogin, onClose }) {
  const [role, setRole] = useState('athlete'); // 'athlete' | 'academy'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      window.location.href = '/';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthEnabled()) {
      setIsSubmitting(true);
      authStorage.setUser({ email: email || `${role}@stride.com`, role, name: fullName || 'User' });
      setMessage({ type: 'success', text: 'Account created! Redirecting to login...' });
      setTimeout(() => {
        setIsSubmitting(false);
        if (onSwitchToLogin) onSwitchToLogin();
      }, 500);
      return;
    }

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (!agreeTerms) {
      setMessage({ type: 'error', text: 'Please agree to the Terms & Conditions.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Call Backend Register API
      await api.auth.register({
        email: email.trim().toLowerCase(),
        password,
        role,
        fullName: fullName.trim()
      });

      setMessage({ type: 'success', text: 'Account created successfully! Redirecting to login...' });
      setTimeout(() => {
        setIsSubmitting(false);
        if (onSwitchToLogin) onSwitchToLogin();
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      let errorText = err.message || 'Failed to create account.';
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorText = 'Cannot connect to backend server at http://localhost:5000. Please ensure the backend is running.';
      }
      setMessage({
        type: 'error',
        text: errorText
      });
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login-card relative">
        {/* Cancel / Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close sign up"
        >
          <X size={20} />
        </button>

        {/* Welcome Text */}
        <div className="login-header">
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Join us today by filling in your details below.</p>
        </div>

        {/* Role Selector Dual Toggle Pill */}
        <div className="role-toggle-container">
          <button
            type="button"
            className={`role-toggle-btn ${role === 'athlete' ? 'active' : ''}`}
            onClick={() => setRole('athlete')}
          >
            <User size={16} />
            <span>ATHLETE</span>
          </button>

          <button
            type="button"
            className={`role-toggle-btn ${role === 'academy' ? 'active' : ''}`}
            onClick={() => setRole('academy')}
          >
            <Building2 size={16} />
            <span>ACADEMY</span>
          </button>
        </div>


        {/* Feedback Message */}
        {message && (
          <div className={`alert-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Full Name Input */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone Input */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input password-input"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="icon" size={18} />
                ) : (
                  <Eye className="icon" size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="password-input-container">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input password-input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="icon" size={18} />
                ) : (
                  <Eye className="icon" size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="hidden-checkbox"
              />
              <span className={`custom-checkbox ${agreeTerms ? 'checked' : ''}`}>
                {agreeTerms && <Check size={12} strokeWidth={3} className="check-icon" />}
              </span>
              <span className="checkbox-label">I agree to Terms & Conditions</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Log In Footer Link */}
          <div className="form-footer">
            <span className="footer-text">Already have an account? </span>
            <a
              href="#login"
              className="signup-link"
              onClick={(e) => {
                e.preventDefault();
                if (onSwitchToLogin) onSwitchToLogin();
              }}
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
