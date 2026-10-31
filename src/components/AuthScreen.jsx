import React, { useState } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  GraduationCap,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Building,
  Phone,
  BookOpen,
  Calendar,
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

  // Email format validator
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Phone validator (at least 10 digits)
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginEmail.trim()) {
      errors.loginEmail = 'Email address is required.';
    } else if (!isValidEmail(loginEmail)) {
      errors.loginEmail = 'Please enter a valid email address.';
    }

    if (!loginPassword) {
      errors.loginPassword = 'Password is required.';
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
      errors.fullName = 'Full Name is required (at least 2 characters).';
    }

    if (!registerData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!isValidEmail(registerData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!registerData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!isValidPhone(registerData.phone)) {
      errors.phone = 'Please enter a valid 10-digit contact number.';
    }

    if (!registerData.collegeName.trim()) {
      errors.collegeName = 'College / University name is required.';
    }

    if (!registerData.branch) {
      errors.branch = 'Branch is required.';
    }

    if (!registerData.semester) {
      errors.semester = 'Semester is required.';
    }

    if (!registerData.graduationYear) {
      errors.graduationYear = 'Graduation Year is required.';
    }

    if (!registerData.password) {
      errors.password = 'Password is required.';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
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
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Header branding */}
        <div className="auth-brand-header">
          <div className="brand-logo-circle">
            <GraduationCap size={32} color="#ffffff" />
          </div>
          <h1>InternTrack</h1>
          <p className="auth-tagline">Smart Internship Management System &bull; B.Tech SIP Project</p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tab-row">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setFormErrors({});
            }}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setFormErrors({});
            }}
          >
            <UserPlus size={16} /> Create Account
          </button>
        </div>

        {/* Global Error Banner */}
        {formErrors.general && (
          <div className="auth-alert-error">{formErrors.general}</div>
        )}

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form-body" noValidate>
            <div className="form-group">
              <label htmlFor="loginEmail">
                <Mail size={14} /> Student Email Address <span className="required">*</span>
              </label>
              <input
                id="loginEmail"
                type="email"
                className={`form-control ${formErrors.loginEmail ? 'error' : ''}`}
                placeholder="e.g. yourname@college.edu"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {formErrors.loginEmail && (
                <span className="form-error-msg">{formErrors.loginEmail}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">
                <Lock size={14} /> Password <span className="required">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  id="loginPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${formErrors.loginPassword ? 'error' : ''}`}
                  placeholder="Enter your account password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formErrors.loginPassword && (
                <span className="form-error-msg">{formErrors.loginPassword}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In to Student Dashboard'}</span>
              <ArrowRight size={16} />
            </button>

            <div className="auth-switch-prompt">
              <span>Don't have an account yet?</span>{' '}
              <button
                type="button"
                className="link-btn"
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

        {/* TAB 2: REGISTER NEW STUDENT */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form-body" noValidate>
            <p className="register-instruction">
              Enter your student details below. A personal, isolated workspace will be created specifically for you.
            </p>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="regFullName">
                  <User size={14} /> Full Name <span className="required">*</span>
                </label>
                <input
                  id="regFullName"
                  type="text"
                  className={`form-control ${formErrors.fullName ? 'error' : ''}`}
                  placeholder="e.g. John Doe"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                  required
                />
                {formErrors.fullName && <span className="form-error-msg">{formErrors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="regEmail">
                  <Mail size={14} /> Email Address <span className="required">*</span>
                </label>
                <input
                  id="regEmail"
                  type="email"
                  className={`form-control ${formErrors.email ? 'error' : ''}`}
                  placeholder="student@college.edu"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
                {formErrors.email && <span className="form-error-msg">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="regPhone">
                  <Phone size={14} /> Phone Number <span className="required">*</span>
                </label>
                <input
                  id="regPhone"
                  type="tel"
                  className={`form-control ${formErrors.phone ? 'error' : ''}`}
                  placeholder="e.g. 9876543210"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                />
                {formErrors.phone && <span className="form-error-msg">{formErrors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="regCollege">
                  <Building size={14} /> College Name <span className="required">*</span>
                </label>
                <input
                  id="regCollege"
                  type="text"
                  className={`form-control ${formErrors.collegeName ? 'error' : ''}`}
                  placeholder="e.g. National Institute of Technology"
                  value={registerData.collegeName}
                  onChange={(e) => setRegisterData({ ...registerData, collegeName: e.target.value })}
                  required
                />
                {formErrors.collegeName && <span className="form-error-msg">{formErrors.collegeName}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="regBranch">
                  <BookOpen size={14} /> Branch / Department <span className="required">*</span>
                </label>
                <select
                  id="regBranch"
                  className="form-control"
                  value={registerData.branch}
                  onChange={(e) => setRegisterData({ ...registerData, branch: e.target.value })}
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="regSemester">
                  <GraduationCap size={14} /> Semester <span className="required">*</span>
                </label>
                <select
                  id="regSemester"
                  className="form-control"
                  value={registerData.semester}
                  onChange={(e) => setRegisterData({ ...registerData, semester: e.target.value })}
                >
                  {semesters.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regGradYear">
                <Calendar size={14} /> Graduation Year <span className="required">*</span>
              </label>
              <select
                id="regGradYear"
                className="form-control"
                value={registerData.graduationYear}
                onChange={(e) => setRegisterData({ ...registerData, graduationYear: e.target.value })}
              >
                {graduationYears.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="regPassword">
                  <Lock size={14} /> Password (Min. 6 chars) <span className="required">*</span>
                </label>
                <input
                  id="regPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${formErrors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  autoComplete="new-password"
                  required
                />
                {formErrors.password && <span className="form-error-msg">{formErrors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="regConfirmPassword">
                  <Lock size={14} /> Confirm Password <span className="required">*</span>
                </label>
                <input
                  id="regConfirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${formErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  autoComplete="new-password"
                  required
                />
                {formErrors.confirmPassword && (
                  <span className="form-error-msg">{formErrors.confirmPassword}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Complete Registration & Open Dashboard'}</span>
              <ArrowRight size={16} />
            </button>

            <div className="auth-switch-prompt">
              <span>Already have an account?</span>{' '}
              <button
                type="button"
                className="link-btn"
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

        {/* Academic Simulation Notice */}
        <div className="academic-security-notice">
          <div className="notice-icon-box">
            <ShieldCheck size={16} color="#2563eb" />
          </div>
          <div className="notice-text">
            <strong>Academic Project Simulation:</strong> This frontend-only application runs locally in your browser. Client-side SHA-256 hashing is used so passwords are never stored in plaintext in LocalStorage. Each student's records remain completely isolated.
          </div>
        </div>

        <div className="auth-footer-note">
          <p>InternTrack &bull; B.Tech 7th Semester Summer Internship Program (SIP) Capstone &copy; 2026</p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
