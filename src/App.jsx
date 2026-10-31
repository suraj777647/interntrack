import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useInternTrack } from './context/AppContext';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';

// Pages
import Dashboard from './pages/Dashboard';
import Internships from './pages/Internships';
import ApplyInternship from './pages/ApplyInternship';
import MyApplications from './pages/MyApplications';
import TaskManagement from './pages/TaskManagement';
import Attendance from './pages/Attendance';
import InternshipDiary from './pages/InternshipDiary';
import Documents from './pages/Documents';
import Profile from './pages/Profile';

import { GraduationCap, LogIn, Sparkles } from 'lucide-react';
import './App.css';

// Main Application Layout
const MainLayout = () => {
  const { isLoggedIn, setIsLoggedIn, profile } = useInternTrack();

  // Simulated Logout State UI
  if (!isLoggedIn) {
    return (
      <div className="logged-out-container">
        <div className="logged-out-card">
          <div className="logged-out-icon">
            <GraduationCap size={40} color="#2563eb" />
          </div>
          <h2>InternTrack</h2>
          <span className="badge badge-info">B.Tech 7th Semester SIP Project</span>
          <p className="logged-out-desc">
            You have signed out of the student session. This is a frontend demonstration of the authentication lifecycle.
          </p>

          <div className="demo-user-preview">
            <img src={profile.avatar} alt={profile.fullName} className="demo-avatar" />
            <div>
              <strong>{profile.fullName}</strong>
              <p>{profile.collegeName}</p>
            </div>
          </div>

          <button
            className="btn btn-primary sign-in-btn"
            onClick={() => setIsLoggedIn(true)}
          >
            <LogIn size={16} /> Sign Back In (1-Click Student Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Right Side */}
      <div className="app-body">
        {/* Top Sticky Navbar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="it-main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/apply" element={<ApplyInternship />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/internship-diary" element={<InternshipDiary />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
