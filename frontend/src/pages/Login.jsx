import { useState } from 'react';
import { Eye, EyeOff, Check, User, Building2, X } from 'lucide-react';

export default function Login({ onSwitchToSignUp, onLoginSuccess, onClose, isModal = false }) {
  const [role, setRole] = useState('athlete'); // 'athlete' | 'academy'
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({
        type: 'success',
        text: `Successfully logged in as ${role === 'athlete' ? 'Athlete' : 'Academy'}!`
      });

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(role);
        }
      }, 500);
    }, 800);
  };

  const loginCardContent = (
    <div className="login-card relative" onClick={(e) => e.stopPropagation()}>
      {/* Modal Close Button */}
      {(onClose || isModal) && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close login modal"
        >
          <X size={20} />
        </button>
      )}

      {/* Top Tag Header */}
      <div className="login-tag">
        <span className="tag-symbol"></span>STRIDE AUTHENTICATION
      </div>

      {/* Welcome Text */}
      <div className="login-header">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Select your account type to proceed.</p>
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
        {/* Email / Phone Input */}
        <div className="form-group">
          <label htmlFor="emailOrPhone" className="form-label">
            {role === 'athlete' ? 'Athlete Email / Phone' : 'Academy Representative Email / Phone'}
          </label>
          <input
            id="emailOrPhone"
            type="text"
            className="form-input"
            placeholder={role === 'athlete' ? 'alex.morgan@stride.com' : 'contact@academy.org'}
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
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
              placeholder="Enter your password"
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

        {/* Remember Me & Forget Password */}
        <div className="form-options">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="hidden-checkbox"
            />
            <span className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}>
              {rememberMe && <Check size={12} strokeWidth={3} className="check-icon" />}
            </span>
            <span className="checkbox-label">Remember me</span>
          </label>

          <a
            href="#forgot-password"
            className="forgot-password-link"
            onClick={(e) => {
              e.preventDefault();
              alert('Reset password link sent to your email!');
            }}
          >
            Forget Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Logging in...'
            : `Login as ${role === 'athlete' ? 'Athlete' : 'Academy'}`}
        </button>

        {/* Sign Up Footer */}
        <div className="form-footer">
          <span className="footer-text">Don't have an account? </span>
          <a
            href="#signup"
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              if (onSwitchToSignUp) onSwitchToSignUp();
            }}
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );

  if (isModal || onClose) {
    return (
      <div className="matchpoint-modal-backdrop" onClick={onClose}>
        {loginCardContent}
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      {loginCardContent}
    </div>
  );
}
