import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useInternTrack } from './context/AppContext';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';
import AuthScreen from './components/AuthScreen';

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

import './App.css';

// Main Application Layout
const MainLayout = () => {
  const { isLoggedIn } = useInternTrack();

  // If not logged in, render the Student Login & Registration Screen
  if (!isLoggedIn) {
    return (
      <>
        <AuthScreen />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="app-shell">
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Right Body */}
      <div className="app-body">
        {/* Top Sticky Navbar */}
        <Navbar />

        {/* Dynamic Page Views */}
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

      {/* Floating Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export const App = () => {
  return (
    <HashRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </HashRouter>
  );
};

export default App;
