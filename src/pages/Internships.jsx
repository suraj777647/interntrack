import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInternTrack } from '../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  IndianRupee,
  Briefcase,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  X,
  Building,
  Check,
  Plus
} from 'lucide-react';
import './Internships.css';

export const Internships = () => {
  const { internships, applications, addInternship } = useInternTrack();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Search & Filter States
  const urlSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  // Modal State for viewing details
  const [activeModalInternship, setActiveModalInternship] = useState(null);

  // Modal State for adding custom internship
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newInternshipForm, setNewInternshipForm] = useState({
    title: '',
    company: '',
    category: 'Web Development',
    workMode: 'Remote',
    location: 'India',
    duration: '3 Months',
    stipend: '₹20,000 / month',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: '',
    requirements: '',
    responsibilities: '',
    perks: ''
  });
  const [addErrors, setAddErrors] = useState({});

  // List of applied internship IDs
  const appliedInternshipIds = useMemo(() => {
    const safeApps = Array.isArray(applications) ? applications : [];
    return safeApps.map((a) => a.internshipId);
  }, [applications]);

  // Categories list
  const categories = [
    'All',
    'Web Development',
    'AI / ML',
    'UI / UX Design',
    'Cloud & DevOps',
    'Mobile Development',
    'Cyber Security',
    'Data Science'
  ];
  const workModes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const durations = ['All', '2 Months', '3 Months', '4 Months', '6 Months'];

  // Filtered internships
  const filteredInternships = useMemo(() => {
    const safeInts = Array.isArray(internships) ? internships : [];
    return safeInts.filter((item) => {
      const matchesSearch =
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.requirements && Array.isArray(item.requirements) && item.requirements.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesMode =
        selectedMode === 'All' || (item.workMode || '').toLowerCase() === selectedMode.toLowerCase();

      const matchesDuration =
        selectedDuration === 'All' || item.duration === selectedDuration;

      return matchesSearch && matchesCategory && matchesMode && matchesDuration;
    });
  }, [internships, searchTerm, selectedCategory, selectedMode, selectedDuration]);

  const handleApplyClick = (internshipId) => {
    navigate(`/apply?internshipId=${internshipId}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedMode('All');
    setSelectedDuration('All');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!newInternshipForm.title.trim()) errs.title = 'Job title is required.';
    if (!newInternshipForm.company.trim()) errs.company = 'Company name is required.';
    if (!newInternshipForm.description.trim()) errs.description = 'Job overview is required.';

    if (Object.keys(errs).length > 0) {
      setAddErrors(errs);
      return;
    }

    addInternship(newInternshipForm);
    setIsAddModalOpen(false);
    setNewInternshipForm({
      title: '',
      company: '',
      category: 'Web Development',
      workMode: 'Remote',
      location: 'India',
      duration: '3 Months',
      stipend: '₹20,000 / month',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: '',
      requirements: '',
      responsibilities: '',
      perks: ''
    });
    setAddErrors({});
  };

  return (
    <div className="internships-page">
      {/* Header Banner */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <Briefcase size={14} />
            <span>Opportunities & Off-Campus Drives</span>
          </div>
          <h1 className="page-title">Internship Opportunities</h1>
          <p className="page-subtitle">
            Explore verified opportunities or log custom off-campus company openings for your SIP program.
          </p>
        </div>

        <div className="header-actions-group">
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add Internship Listing
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="it-card filter-card">
        <div className="search-filter-row">
          <div className="search-input-box">
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              placeholder="Search by role, company name, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                &times;
              </button>
            )}
          </div>

          <div className="filter-selects-group">
            <div className="select-wrapper">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <label>Work Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
              >
                {workModes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <label>Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedCategory !== 'All' || selectedMode !== 'All' || selectedDuration !== 'All') && (
              <button className="btn btn-secondary btn-sm reset-btn" onClick={resetFilters}>
                <X size={14} /> Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Internship Cards Grid */}
      {filteredInternships.length === 0 ? (
        <div className="it-card empty-state-card">
          <Briefcase size={48} className="empty-icon" />
          <h3>No matching internships found</h3>
          <p>You can adjust your search filters or add a new internship listing manually.</p>
          <div className="empty-actions-row">
            <button className="btn btn-outline" onClick={resetFilters}>
              Reset Filters
            </button>
            <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={15} /> Add Custom Internship
            </button>
          </div>
        </div>
      ) : (
        <div className="internship-cards-grid">
          {filteredInternships.map((internship) => {
            const hasApplied = appliedInternshipIds.includes(internship.id);

            return (
              <div key={internship.id} className="internship-card">
                {/* Top: Logo & Mode */}
                <div className="card-top-row">
                  <div
                    className="company-logo-avatar"
                    style={{ backgroundColor: internship.logoColor || '#2563eb' }}
                  >
                    {internship.logoText || 'CO'}
                  </div>
                  <div className="top-badges">
                    <span
                      className={`badge ${
                        internship.workMode === 'Remote'
                          ? 'badge-success'
                          : internship.workMode === 'Hybrid'
                          ? 'badge-purple'
                          : 'badge-info'
                      }`}
                    >
                      {internship.workMode}
                    </span>
                    {internship.isSample && (
                      <span className="badge badge-gray" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
                        Sample Opportunity
                      </span>
                    )}
                    {hasApplied && (
                      <span className="badge badge-warning">
                        <Check size={12} /> Applied
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Company */}
                <div className="card-heading-section">
                  <h3 className="internship-role-title">{internship.title}</h3>
                  <div className="company-location-row">
                    <span className="company-name">{internship.company}</span>
                    <span className="dot-sep">&bull;</span>
                    <span className="location-text">
                      <MapPin size={13} /> {internship.location}
                    </span>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="job-desc-snippet">{internship.description}</p>

                {/* Metadata Pills */}
                <div className="meta-tags-list">
                  <span className="meta-pill">
                    <IndianRupee size={13} /> {internship.stipend}
                  </span>
                  <span className="meta-pill">
                    <Clock size={13} /> {internship.duration}
                  </span>
                  <span className="meta-pill">
                    <Layers size={13} /> {internship.category}
                  </span>
                </div>

                {/* Card Footer: Deadline & Action */}
                <div className="card-action-footer">
                  <div className="deadline-col">
                    <span className="deadline-label">Deadline</span>
                    <span className="deadline-val">
                      <Calendar size={13} /> {internship.deadline}
                    </span>
                  </div>

                  <div className="action-buttons-group">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setActiveModalInternship(internship)}
                    >
                      Details
                    </button>
                    <button
                      className={`btn btn-sm ${hasApplied ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => handleApplyClick(internship.id)}
                    >
                      {hasApplied ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Add Custom Internship */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Post / Log Internship Opportunity</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>
                      Job / Internship Role <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${addErrors.title ? 'error' : ''}`}
                      placeholder="e.g. Backend Node.js Intern"
                      value={newInternshipForm.title}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, title: e.target.value })
                      }
                    />
                    {addErrors.title && <span className="form-error-msg">{addErrors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      Company / Organization Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${addErrors.company ? 'error' : ''}`}
                      placeholder="e.g. Infosys / Startup"
                      value={newInternshipForm.company}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, company: e.target.value })
                      }
                    />
                    {addErrors.company && <span className="form-error-msg">{addErrors.company}</span>}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Role Category</label>
                    <select
                      className="form-control"
                      value={newInternshipForm.category}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, category: e.target.value })
                      }
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Work Mode</label>
                    <select
                      className="form-control"
                      value={newInternshipForm.workMode}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, workMode: e.target.value })
                      }
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Stipend (Monthly)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. ₹20,000 / month or Unpaid"
                      value={newInternshipForm.stipend}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, stipend: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Internship Duration</label>
                    <select
                      className="form-control"
                      value={newInternshipForm.duration}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, duration: e.target.value })
                      }
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="4 Months">4 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Location / Office Base</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Bangalore / Remote"
                      value={newInternshipForm.location}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Application Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newInternshipForm.deadline}
                      onChange={(e) =>
                        setNewInternshipForm({ ...newInternshipForm, deadline: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Role Overview & Description <span className="required">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={`form-control ${addErrors.description ? 'error' : ''}`}
                    placeholder="Brief description of the internship and day-to-day responsibilities..."
                    value={newInternshipForm.description}
                    onChange={(e) =>
                      setNewInternshipForm({ ...newInternshipForm, description: e.target.value })
                    }
                  />
                  {addErrors.description && (
                    <span className="form-error-msg">{addErrors.description}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Required Skills (Comma separated or per line)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, Node.js, Git, SQL, Problem Solving"
                    value={newInternshipForm.requirements}
                    onChange={(e) =>
                      setNewInternshipForm({ ...newInternshipForm, requirements: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Post Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: View Details */}
      {activeModalInternship && (
        <div className="modal-overlay" onClick={() => setActiveModalInternship(null)}>
          <div
            className="modal-content internship-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-box">
                <div
                  className="company-logo-avatar"
                  style={{ backgroundColor: activeModalInternship.logoColor || '#2563eb' }}
                >
                  {activeModalInternship.logoText || 'CO'}
                </div>
                <div>
                  <h3>{activeModalInternship.title}</h3>
                  <p className="modal-company-sub">
                    {activeModalInternship.company} &bull; {activeModalInternship.location}
                  </p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setActiveModalInternship(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-chips-row">
                <span className="badge badge-success">
                  <IndianRupee size={13} /> {activeModalInternship.stipend}
                </span>
                <span className="badge badge-info">
                  <Clock size={13} /> {activeModalInternship.duration}
                </span>
                <span className="badge badge-purple">
                  {activeModalInternship.workMode}
                </span>
                <span className="badge badge-neutral">
                  Category: {activeModalInternship.category}
                </span>
              </div>

              <div className="detail-section">
                <h4>Role Overview</h4>
                <p>{activeModalInternship.description}</p>
              </div>

              {activeModalInternship.responsibilities && (
                <div className="detail-section">
                  <h4>Key Responsibilities</h4>
                  <ul className="bullet-list">
                    {Array.isArray(activeModalInternship.responsibilities) ? (
                      activeModalInternship.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))
                    ) : (
                      <li>{activeModalInternship.responsibilities}</li>
                    )}
                  </ul>
                </div>
              )}

              {activeModalInternship.requirements && (
                <div className="detail-section">
                  <h4>Required Skills & Eligibility</h4>
                  <ul className="bullet-list">
                    {Array.isArray(activeModalInternship.requirements) ? (
                      activeModalInternship.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))
                    ) : (
                      <li>{activeModalInternship.requirements}</li>
                    )}
                  </ul>
                </div>
              )}

              {activeModalInternship.perks && (
                <div className="detail-section">
                  <h4>Benefits & Highlights</h4>
                  <ul className="bullet-list perks">
                    {Array.isArray(activeModalInternship.perks) ? (
                      activeModalInternship.perks.map((perk, i) => (
                        <li key={i}>
                          <CheckCircle2 size={15} className="check-icon" />
                          <span>{perk}</span>
                        </li>
                      ))
                    ) : (
                      <li>
                        <CheckCircle2 size={15} className="check-icon" />
                        <span>{activeModalInternship.perks}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setActiveModalInternship(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const id = activeModalInternship.id;
                  setActiveModalInternship(null);
                  handleApplyClick(id);
                }}
              >
                Proceed to Apply &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
