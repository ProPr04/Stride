import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

export default function SignUp({ onSwitchToLogin }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (!agreeTerms) {
      setMessage({ type: 'error', text: 'Please agree to the Terms & Conditions.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ type: 'success', text: 'Account created successfully! Redirecting to login...' });
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Top Tag Header */}
        <div className="login-tag">
          <span className="tag-symbol"></span>08. SIGN UP
        </div>

        {/* Welcome Text */}
        <div className="login-header">
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Join us today by filling in your details below.</p>
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
