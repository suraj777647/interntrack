import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInternTrack } from '../context/AppContext';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  CalendarCheck2,
  FileCheck2,
  ArrowUpRight,
  PlusCircle,
  BookOpen,
  CalendarDays,
  FileSpreadsheet,
  FolderLock,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Building2,
  Award,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './Dashboard.css';

export const Dashboard = () => {
  const { profile, metrics, applications, tasks, diary, attendanceStats, attendance } = useInternTrack();
  const navigate = useNavigate();

  // Weekly hours data for Recharts
  const weeklyAttendanceData = [
    { day: 'Mon (Oct 26)', hours: 8.5, status: 'Present' },
    { day: 'Tue (Oct 27)', hours: 8.0, status: 'Present' },
    { day: 'Wed (Oct 28)', hours: 8.5, status: 'Present' },
    { day: 'Thu (Oct 29)', hours: 8.0, status: 'Present' },
    { day: 'Fri (Oct 30)', hours: 7.5, status: 'Present' },
    { day: 'Today (Oct 31)', hours: 8.0, status: 'Present' }
  ];

  // Pipeline distribution data
  const statusCounts = {
    Selected: applications.filter((a) => a.status === 'Selected').length,
    Shortlisted: applications.filter((a) => a.status === 'Shortlisted').length,
    'Under Review': applications.filter((a) => a.status === 'Under Review').length,
    Pending: applications.filter((a) => a.status === 'Pending').length,
    Rejected: applications.filter((a) => a.status === 'Rejected').length
  };

  const pipelineData = [
    { name: 'Selected', value: statusCounts.Selected, color: '#16a34a' },
    { name: 'Shortlisted', value: statusCounts.Shortlisted, color: '#7c3aed' },
    { name: 'Under Review', value: statusCounts['Under Review'], color: '#2563eb' },
    { name: 'Pending', value: statusCounts.Pending, color: '#f59e0b' },
    { name: 'Rejected', value: statusCounts.Rejected, color: '#dc2626' }
  ].filter((item) => item.value > 0);

  // Recent combined activity feed
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Offer Letter Verified',
      desc: 'CloudScale Technologies internship confirmed for 6 months.',
      time: 'Today',
      type: 'success',
      icon: Award
    },
    {
      id: 'act-2',
      title: 'Task Completed',
      desc: 'Finished "Form Validation on Application Form".',
      time: 'Yesterday',
      type: 'primary',
      icon: CheckCircle2
    },
    {
      id: 'act-3',
      title: 'SIP Diary Logged',
      desc: 'Added entry for Sprint Planning & State Modularization.',
      time: '2 days ago',
      type: 'info',
      icon: BookOpen
    },
    {
      id: 'act-4',
      title: 'Application Shortlisted',
      desc: 'NextGen FinTech Solutions invited you for technical interview.',
      time: '4 days ago',
      type: 'purple',
      icon: Sparkles
    }
  ];

  return (
    <div className="dashboard-container">
      {/* 1. Welcome & Student Profile Summary Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-badge">
            <Sparkles size={14} className="sparkle" />
            <span>B.Tech 7th Sem Summer Internship Program (SIP)</span>
          </div>
          <h1 className="welcome-title">
            Welcome back, <span className="highlight-name">{profile.fullName}</span> 👋
          </h1>
          <p className="welcome-sub">
            Monitor your ongoing internship milestones, manage daily tasks, track college attendance, and maintain your SIP work diary.
          </p>

          <div className="profile-quick-stats">
            <div className="p-stat">
              <span className="p-label">Active Internship</span>
              <span className="p-val">{profile.currentInternship}</span>
            </div>
            <div className="p-stat-divider"></div>
            <div className="p-stat">
              <span className="p-label">Faculty Guide</span>
              <span className="p-val">{profile.mentorName}</span>
            </div>
            <div className="p-stat-divider"></div>
            <div className="p-stat">
              <span className="p-label">Enrollment No.</span>
              <span className="p-val font-mono">{profile.enrollmentNo}</span>
            </div>
          </div>
        </div>

        <div className="welcome-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/internships')}
          >
            <CompassIcon size={16} /> Explore Internships
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/attendance')}
          >
            <CalendarCheck2 size={16} /> Mark Attendance
          </button>
        </div>
      </section>

      {/* 2. Key Metric Statistics Cards */}
      <section className="stats-grid">
        {/* Card 1: Total Applied */}
        <div className="stat-card" onClick={() => navigate('/my-applications')}>
          <div className="stat-icon-wrapper icon-blue">
            <Briefcase size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Total Applications</span>
            <div className="stat-number-row">
              <h2 className="stat-value">{metrics.totalApplications}</h2>
              <span className="stat-trend trend-up">
                <ArrowUpRight size={14} /> Active
              </span>
            </div>
            <p className="stat-meta">
              {metrics.shortlistedApplications} Shortlisted &bull; {metrics.underReviewApplications} Under Review
            </p>
          </div>
        </div>

        {/* Card 2: Active Internships */}
        <div className="stat-card" onClick={() => navigate('/my-applications')}>
          <div className="stat-icon-wrapper icon-green">
            <Building2 size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Confirmed Offers</span>
            <div className="stat-number-row">
              <h2 className="stat-value">{metrics.activeInternships}</h2>
              <span className="stat-badge-success">Selected</span>
            </div>
            <p className="stat-meta">
              {metrics.activeInternships > 0 ? profile.currentInternship : 'Awaiting offer release'}
            </p>
          </div>
        </div>

        {/* Card 3: Tasks Overview */}
        <div className="stat-card" onClick={() => navigate('/tasks')}>
          <div className="stat-icon-wrapper icon-amber">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Task Completion</span>
            <div className="stat-number-row">
              <h2 className="stat-value">{metrics.taskCompletionRate}%</h2>
              <span className="stat-meta-pill">
                {metrics.completedTasks}/{metrics.totalTasks} Done
              </span>
            </div>
            <div className="stat-progress-bar">
              <div
                className="progress-fill fill-amber"
                style={{ width: `${metrics.taskCompletionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4: Attendance Percentage */}
        <div className="stat-card" onClick={() => navigate('/attendance')}>
          <div className="stat-icon-wrapper icon-purple">
            <CalendarDays size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-title">SIP Attendance</span>
            <div className="stat-number-row">
              <h2 className="stat-value">{attendanceStats.percentage}%</h2>
              <span
                className={`stat-badge ${
                  attendanceStats.percentage >= 75 ? 'badge-success' : 'badge-danger'
                }`}
              >
                {attendanceStats.percentage >= 75 ? 'Eligible (>75%)' : 'Shortage'}
              </span>
            </div>
            <p className="stat-meta">
              {attendanceStats.presentDays} of {attendanceStats.totalWorkingDays} working days present
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visual Charts & Analytics Section */}
      <section className="dashboard-visuals-grid">
        {/* Left: Weekly Working Hours Rechart */}
        <div className="it-card chart-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Internship Working Hours (This Week)</h3>
              <p className="card-subtitle">Daily logged hours contributing to SIP evaluation</p>
            </div>
            <span className="badge badge-info">Oct 2026</span>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 10]} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="custom-tooltip">
                          <p className="tooltip-day">{payload[0].payload.day}</p>
                          <p className="tooltip-val">
                            Logged: <strong>{payload[0].value} hours</strong>
                          </p>
                          <span className="badge badge-success">{payload[0].payload.status}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="hours" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-footer-metrics">
            <div className="c-foot-item">
              <span className="label">Average Hours/Day</span>
              <span className="val">8.1 hrs</span>
            </div>
            <div className="c-foot-item">
              <span className="label">Weekly Target</span>
              <span className="val">40.0 hrs</span>
            </div>
            <div className="c-foot-item">
              <span className="label">College Status</span>
              <span className="val text-success">Regularized</span>
            </div>
          </div>
        </div>

        {/* Right: Application Pipeline Distribution */}
        <div className="it-card chart-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Applications Status Pipeline</h3>
              <p className="card-subtitle">Breakdown of submitted applications</p>
            </div>
            <Link to="/my-applications" className="card-link">
              View All &rarr;
            </Link>
          </div>

          <div className="pipeline-flex">
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="pipeline-legend">
              {pipelineData.map((item) => (
                <div key={item.name} className="legend-row">
                  <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-count">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="progress-dossier">
            <div className="dossier-label">
              <span>SIP Readiness Score</span>
              <strong>94%</strong>
            </div>
            <div className="stat-progress-bar">
              <div className="progress-fill fill-blue" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Action Hub & Quick Navigation */}
      <section className="quick-actions-bar">
        <h3 className="section-title">Quick Student Actions</h3>
        <div className="actions-grid">
          <button
            className="action-tile"
            onClick={() => navigate('/apply')}
          >
            <div className="action-tile-icon icon-blue">
              <FileSpreadsheet size={20} />
            </div>
            <div className="action-tile-text">
              <h4>Apply New Internship</h4>
              <p>Submit college application with demo resume</p>
            </div>
            <ChevronRight size={16} className="chevron" />
          </button>

          <button
            className="action-tile"
            onClick={() => navigate('/tasks')}
          >
            <div className="action-tile-icon icon-amber">
              <PlusCircle size={20} />
            </div>
            <div className="action-tile-text">
              <h4>Manage Tasks</h4>
              <p>{metrics.pendingTasks} pending tasks require attention</p>
            </div>
            <ChevronRight size={16} className="chevron" />
          </button>

          <button
            className="action-tile"
            onClick={() => navigate('/internship-diary')}
          >
            <div className="action-tile-icon icon-purple">
              <BookOpen size={20} />
            </div>
            <div className="action-tile-text">
              <h4>Write Daily Diary</h4>
              <p>Log today's work summary & mentor notes</p>
            </div>
            <ChevronRight size={16} className="chevron" />
          </button>

          <button
            className="action-tile"
            onClick={() => navigate('/documents')}
          >
            <div className="action-tile-icon icon-green">
              <FolderLock size={20} />
            </div>
            <div className="action-tile-text">
              <h4>Internship Documents</h4>
              <p>View offer letters, joining reports & PPTs</p>
            </div>
            <ChevronRight size={16} className="chevron" />
          </button>
        </div>
      </section>

      {/* 5. Bottom Split: Priority Tasks & Recent Activity */}
      <section className="dashboard-bottom-grid">
        {/* Urgent Tasks */}
        <div className="it-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Priority Tasks</h3>
              <p className="card-subtitle">Upcoming academic and workplace deliverables</p>
            </div>
            <Link to="/tasks" className="card-link">
              Task Board &rarr;
            </Link>
          </div>

          <div className="task-preview-list">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="task-preview-item">
                <div
                  className={`task-indicator ${
                    task.status === 'Completed' ? 'completed' : task.priority.toLowerCase()
                  }`}
                ></div>
                <div className="task-preview-info">
                  <h5 className={task.status === 'Completed' ? 'line-through' : ''}>
                    {task.title}
                  </h5>
                  <div className="task-preview-meta">
                    <span className="badge badge-neutral">{task.category}</span>
                    <span className="task-due">
                      <Clock size={12} /> Due: {task.dueDate}
                    </span>
                  </div>
                </div>
                <span
                  className={`badge ${
                    task.status === 'Completed' ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="it-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Recent Timeline</h3>
              <p className="card-subtitle">Latest student actions and university verifications</p>
            </div>
            <span className="badge badge-neutral">Live Feed</span>
          </div>

          <div className="activity-timeline">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="timeline-item">
                  <div className={`timeline-icon-box ${act.type}`}>
                    <Icon size={16} />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title-row">
                      <h5>{act.title}</h5>
                      <span className="timeline-time">{act.time}</span>
                    </div>
                    <p>{act.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple compass icon alias for cleaner import
const CompassIcon = ({ size }) => <Building2 size={size} />;

export default Dashboard;

