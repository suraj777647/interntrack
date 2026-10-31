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
  Award
} from 'lucide-react';
import './Attendance.css';

export const Attendance = () => {
  const {
    attendance,
    attendanceStats,
    markTodayAttendance,
    updateAttendanceRecord
  } = useInternTrack();

  const [activeDateModal, setActiveDateModal] = useState(null);
  const [editStatus, setEditStatus] = useState('present');
  const [editNote, setEditNote] = useState('');

  // Day names header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // October 2026 starts on Thursday (index 4)
  // Let's create leading blank days for calendar grid
  const leadingBlanks = Array.from({ length: 4 }, (_, i) => i);

  const handleOpenDayModal = (record) => {
    setActiveDateModal(record);
    setEditStatus(record.status);
    setEditNote(record.note || '');
  };

  const handleSaveDayStatus = (e) => {
    e.preventDefault();
    if (!activeDateModal) return;

    const isPresent = editStatus === 'present';
    const isWeekend = editStatus === 'weekend';

    updateAttendanceRecord(activeDateModal.id, {
      status: editStatus,
      checkIn: isPresent ? (activeDateModal.checkIn === '-' ? '09:15 AM' : activeDateModal.checkIn) : '-',
      checkOut: isPresent ? (activeDateModal.checkOut === '-' ? '05:45 PM' : activeDateModal.checkOut) : '-',
      workingHours: isPresent ? '8.0 hrs' : '0 hrs',
      note: editNote
    });

    setActiveDateModal(null);
  };

  return (
    <div className="attendance-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <CalendarDays size={14} />
            <span>SIP Academic Attendance</span>
          </div>
          <h1 className="page-title">Attendance Management</h1>
          <p className="page-subtitle">
            Monitor verified working days, maintain daily sign-ins, and ensure compliance with university criteria.
          </p>
        </div>

        {/* Quick Check-in CTA */}
        <button
          className="btn btn-primary"
          onClick={() => markTodayAttendance('present', 'Regularized student daily login')}
        >
          <Check size={16} /> Mark Today's Check-in
        </button>
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
            <span className="att-stat-sub">Excludes Sundays & 2nd/4th Saturdays</span>
          </div>
        </div>

        <div className="it-card att-stat-card">
          <div className="att-stat-icon-wrap icon-green">
            <CheckCircle2 size={22} />
          </div>
          <div className="att-stat-details">
            <span className="att-stat-label">Present Days</span>
            <h2 className="att-stat-value text-success">{attendanceStats.presentDays}</h2>
            <span className="att-stat-sub">Logged & verified by mentor</span>
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
            <h3 className="card-title">October 2026 - Monthly Calendar View</h3>
            <p className="card-subtitle">Click on any date to inspect sign-in logs or update status</p>
          </div>

          <div className="calendar-legend-pills">
            <span className="leg-item"><span className="leg-dot bg-present"></span> Present</span>
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

          {attendance.map((rec) => {
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
                      : rec.status === 'absent'
                      ? 'Absent'
                      : rec.status === 'leave'
                      ? 'Leave'
                      : 'Weekend'}
                  </span>
                </div>

                {rec.status === 'present' && (
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
            <h3 className="card-title">Detailed Attendance Audit Log</h3>
            <p className="card-subtitle">Verified record of working hours and check-in/out timestamps</p>
          </div>
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
              {attendance.slice(0, 15).map((rec) => (
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
                          : rec.status === 'absent'
                          ? 'badge-danger'
                          : rec.status === 'leave'
                          ? 'badge-warning'
                          : 'badge-neutral'
                      }`}
                    >
                      {rec.status}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Day Attendance Modal */}
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
                    <option value="absent">Absent (Unexcused Absence)</option>
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
