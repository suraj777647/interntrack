import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInternTrack } from '../context/AppContext';
import {
  FileCheck2,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Building,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  RotateCw
} from 'lucide-react';
import './MyApplications.css';

export const MyApplications = () => {
  const { applications, updateApplicationStatus, deleteApplication } = useInternTrack();
  const navigate = useNavigate();

  // Search & Status Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Active Application for Detail View Modal
  const [activeApp, setActiveApp] = useState(null);

  // Status simulation selector in modal
  const [newSimulatedStatus, setNewSimulatedStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const statusOptions = ['Pending', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'];

  // Counts for pills
  const counts = useMemo(() => {
    const res = { All: applications.length, Selected: 0, Shortlisted: 0, 'Under Review': 0, Pending: 0, Rejected: 0 };
    applications.forEach((a) => {
      if (res[a.status] !== undefined) {
        res[a.status]++;
      }
    });
    return res;
  }, [applications]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatusFilter === 'All' || app.status === selectedStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, selectedStatusFilter]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Selected':
        return 'badge-success';
      case 'Shortlisted':
        return 'badge-purple';
      case 'Under Review':
        return 'badge-info';
      case 'Pending':
        return 'badge-warning';
      case 'Rejected':
        return 'badge-danger';
      default:
        return 'badge-neutral';
    }
  };

  const handleOpenDetailModal = (app) => {
    setActiveApp(app);
    setNewSimulatedStatus(app.status);
    setStatusNote('');
  };

  const handleStatusUpdateSubmit = (e) => {
    e.preventDefault();
    if (!activeApp || !newSimulatedStatus) return;

    updateApplicationStatus(
      activeApp.id,
      newSimulatedStatus,
      statusNote || `Updated status to ${newSimulatedStatus} via simulation control.`
    );

    // Update active modal view with newly updated item
    setActiveApp((prev) => ({
      ...prev,
      status: newSimulatedStatus,
      statusHistory: [
        ...(prev.statusHistory || []),
        {
          status: newSimulatedStatus,
          date: new Date().toISOString().split('T')[0],
          note: statusNote || `Status updated to ${newSimulatedStatus}.`
        }
      ]
    }));
    setStatusNote('');
  };

  const handleDelete = (appId) => {
    if (window.confirm('Are you sure you want to withdraw this application? This action will remove it from your records.')) {
      deleteApplication(appId);
      if (activeApp && activeApp.id === appId) {
        setActiveApp(null);
      }
    }
  };

  return (
    <div className="my-applications-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <FileCheck2 size={14} />
            <span>Applications Tracker</span>
          </div>
          <h1 className="page-title">My Internship Applications</h1>
          <p className="page-subtitle">
            Track hiring progression, interview stages, and status updates for your SIP submissions.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/apply')}>
          + Submit New Application
        </button>
      </div>

      {/* Filter Tabs by Status */}
      <div className="status-filter-tabs">
        {['All', 'Selected', 'Shortlisted', 'Under Review', 'Pending', 'Rejected'].map((status) => (
          <button
            key={status}
            className={`status-tab-btn ${selectedStatusFilter === status ? 'active' : ''}`}
            onClick={() => setSelectedStatusFilter(status)}
          >
            <span>{status}</span>
            <span className="tab-count">{counts[status] || 0}</span>
          </button>
        ))}
      </div>

      {/* Search & Actions Bar */}
      <div className="it-card search-card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search submitted applications by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Applications Table / Cards */}
      {filteredApps.length === 0 ? (
        <div className="it-card empty-state-card">
          <FileCheck2 size={48} className="empty-icon" />
          <h3>No applications found</h3>
          <p>
            {searchTerm || selectedStatusFilter !== 'All'
              ? 'Try clearing your search filters to view your applications.'
              : 'You have not submitted any internship applications yet.'}
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/internships')}>
            Explore Available Internships
          </button>
        </div>
      ) : (
        <div className="it-card table-card">
          <div className="table-responsive">
            <table className="apps-table">
              <thead>
                <tr>
                  <th>Internship Role & Company</th>
                  <th>Application Date</th>
                  <th>Mode / Stipend</th>
                  <th>Current Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="app-role-cell">
                        <div className="company-icon-bullet">
                          <Building size={16} />
                        </div>
                        <div>
                          <h4 className="app-title">{app.title}</h4>
                          <span className="app-company">{app.company}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={13} />
                        <span>{app.appliedDate}</span>
                      </div>
                    </td>
                    <td>
                      <div className="mode-stipend-cell">
                        <span className="mode-badge">{app.workMode || 'Remote'}</span>
                        <span className="stipend-text">{app.stipend || 'Unspecified'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions-group">
                        <button
                          className="btn-action view-btn"
                          title="View Details & Status Timeline"
                          onClick={() => handleOpenDetailModal(app)}
                        >
                          <Eye size={15} /> Details
                        </button>
                        <button
                          className="btn-action delete-btn"
                          title="Withdraw Application"
                          onClick={() => handleDelete(app.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Details & Status Simulation Modal */}
      {activeApp && (
        <div className="modal-overlay" onClick={() => setActiveApp(null)}>
          <div
            className="modal-content app-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>{activeApp.title}</h3>
                <p className="modal-subtitle">
                  {activeApp.company} &bull; Reference ID: <span className="font-mono">{activeApp.id}</span>
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveApp(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Status Header Badge */}
              <div className="modal-status-banner">
                <div className="status-banner-left">
                  <span className="status-lead">Current Status:</span>
                  <span className={`badge ${getStatusBadgeClass(activeApp.status)}`}>
                    {activeApp.status}
                  </span>
                </div>
                <span className="applied-on-text">Applied on: {activeApp.appliedDate}</span>
              </div>

              {/* Status Progression Simulation (Great for Viva Demonstrations) */}
              <div className="status-simulation-box">
                <div className="sim-header">
                  <RotateCw size={15} className="sim-icon" />
                  <h4>Simulate Status Progression (Evaluator Tool)</h4>
                </div>
                <p className="sim-desc">
                  Academic feature: Test how changing hiring decisions updates dashboard statistics and application timelines.
                </p>
                <form className="sim-form" onSubmit={handleStatusUpdateSubmit}>
                  <div className="sim-controls-row">
                    <select
                      className="form-control sim-select"
                      value={newSimulatedStatus}
                      onChange={(e) => setNewSimulatedStatus(e.target.value)}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add an optional evaluation / hiring note..."
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary btn-sm">
                      Update
                    </button>
                  </div>
                </form>
              </div>

              {/* Status History Timeline */}
              <div className="app-timeline-section">
                <h4>Application Status History</h4>
                <div className="history-timeline">
                  {(activeApp.statusHistory || []).map((step, idx) => (
                    <div key={idx} className="history-step">
                      <div className="step-marker">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="step-content">
                        <div className="step-header-row">
                          <span className={`badge ${getStatusBadgeClass(step.status)}`}>
                            {step.status}
                          </span>
                          <span className="step-date">{step.date}</span>
                        </div>
                        <p className="step-note">{step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Info Summary */}
              <div className="candidate-info-summary">
                <h4>Submitted Credentials</h4>
                <div className="creds-grid">
                  <div className="cred-item">
                    <span className="c-label">Applicant Name</span>
                    <span className="c-val">{activeApp.candidateName}</span>
                  </div>
                  <div className="cred-item">
                    <span className="c-label">Email</span>
                    <span className="c-val">{activeApp.candidateEmail}</span>
                  </div>
                  <div className="cred-item">
                    <span className="c-label">Phone</span>
                    <span className="c-val">{activeApp.candidatePhone}</span>
                  </div>
                  <div className="cred-item">
                    <span className="c-label">College</span>
                    <span className="c-val">{activeApp.college}</span>
                  </div>
                  <div className="cred-item full-width">
                    <span className="c-label">Attached Resume</span>
                    <span className="c-val file-attached">
                      <FileText size={14} /> {activeApp.resumeFileName || 'Resume.pdf'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              {activeApp.coverLetter && (
                <div className="cover-letter-section">
                  <h4>Submitted Statement of Purpose / Cover Letter</h4>
                  <div className="cover-letter-body">{activeApp.coverLetter}</div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(activeApp.id)}
              >
                <Trash2 size={14} /> Withdraw Application
              </button>
              <button className="btn btn-outline" onClick={() => setActiveApp(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
