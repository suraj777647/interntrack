import React, { useState, useMemo } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Printer,
  ChevronDown,
  X,
  Sparkles,
  FileText
} from 'lucide-react';
import './InternshipDiary.css';

export const InternshipDiary = () => {
  const { diary, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry, profile } = useInternTrack();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [expandedEntryId, setExpandedEntryId] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    hoursLogged: 8,
    category: 'Development',
    workDescription: '',
    tasksCompleted: '',
    skillsLearned: '',
    challengesFaced: '',
    learningOutcomes: '',
    mentorNotes: ''
  });

  const [errors, setErrors] = useState({});

  // Search filtered diary entries safely
  const filteredDiary = useMemo(() => {
    const safeDiary = Array.isArray(diary) ? diary : [];
    return safeDiary.filter((entry) => {
      const q = searchTerm.toLowerCase();
      return (
        (entry.title || '').toLowerCase().includes(q) ||
        (entry.workDescription || '').toLowerCase().includes(q) ||
        (entry.date || '').includes(q) ||
        (entry.skillsLearned && entry.skillsLearned.toLowerCase().includes(q))
      );
    });
  }, [diary, searchTerm]);

  const handleOpenAddModal = () => {
    setEditingEntry(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      hoursLogged: 8,
      category: 'Development',
      workDescription: '',
      tasksCompleted: '',
      skillsLearned: '',
      challengesFaced: '',
      learningOutcomes: '',
      mentorNotes: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (entry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      title: entry.title,
      hoursLogged: entry.hoursLogged || 8,
      category: entry.category || 'Development',
      workDescription: entry.workDescription,
      tasksCompleted: Array.isArray(entry.tasksCompleted)
        ? entry.tasksCompleted.join('\n')
        : entry.tasksCompleted || '',
      skillsLearned: entry.skillsLearned || '',
      challengesFaced: entry.challengesFaced || '',
      learningOutcomes: entry.learningOutcomes || '',
      mentorNotes: entry.mentorNotes || ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!formData.date) errs.date = 'Date is required.';
    if (!formData.title.trim()) errs.title = 'Entry title is required.';
    if (!formData.workDescription.trim()) errs.workDescription = 'Work description is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (editingEntry) {
      updateDiaryEntry(editingEntry.id, formData);
    } else {
      addDiaryEntry(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this diary entry?')) {
      deleteDiaryEntry(id);
    }
  };

  const toggleExpand = (id) => {
    setExpandedEntryId((prev) => (prev === id ? null : id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="diary-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <BookOpen size={14} />
            <span>Daily Activity Log</span>
          </div>
          <h1 className="page-title">Internship Work Diary</h1>
          <p className="page-subtitle">
            Document daily technical contributions, skills acquired, and challenges resolved for SIP evaluation.
          </p>
        </div>

        <div className="header-actions-group">
          <button className="btn btn-outline" onClick={() => setIsPrintModalOpen(true)}>
            <Printer size={15} /> Export SIP Dossier
          </button>
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} /> New Diary Entry
          </button>
        </div>
      </div>

      {/* Search and Summary */}
      <div className="it-card diary-filter-card">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search diary logs by keyword, skill, date, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>
        <div className="diary-count-pill">
          <span>{filteredDiary.length} Entries Logged</span>
        </div>
      </div>

      {/* Diary Entries List */}
      {filteredDiary.length === 0 ? (
        <div className="it-card empty-state-card">
          <BookOpen size={48} className="empty-icon" />
          <h3>No diary entries found</h3>
          <p>
            {searchTerm
              ? 'Try adjusting your search terms.'
              : 'Start logging your daily SIP internship work activities.'}
          </p>
          <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
            <Plus size={14} /> Add First Entry
          </button>
        </div>
      ) : (
        <div className="diary-list">
          {filteredDiary.map((entry) => {
            const isExpanded = expandedEntryId === entry.id;

            return (
              <div key={entry.id} className="it-card diary-entry-card">
                <div className="entry-header" onClick={() => toggleExpand(entry.id)}>
                  <div className="entry-title-wrap">
                    <div className="entry-date-badge">
                      <Calendar size={13} />
                      <span>{entry.date}</span>
                    </div>
                    <div>
                      <h3 className="entry-heading">{entry.title}</h3>
                      <div className="entry-meta-row">
                        <span className="badge badge-neutral">{entry.category || 'Development'}</span>
                        <span className="hours-logged">
                          <Clock size={12} /> {entry.hoursLogged || 8} hrs logged
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="entry-header-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="icon-btn-subtle"
                      title="Edit Entry"
                      onClick={() => handleOpenEditModal(entry)}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      className="icon-btn-subtle delete"
                      title="Delete Entry"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                    <button
                      className={`expand-toggle-btn ${isExpanded ? 'open' : ''}`}
                      onClick={() => toggleExpand(entry.id)}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                </div>

                {/* Always visible brief description */}
                <p className="entry-work-brief">{entry.workDescription}</p>

                {/* Expandable full details */}
                {isExpanded && (
                  <div className="entry-expanded-content">
                    {/* Tasks Completed */}
                    {entry.tasksCompleted && (
                      <div className="detail-block">
                        <div className="block-label">
                          <CheckCircle2 size={14} color="#16a34a" />
                          <span>Tasks & Milestones Completed:</span>
                        </div>
                        {Array.isArray(entry.tasksCompleted) ? (
                          <ul className="bullet-list-sm">
                            {entry.tasksCompleted.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="block-text">{entry.tasksCompleted}</p>
                        )}
                      </div>
                    )}

                    {/* Skills Learned */}
                    {entry.skillsLearned && (
                      <div className="detail-block">
                        <div className="block-label">
                          <Lightbulb size={14} color="#f59e0b" />
                          <span>Technical Skills & Concepts Learned:</span>
                        </div>
                        <p className="block-text">{entry.skillsLearned}</p>
                      </div>
                    )}

                    {/* Challenges Faced */}
                    {entry.challengesFaced && (
                      <div className="detail-block">
                        <div className="block-label">
                          <AlertTriangle size={14} color="#dc2626" />
                          <span>Challenges & Debugging Obstacles Faced:</span>
                        </div>
                        <p className="block-text">{entry.challengesFaced}</p>
                      </div>
                    )}

                    {/* Learning Outcomes */}
                    {entry.learningOutcomes && (
                      <div className="detail-block">
                        <div className="block-label">
                          <Sparkles size={14} color="#2563eb" />
                          <span>Key Learning Outcomes:</span>
                        </div>
                        <p className="block-text">{entry.learningOutcomes}</p>
                      </div>
                    )}

                    {/* Mentor Feedback */}
                    {entry.mentorNotes && (
                      <div className="mentor-feedback-box">
                        <strong>Mentor / Supervisor Feedback:</strong>
                        <p>{entry.mentorNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Entry Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content diary-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingEntry ? 'Edit Diary Record' : 'Record Daily Internship Diary'}</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>
                      Entry Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${errors.date ? 'error' : ''}`}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    {errors.date && <span className="form-error-msg">{errors.date}</span>}
                  </div>

                  <div className="form-group">
                    <label>Hours Logged</label>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      step="0.5"
                      className="form-control"
                      value={formData.hoursLogged}
                      onChange={(e) => setFormData({ ...formData, hoursLogged: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Work Summary / Sprint Focus <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'error' : ''}`}
                    placeholder="e.g. Sprint Planning & Component State Modularization"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  {errors.title && <span className="form-error-msg">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label>
                    Detailed Work Description <span className="required">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={`form-control ${errors.workDescription ? 'error' : ''}`}
                    placeholder="Describe what you worked on today, meetings attended, features built..."
                    value={formData.workDescription}
                    onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                  />
                  {errors.workDescription && (
                    <span className="form-error-msg">{errors.workDescription}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Tasks Completed (One per line)</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    placeholder="Built responsive navigation drawer&#10;Tested LocalStorage data persistence"
                    value={formData.tasksCompleted}
                    onChange={(e) => setFormData({ ...formData, tasksCompleted: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Skills / Concepts Learned</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. React Context, LocalStorage serialization"
                      value={formData.skillsLearned}
                      onChange={(e) => setFormData({ ...formData, skillsLearned: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Challenges & Roadblocks Faced</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Viewport breakpoint styling conflicts"
                      value={formData.challengesFaced}
                      onChange={(e) => setFormData({ ...formData, challengesFaced: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Daily Learning Outcomes & Mentor Feedback</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Notes from supervisor or daily takeaway"
                    value={formData.learningOutcomes}
                    onChange={(e) => setFormData({ ...formData, learningOutcomes: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEntry ? 'Update Diary' : 'Save Diary Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export / Print SIP Dossier Modal */}
      {isPrintModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPrintModalOpen(false)}>
          <div
            className="modal-content print-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>SIP Academic Work Diary Report</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsPrintModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body printable-area">
              <div className="academic-report-header">
                <h2>{(profile?.collegeName || 'ACADEMIC INSTITUTION').toUpperCase()}</h2>
                <h4>DEPARTMENT OF {(profile?.branch || 'ENGINEERING').toUpperCase()}</h4>
                <p className="report-sub">
                  B.Tech 7th Semester &bull; Summer Internship Program (SIP) Work Diary Dossier
                </p>

                <div className="report-meta-box">
                  <div className="r-item">
                    <span>Student Name:</span> <strong>{profile.fullName}</strong>
                  </div>
                  <div className="r-item">
                    <span>Enrollment No:</span> <strong>{profile.enrollmentNo}</strong>
                  </div>
                  <div className="r-item">
                    <span>Degree & Branch:</span>{' '}
                    <strong>
                      {profile.degree} - {profile.branch}
                    </strong>
                  </div>
                  <div className="r-item">
                    <span>Host Organization:</span>{' '}
                    <strong>{profile.currentInternship}</strong>
                  </div>
                  <div className="r-item">
                    <span>Faculty Guide:</span> <strong>{profile.mentorName}</strong>
                  </div>
                  <div className="r-item">
                    <span>Total Logs:</span> <strong>{diary.length} Working Days</strong>
                  </div>
                </div>
              </div>

              <div className="report-entries-table">
                {diary.map((e, idx) => (
                  <div key={e.id} className="report-entry-item">
                    <div className="r-entry-head">
                      <strong>Day #{diary.length - idx}: {e.date}</strong> &mdash; <span>{e.title}</span> ({e.hoursLogged || 8} hrs)
                    </div>
                    <p className="r-entry-desc">{e.workDescription}</p>
                    {e.skillsLearned && (
                      <p className="r-entry-skills">
                        <strong>Concepts Learned:</strong> {e.skillsLearned}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="signatures-row">
                <div className="sig-block">
                  <div className="sig-line"></div>
                  <span>Student's Signature</span>
                </div>
                <div className="sig-block">
                  <div className="sig-line"></div>
                  <span>Industry Mentor Signature</span>
                </div>
                <div className="sig-block">
                  <div className="sig-line"></div>
                  <span>Faculty Coordinator Signature</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setIsPrintModalOpen(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handlePrint}>
                <Printer size={15} /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipDiary;

