import React from 'react';
import { NavLink } from 'react-router-dom';
import { useInternTrack } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  FileSpreadsheet,
  FileCheck2,
  CheckSquare,
  CalendarDays,
  BookOpen,
  FolderLock,
  User,
  LogOut,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';
import './Sidebar.css';

export const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, metrics, logoutUser, profile } = useInternTrack();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Internships', path: '/internships', icon: Compass },
    { name: 'Apply Internship', path: '/apply', icon: FileSpreadsheet },
    {
      name: 'My Applications',
      path: '/my-applications',
      icon: FileCheck2,
      badge: metrics.totalApplications > 0 ? metrics.totalApplications : null
    },
    {
      name: 'Task Management',
      path: '/tasks',
      icon: CheckSquare,
      badge: metrics.pendingTasks > 0 ? metrics.pendingTasks : null,
      badgeColor: 'warning'
    },
    { name: 'Attendance', path: '/attendance', icon: CalendarDays },
    { name: 'Internship Diary', path: '/internship-diary', icon: BookOpen },
    { name: 'Documents', path: '/documents', icon: FolderLock },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  const handleLogout = () => {
    if (window.confirm("Do you want to log out of your student session?")) {
      logoutUser();
    }
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 992) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`it-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <GraduationCap size={22} color="#ffffff" />
            </div>
            <div className="brand-text">
              <h2>InternTrack</h2>
              <span className="brand-tag">SIP 7th Sem</span>
            </div>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Academic Project Info Pill */}
        <div className="sidebar-project-badge">
          <div className="badge-pill">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Summer Internship Program</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeSidebarOnMobile}
                    end={item.path === '/'}
                  >
                    <Icon size={19} className="nav-icon" />
                    <span className="nav-label">{item.name}</span>
                    {item.badge && (
                      <span className={`nav-badge ${item.badgeColor === 'warning' ? 'warning' : 'primary'}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section with Logout */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} className="logout-icon" />
            <span>Sign Out</span>
          </button>
          <div className="footer-meta">
            <p>{profile?.collegeName || 'Engineering College'} &copy; 2026</p>
            <p className="academic-viva">B.Tech 7th Sem SIP Portal</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

