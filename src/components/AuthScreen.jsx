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
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import './AuthScreen.css';

export const AuthScreen = () => {
  const { registerUser, loginUser, clearAllDataToFresh, users } = useInternTrack();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginId, setLoginId] = useState('2021BTCS084');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register Form State
  const [registerData, setRegisterData] = useState({
    fullName: '',
    enrollmentNo: '',
    email: '',
    phone: '',
    collegeName: '',
    branch: 'Computer Science & Engineering',
    semester: '7th Semester',
    password: '',
    confirmPassword: '',
    startWithCleanData: true
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginId.trim() || !loginPassword.trim()) {
      setFormErrors({ login: 'Please enter your Roll Number / Email and Password.' });
      return;
    }
    setFormErrors({});
    loginUser(loginId, loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!registerData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!registerData.enrollmentNo.trim()) errors.enrollmentNo = 'Student Roll / Enrollment No. is required.';
    if (!registerData.email.trim()) errors.email = 'Email address is required.';
    if (!registerData.collegeName.trim()) errors.collegeName = 'College / University Name is required.';
    if (!registerData.password) errors.password = 'Password is required.';
    else if (registerData.password.length < 4) errors.password = 'Password must be at least 4 characters.';
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const res = registerUser(registerData);
    if (res.success && registerData.startWithCleanData) {
      clearAllDataToFresh();
    }
  };

  const handleQuickDemoLogin = (user) => {
    loginUser(user.enrollmentNo, user.password);
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
          <p className="auth-tagline">Student Internship Management System &bull; B.Tech SIP</p>
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
            <LogIn size={16} /> Student Login
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setFormErrors({});
            }}
          >
            <UserPlus size={16} /> Create Student ID
          </button>
        </div>

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form-body">
            {formErrors.login && (
              <div className="auth-alert-error">{formErrors.login}</div>
            )}

            <div className="form-group">
              <label>
                <User size={14} /> Student Roll No. / Enrollment ID or Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 2021BTCS084 or your email"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Lock size={14} /> Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn">
              <span>Sign In to Student Dashboard</span>
              <ArrowRight size={16} />
            </button>

            {/* Quick Demo Accounts List */}
            <div className="quick-access-box">
              <div className="quick-acc-title">
                <Sparkles size={14} className="sparkle" />
                <span>Quick Access Accounts:</span>
              </div>
              <div className="demo-accounts-list">
                {users.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    className="demo-acc-pill"
                    onClick={() => handleQuickDemoLogin(u)}
                  >
                    <strong>{u.fullName}</strong>
                    <span>({u.enrollmentNo})</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER NEW STUDENT */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form-body">
            <p className="register-instruction">
              Enter your own student details below. A personalized workspace and Student ID will be generated in your browser.
            </p>

            <div className="form-row-2">
              <div className="form-group">
                <label>
                  Full Student Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Rahul Verma"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                />
                {formErrors.fullName && <span className="form-error-msg">{formErrors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>
                  Roll / Enrollment No. (Your User ID) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.enrollmentNo ? 'error' : ''}`}
                  placeholder="e.g. 2021BTCS102"
                  value={registerData.enrollmentNo}
                  onChange={(e) => setRegisterData({ ...registerData, enrollmentNo: e.target.value })}
                />
                {formErrors.enrollmentNo && <span className="form-error-msg">{formErrors.enrollmentNo}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>
                  College / Institute Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.collegeName ? 'error' : ''}`}
                  placeholder="e.g. Government Engineering College"
                  value={registerData.collegeName}
                  onChange={(e) => setRegisterData({ ...registerData, collegeName: e.target.value })}
                />
                {formErrors.collegeName && <span className="form-error-msg">{formErrors.collegeName}</span>}
              </div>

              <div className="form-group">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? 'error' : ''}`}
                  placeholder="student@college.edu.in"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
                {formErrors.email && <span className="form-error-msg">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Branch / Department</label>
                <select
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
                <label>Current Semester</label>
                <select
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

            <div className="form-row-2">
              <div className="form-group">
                <label>
                  Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control ${formErrors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
                {formErrors.password && <span className="form-error-msg">{formErrors.password}</span>}
              </div>

              <div className="form-group">
                <label>
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control ${formErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />
                {formErrors.confirmPassword && (
                  <span className="form-error-msg">{formErrors.confirmPassword}</span>
                )}
              </div>
            </div>

            {/* Clean start checkbox */}
            <div className="clean-data-checkbox-row">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={registerData.startWithCleanData}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, startWithCleanData: e.target.checked })
                  }
                />
                <span className="checkbox-text">
                  <strong>Start with 100% clean data</strong> (Wipe sample/dummy entries so I can enter my own genuine tasks, attendance, and documents).
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn">
              <span>Create Account & Launch Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        <div className="auth-footer-note">
          <p>
            InternTrack &bull; Developed by B.Tech 7th Sem Students for SIP Capstone Evaluation &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;

