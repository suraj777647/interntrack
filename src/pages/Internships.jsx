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
  Check
} from 'lucide-react';
import './Internships.css';

export const Internships = () => {
  const { internships, applications } = useInternTrack();
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

  // List of applied internship IDs
  const appliedInternshipIds = useMemo(() => {
    return applications.map((a) => a.internshipId);
  }, [applications]);

  // Categories list
  const categories = ['All', 'Web Development', 'AI / ML', 'UI / UX Design', 'Cloud & DevOps', 'Mobile Development', 'Cyber Security', 'Data Science'];
  const workModes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const durations = ['All', '2 Months', '3 Months', '4 Months', '6 Months'];

  // Filtered internships
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requirements.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesMode =
        selectedMode === 'All' || item.workMode.toLowerCase() === selectedMode.toLowerCase();

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

  return (
    <div className="internships-page">
      {/* Header Banner */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <Sparkles size={14} />
            <span>Opportunities Hub</span>
          </div>
          <h1 className="page-title">Explore Internship Opportunities</h1>
          <p className="page-subtitle">
            Curated summer internship openings verified for 7th Semester B.Tech evaluation.
          </p>
        </div>
        <div className="header-stats">
          <span className="openings-count">
            <strong>{filteredInternships.length}</strong> Opportunities Available
          </span>
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
          <p>Try adjusting your search terms or clearing your active filters.</p>
          <button className="btn btn-primary" onClick={resetFilters}>
            Reset All Filters
          </button>
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
                    {internship.logoText}
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

                {/* Key Metadata Pill Badges */}
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
                      {hasApplied ? 'Apply Again' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Internship Details Modal */}
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
                  {activeModalInternship.logoText}
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
              {/* Highlight Badges */}
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

              {/* Role Overview */}
              <div className="detail-section">
                <h4>Role Overview</h4>
                <p>{activeModalInternship.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="detail-section">
                <h4>Key Responsibilities</h4>
                <ul className="bullet-list">
                  {activeModalInternship.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements & Skills */}
              <div className="detail-section">
                <h4>Eligibility & Required Skills</h4>
                <ul className="bullet-list">
                  {activeModalInternship.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Perks */}
              <div className="detail-section">
                <h4>Internship Benefits & Perks</h4>
                <ul className="bullet-list perks">
                  {activeModalInternship.perks.map((perk, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} className="check-icon" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
