import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInternTrack } from '../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  CheckCheck,
  User,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const {
    profile,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsSidebarOpen,
    resetDemoData,
    searchQuery,
    setSearchQuery
  } = useInternTrack();

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="notif-icon-success" />;
      case 'warning':
        return <AlertTriangle size={16} className="notif-icon-warning" />;
      default:
        return <Info size={16} className="notif-icon-info" />;
    }
  };

  return (
    <header className="it-navbar">
      {/* Left: Mobile Toggle & Search */}
      <div className="navbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={22} />
        </button>

        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <Search size={17} className="search-icon" />
          <input
            type="text"
            placeholder="Search internships, companies, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery('')}
            >
              &times;
            </button>
          )}
        </form>
      </div>

      {/* Right: Actions, Notifications, Profile Pill */}
      <div className="navbar-right">
        {/* Academic Status Badge */}
        <div className="academic-status-pill">
          <span className="live-indicator"></span>
          <span className="status-text">7th Sem SIP Portal</span>
        </div>

        {/* Notifications Popover */}
        <div className="dropdown-container" ref={notifRef}>
          <button
            className={`icon-btn ${unreadCount > 0 ? 'has-badge' : ''}`}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="View notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="dropdown-menu notif-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-title-group">
                  <h4>Notifications</h4>
                  <span className="badge badge-info">{unreadCount} new</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    className="dropdown-action-btn"
                    onClick={markAllNotificationsRead}
                  >
                    <CheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>

              <div className="notif-list">
                {notifications.length === 0 ? (
                  <p className="empty-notif">No notifications at this moment.</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`notif-item ${item.read ? 'read' : 'unread'}`}
                      onClick={() => {
                        markNotificationRead(item.id);
                        if (item.link) {
                          navigate(item.link);
                          setShowNotifications(false);
                        }
                      }}
                    >
                      <div className="notif-icon-wrapper">
                        {getNotifIcon(item.type)}
                      </div>
                      <div className="notif-text">
                        <h5>{item.title}</h5>
                        <p>{item.message}</p>
                        <span className="notif-time">{item.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="dropdown-footer">
                <Link
                  to="/my-applications"
                  onClick={() => setShowNotifications(false)}
                >
                  View Application Updates &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill & Dropdown */}
        <div className="dropdown-container" ref={profileRef}>
          <button
            className="user-profile-pill"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="user-avatar"
            />
            <div className="user-info-text">
              <span className="user-name">{profile.fullName}</span>
              <span className="user-role">Intern / 7th Sem</span>
            </div>
            <ChevronDown size={16} className={`dropdown-chevron ${showProfileMenu ? 'open' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <div className="profile-dropdown-header">
                <p className="signed-as">Signed in as</p>
                <p className="profile-email">{profile.email}</p>
                <div className="profile-college-tag">{profile.collegeName}</div>
              </div>

              <div className="dropdown-divider"></div>

              <ul className="profile-menu-links">
                <li>
                  <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                    <User size={16} /> My Student Profile
                  </Link>
                </li>
                <li>
                  <Link to="/my-applications" onClick={() => setShowProfileMenu(false)}>
                    <Briefcase size={16} /> Track Applications
                  </Link>
                </li>
                <li>
                  <button
                    className="menu-button-action"
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (window.confirm("Reset demo data to initial state? This is useful for evaluator testing.")) {
                        resetDemoData();
                      }
                    }}
                  >
                    <RotateCcw size={16} /> Reset Demo Data (Evaluator Mode)
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
