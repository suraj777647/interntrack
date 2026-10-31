import React, { useState } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  Calendar,
  Check,
  Edit2,
  X,
  TrendingUp,
  Award,
  Plus,
  Trash2
} from 'lucide-react';
import './Attendance.css';

export const Attendance = () => {
  const {
    attendance,
    attendanceStats,
    logAttendance,
    markTodayAttendance,
    updateAttendanceRecord
  } = useInternTrack();

  const [activeDateModal, setActiveDateModal] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Custom Log Modal State
  const [logFormData, setLogFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    workingHours: '8.5 hrs',
    note: ''
  });

  // Edit status modal state
  const [editStatus, setEditStatus] = useState('present');
  const [editNote, setEditNote] = useState('');

  // Safe attendance array
  const safeAttendance = Array.isArray(attendance) ? attendance : [];

  // Day names header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Leading blanks for calendar grid
  const leadingBlanks = Array.from({ length: 4 }, (_, i) => i);

  const handleOpenDayModal = (record) => {
    setActiveDateModal(record);
    setEditStatus(record.status);
    setEditNote(record.note || '');
  };

  const handleSaveDayStatus = (e) => {
    e.preventDefault();
    if (!activeDateModal) return;

    const isPresent = editStatus === 'present' || editStatus === 'od';

    updateAttendanceRecord(activeDateModal.id, {
      status: editStatus,
      checkIn: isPresent ? (activeDateModal.checkIn === '-' ? '09:15 AM' : activeDateModal.checkIn) : '-',
      checkOut: isPresent ? (activeDateModal.checkOut === '-' ? '05:45 PM' : activeDateModal.checkOut) : '-',
      workingHours: isPresent ? (activeDateModal.workingHours === '0 hrs' ? '8.0 hrs' : activeDateModal.workingHours) : '0 hrs',
      note: editNote
    });

    setActiveDateModal(null);
  };

  const handleCustomLogSubmit = (e) => {
    e.preventDefault();
    logAttendance(logFormData);
    setIsLogModalOpen(false);
    setLogFormData({
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      checkIn: '09:15 AM',
      checkOut: '05:45 PM',
      workingHours: '8.5 hrs',
      note: ''
    });
  };

  return (
    <div className="attendance-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <CalendarDays size={14} />
            <span>Attendance Register & Compliance</span>
          </div>
          <h1 className="page-title">Attendance Management</h1>
          <p className="page-subtitle">
            Log your daily internship check-ins, record working hours, and verify academic eligibility for 7th Sem SIP Viva.
          </p>
        </div>

        <div className="header-actions-group">
          <button className="btn btn-outline" onClick={() => setIsLogModalOpen(true)}>
            <Plus size={15} /> Log Any Date Entry
          </button>
          <button
            className="btn btn-primary"
            onClick={() => markTodayAttendance('present', 'Regularized student daily login')}
          >
            <Check size={16} /> Mark Today's Sign-in
          </button>
        </div>
      </div>

      {/* University Threshold Compliance Banner */}
      <div className={`compliance-banner ${attendanceStats.percentage >= 75 ? 'banner-pass' : 'banner-fail'}`}>
        <div className="compliance-icon-wrap">
          {attendanceStats.percentage >= 75 ? (
            <Award size={26} color="#16a34a" />
          ) : (
            <AlertTriangle size={26} color="#dc2626" />
          )}
        </div>
        <div className="compliance-text">
          <h4>
            {attendanceStats.percentage >= 75
              ? 'SIP Attendance Requirement Satisfied (≥ 75%)'
              : 'Attention: Attendance Below University Mandated Threshold'}
          </h4>
          <p>
            Your current attendance rate is <strong>{attendanceStats.percentage}%</strong>. The University Academic Council requires a minimum of 75% verified attendance for 7th Semester SIP Viva eligibility.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="stats-grid">
        <div className="it-card att-stat-card">
          <div className="att-stat-icon-wrap icon-blue">
            <Calendar size={22} />
          </div>
          <div className="att-stat-details">
            <span className="att-stat-label">Total Working Days</span>
            <h2 className="att-stat-value">{attendanceStats.totalWorkingDays}</h2>
            <span className="att-stat-sub">Excludes non-working days</span>
          </div>
        </div>

        <div className="it-card att-stat-card">
          <div className="att-stat-icon-wrap icon-green">
            <CheckCircle2 size={22} />
          </div>
          <div className="att-stat-details">
            <span className="att-stat-label">Present Days</span>
            <h2 className="att-stat-value text-success">{attendanceStats.presentDays}</h2>
            <span className="att-stat-sub">Office & On-Duty days logged</span>
          </div>
        </div>

        <div className="it-card att-stat-card">
          <div className="att-stat-icon-wrap icon-amber">
            <Clock size={22} />
          </div>
          <div className="att-stat-details">
            <span className="att-stat-label">Approved Leaves</span>
            <h2 className="att-stat-value text-amber">{attendanceStats.leaveDays}</h2>
            <span className="att-stat-sub">Exam & sanctioned leaves</span>
          </div>
        </div>

        <div className="it-card att-stat-card">
          <div className="att-stat-icon-wrap icon-purple">
            <TrendingUp size={22} />
          </div>
          <div className="att-stat-details">
            <span className="att-stat-label">Attendance Rate</span>
            <h2 className="att-stat-value text-primary">{attendanceStats.percentage}%</h2>
            <span className="att-stat-sub">Required: 75.0% min</span>
          </div>
        </div>
      </div>

      {/* Monthly Interactive Calendar View */}
      <div className="it-card calendar-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Monthly Calendar View</h3>
            <p className="card-subtitle">Click on any date to inspect sign-in logs or update status</p>
          </div>

          <div className="calendar-legend-pills">
            <span className="leg-item"><span className="leg-dot bg-present"></span> Present</span>
            <span className="leg-item"><span className="leg-dot bg-od"></span> On-Duty (OD)</span>
            <span className="leg-item"><span className="leg-dot bg-absent"></span> Absent</span>
            <span className="leg-item"><span className="leg-dot bg-leave"></span> Leave</span>
            <span className="leg-item"><span className="leg-dot bg-weekend"></span> Weekend</span>
          </div>
        </div>

        {/* Days Header */}
        <div className="calendar-week-header">
          {weekDays.map((day) => (
            <div key={day} className="week-day-cell">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-days-grid">
          {leadingBlanks.map((b) => (
            <div key={`blank-${b}`} className="calendar-day-box blank-day"></div>
          ))}

          {safeAttendance.map((rec) => {
            const isToday = rec.dayNumber === 31;

            return (
              <div
                key={rec.id}
                className={`calendar-day-box status-${rec.status} ${isToday ? 'current-day' : ''}`}
                onClick={() => handleOpenDayModal(rec)}
              >
                <div className="day-top">
                  <span className="day-number">{rec.dayNumber}</span>
                  {isToday && <span className="today-chip">Today</span>}
                </div>

                <div className="day-status-indicator">
                  <span className={`status-pill ${rec.status}`}>
                    {rec.status === 'present'
                      ? 'Present'
                      : rec.status === 'od'
                      ? 'On-Duty'
                      : rec.status === 'absent'
                      ? 'Absent'
                      : rec.status === 'leave'
                      ? 'Leave'
                      : 'Weekend'}
                  </span>
                </div>

                {(rec.status === 'present' || rec.status === 'od') && (
                  <div className="day-hours-snippet">{rec.workingHours}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="it-card table-card">
        <div className="card-header-row p-header">
          <div>
            <h3 className="card-title">Detailed Attendance Logbook</h3>
            <p className="card-subtitle">Verified record of working hours and timestamps</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setIsLogModalOpen(true)}>
            <Plus size={13} /> Add Manual Log
          </button>
        </div>

        <div className="table-responsive">
          <table className="apps-table">
            <thead>
              <tr>
                <th>Date & Day</th>
                <th>Status</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Hours</th>
                <th>Activity / Absence Notes</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {safeAttendance.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-muted">
                    No attendance records logged yet. Click "+ Log Any Date Entry" to record your days.
                  </td>
                </tr>
              ) : (
                safeAttendance.slice(0, 15).map((rec) => (
                  <tr key={rec.id}>
                    <td>
                      <div className="date-cell">
                        <Calendar size={13} />
                        <strong>{rec.date}</strong> ({rec.day})
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          rec.status === 'present'
                            ? 'badge-success'
                            : rec.status === 'od'
                            ? 'badge-purple'
                            : rec.status === 'absent'
                            ? 'badge-danger'
                            : rec.status === 'leave'
                            ? 'badge-warning'
                            : 'badge-neutral'
                        }`}
                      >
                        {rec.status === 'od' ? 'On-Duty' : rec.status}
                      </span>
                    </td>
                    <td>{rec.checkIn}</td>
                    <td>{rec.checkOut}</td>
                    <td>{rec.workingHours}</td>
                    <td>
                      <span className="rec-note-text">{rec.note}</span>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn-action view-btn"
                        onClick={() => handleOpenDayModal(rec)}
                      >
                        <Edit2 size={13} /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Add Custom Attendance Entry for ANY Date */}
      {isLogModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Record Attendance Entry</h3>
              <button className="modal-close-btn" onClick={() => setIsLogModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCustomLogSubmit}>
              <div className="modal-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>
                      Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={logFormData.date}
                      onChange={(e) => setLogFormData({ ...logFormData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Attendance Status</label>
                    <select
                      className="form-control"
                      value={logFormData.status}
                      onChange={(e) => setLogFormData({ ...logFormData, status: e.target.value })}
                    >
                      <option value="present">Present (Normal Work Day)</option>
                      <option value="od">On-Duty / OD (College Event / Exam)</option>
                      <option value="leave">Approved Leave</option>
                      <option value="absent">Absent</option>
                      <option value="weekend">Non-working Day / Weekend</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Check-in Time</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 09:15 AM"
                      value={logFormData.checkIn}
                      onChange={(e) => setLogFormData({ ...logFormData, checkIn: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Check-out Time</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 05:45 PM"
                      value={logFormData.checkOut}
                      onChange={(e) => setLogFormData({ ...logFormData, checkOut: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Total Working Hours Logged</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 8.5 hrs"
                    value={logFormData.workingHours}
                    onChange={(e) => setLogFormData({ ...logFormData, workingHours: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Activity Summary or Leave Justification</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Brief description of work done today or reason for leave..."
                    value={logFormData.note}
                    onChange={(e) => setLogFormData({ ...logFormData, note: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsLogModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Day Attendance */}
      {activeDateModal && (
        <div className="modal-overlay" onClick={() => setActiveDateModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Attendance Log &bull; {activeDateModal.date} ({activeDateModal.day})</h3>
              <button
                className="modal-close-btn"
                onClick={() => setActiveDateModal(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveDayStatus}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Attendance Status</label>
                  <select
                    className="form-control"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="present">Present (Normal Working Day)</option>
                    <option value="od">On-Duty / OD (College Event / Exam)</option>
                    <option value="absent">Absent</option>
                    <option value="leave">Approved Leave / College Exam</option>
                    <option value="weekend">Weekend / Non-working Day</option>
                  </select>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Check-in Time</label>
                    <input
                      type="text"
                      className="form-control"
                      value={activeDateModal.checkIn}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Check-out Time</label>
                    <input
                      type="text"
                      className="form-control"
                      value={activeDateModal.checkOut}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Daily Activity / Leave Justification</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Enter tasks accomplished or justification for absence..."
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setActiveDateModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Attendance Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
