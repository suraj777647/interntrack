import React, { useState } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  GraduationCap,
  LogIn,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import './AuthScreen.css';

export const AuthScreen = () => {
  const { registerUser, loginUser } = useInternTrack();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    branch: 'Computer Science & Engineering',
    semester: '7th Semester',
    graduationYear: '2026',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const semesters = [
    '5th Semester',
    '6th Semester',
    '7th Semester (SIP Capstone)',
    '8th Semester'
  ];

  const graduationYears = ['2024', '2025', '2026', '2027', '2028', '2029'];

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginEmail.trim()) {
      errors.loginEmail = 'Email is required';
    } else if (!isValidEmail(loginEmail)) {
      errors.loginEmail = 'Enter a valid email address';
    }

    if (!loginPassword) {
      errors.loginPassword = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    try {
      const res = await loginUser(loginEmail, loginPassword);
      if (!res.success) {
        setFormErrors({ general: res.message || 'Invalid email or password.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!registerData.fullName.trim() || registerData.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (min. 2 characters)';
    }

    if (!registerData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!isValidEmail(registerData.email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!registerData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(registerData.phone)) {
      errors.phone = 'Enter valid 10-digit number';
    }

    if (!registerData.collegeName.trim()) {
      errors.collegeName = 'College name is required';
    }

    if (!registerData.branch) {
      errors.branch = 'Branch is required';
    }

    if (!registerData.semester) {
      errors.semester = 'Semester is required';
    }

    if (!registerData.graduationYear) {
      errors.graduationYear = 'Graduation year is required';
    }

    if (!registerData.password) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Min. 6 characters required';
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    try {
      const res = await registerUser(registerData);
      if (!res.success) {
        setFormErrors({ general: res.message || 'Registration failed.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-card ${activeTab === 'register' ? 'auth-card-wide' : ''}`}>
        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <GraduationCap size={22} className="auth-logo-icon" />
          </div>
          <h1 className="auth-title">InternTrack</h1>
          <p className="auth-subtitle">Student Internship Management System</p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-segmented-control" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'login'}
            className={`auth-segment-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setFormErrors({});
            }}
          >
            <LogIn size={15} /> Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'register'}
            className={`auth-segment-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setFormErrors({});
            }}
          >
            <UserPlus size={15} /> Create Account
          </button>
        </div>

        {/* Global Error Banner */}
        {formErrors.general && (
          <div className="auth-error-banner" role="alert">
            {formErrors.general}
          </div>
        )}

        {/* TAB 1: SIGN IN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
            <div className="auth-field">
              <label htmlFor="loginEmail">
                Student Email <span className="req-star">*</span>
              </label>
              <input
                id="loginEmail"
                type="email"
                className={`auth-input ${formErrors.loginEmail ? 'input-error' : ''}`}
                placeholder="name@college.edu"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {formErrors.loginEmail && (
                <span className="auth-field-error">{formErrors.loginEmail}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="loginPassword">
                Password <span className="req-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <input
                  id="loginPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`auth-input ${formErrors.loginPassword ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formErrors.loginPassword && (
                <span className="auth-field-error">{formErrors.loginPassword}</span>
              )}
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight size={15} />
            </button>

            <div className="auth-switch-footer">
              <span>Don't have an account?</span>{' '}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setActiveTab('register');
                  setFormErrors({});
                }}
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: CREATE ACCOUNT */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form" noValidate>
            <div className="auth-grid-2">
              <div className="auth-field">
                <label htmlFor="regFullName">
                  Full Name <span className="req-star">*</span>
                </label>
                <input
                  id="regFullName"
                  type="text"
                  className={`auth-input ${formErrors.fullName ? 'input-error' : ''}`}
                  placeholder="e.g. John Doe"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                  required
                />
                {formErrors.fullName && (
                  <span className="auth-field-error">{formErrors.fullName}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="regEmail">
                  Email Address <span className="req-star">*</span>
                </label>
                <input
                  id="regEmail"
                  type="email"
                  className={`auth-input ${formErrors.email ? 'input-error' : ''}`}
                  placeholder="student@college.edu"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
                {formErrors.email && (
                  <span className="auth-field-error">{formErrors.email}</span>
                )}
              </div>
            </div>

            <div className="auth-grid-2">
              <div className="auth-field">
                <label htmlFor="regPhone">
                  Phone Number <span className="req-star">*</span>
                </label>
                <input
                  id="regPhone"
                  type="tel"
                  className={`auth-input ${formErrors.phone ? 'input-error' : ''}`}
                  placeholder="10-digit number"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                />
                {formErrors.phone && (
                  <span className="auth-field-error">{formErrors.phone}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="regCollege">
                  College Name <span className="req-star">*</span>
                </label>
                <input
                  id="regCollege"
                  type="text"
                  className={`auth-input ${formErrors.collegeName ? 'input-error' : ''}`}
                  placeholder="College / Institute"
                  value={registerData.collegeName}
                  onChange={(e) => setRegisterData({ ...registerData, collegeName: e.target.value })}
                  required
                />
                {formErrors.collegeName && (
                  <span className="auth-field-error">{formErrors.collegeName}</span>
                )}
              </div>
            </div>

            <div className="auth-grid-2">
              <div className="auth-field">
                <label htmlFor="regBranch">
                  Branch / Dept <span className="req-star">*</span>
                </label>
                <select
                  id="regBranch"
                  className="auth-input"
                  value={registerData.branch}
                  onChange={(e) => setRegisterData({ ...registerData, branch: e.target.value })}
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="auth-field">
                <label htmlFor="regSemester">
                  Semester <span className="req-star">*</span>
                </label>
                <select
                  id="regSemester"
                  className="auth-input"
                  value={registerData.semester}
                  onChange={(e) => setRegisterData({ ...registerData, semester: e.target.value })}
                >
                  {semesters.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="regGradYear">
                Graduation Year <span className="req-star">*</span>
              </label>
              <select
                id="regGradYear"
                className="auth-input"
                value={registerData.graduationYear}
                onChange={(e) => setRegisterData({ ...registerData, graduationYear: e.target.value })}
              >
                {graduationYears.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            <div className="auth-grid-2">
              <div className="auth-field">
                <label htmlFor="regPassword">
                  Password <span className="req-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="regPassword"
                    type={showPassword ? 'text' : 'password'}
                    className={`auth-input ${formErrors.password ? 'input-error' : ''}`}
                    placeholder="Min. 6 chars"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.password && (
                  <span className="auth-field-error">{formErrors.password}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="regConfirmPassword">
                  Confirm Password <span className="req-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    id="regConfirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`auth-input ${formErrors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Re-enter password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <span className="auth-field-error">{formErrors.confirmPassword}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight size={15} />
            </button>

            <div className="auth-switch-footer">
              <span>Already have an account?</span>{' '}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setActiveTab('login');
                  setFormErrors({});
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Small Academic Disclaimer */}
        <div className="auth-disclaimer">
          <ShieldCheck size={13} className="disclaimer-icon" />
          <span>Academic demo project &bull; LocalStorage isolated &bull; SHA-256 hashed</span>
        </div>

        <div className="auth-copyright">
          <span>InternTrack &bull; B.Tech SIP Project &copy; 2026</span>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
