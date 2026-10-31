import React, { useState } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Building,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  Edit2,
  Save,
  X,
  Plus,
  Github,
  Linkedin,
  Globe,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import './Profile.css';

export const Profile = () => {
  const { profile, updateProfile, clearAllDataToFresh, logoutUser, metrics } = useInternTrack();
  const safeProfile = profile || {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...safeProfile });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  // Calculate profile completion
  const profileFields = [
    safeProfile.fullName,
    safeProfile.email,
    safeProfile.phone,
    safeProfile.collegeName,
    safeProfile.universityName,
    safeProfile.enrollmentNo,
    safeProfile.degree,
    safeProfile.branch,
    safeProfile.semester,
    safeProfile.skills?.length > 0,
    safeProfile.bio,
    safeProfile.currentInternship,
    safeProfile.mentorName
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const completionScore = Math.round((completedFields / profileFields.length) * 100);

  const handleOpenEdit = () => {
    setFormData({ ...profile });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      const updated = [...(formData.skills || []), newSkill.trim()];
      setFormData({ ...formData, skills: updated });
      if (!isEditing) {
        updateProfile({ skills: updated });
      }
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = (formData.skills || []).filter((s) => s !== skillToRemove);
    setFormData({ ...formData, skills: updated });
    if (!isEditing) {
      updateProfile({ skills: updated });
    }
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() && !formData.careerInterests?.includes(newInterest.trim())) {
      const updated = [...(formData.careerInterests || []), newInterest.trim()];
      setFormData({ ...formData, careerInterests: updated });
      if (!isEditing) {
        updateProfile({ careerInterests: updated });
      }
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (itemToRemove) => {
    const updated = (formData.careerInterests || []).filter((i) => i !== itemToRemove);
    setFormData({ ...formData, careerInterests: updated });
    if (!isEditing) {
      updateProfile({ careerInterests: updated });
    }
  };

  return (
    <div className="profile-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <User size={14} />
            <span>Academic Identity</span>
          </div>
          <h1 className="page-title">Student Profile</h1>
          <p className="page-subtitle">
            Manage your personal, academic, and industrial internship credentials.
          </p>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleOpenEdit}>
            <Edit2 size={15} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Overview Banner Card */}
      <div className="it-card profile-hero-card">
        <div className="profile-hero-left">
          <div className="avatar-wrapper">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="large-avatar"
            />
            <span className="avatar-verified-badge" title="Identity Verified">
              <ShieldCheck size={16} />
            </span>
          </div>

          <div className="profile-hero-info">
            <div className="name-roll-row">
              <h2>{profile.fullName}</h2>
              <span className="badge badge-purple">{profile.enrollmentNo}</span>
            </div>
            <p className="program-title">
              {profile.degree} in {profile.branch} &bull; {profile.semester}
            </p>
            <p className="institution-title">
              <Building size={14} /> {profile.collegeName}
            </p>

            <div className="host-internship-pill">
              <span className="pill-dot"></span>
              <span><strong>Current Role:</strong> {profile.currentInternship}</span>
            </div>
          </div>
        </div>

        {/* Profile Strength Widget */}
        <div className="profile-strength-box">
          <div className="strength-header">
            <Sparkles size={16} className="sparkle" />
            <span>Profile Completeness</span>
          </div>
          <div className="strength-score-row">
            <h2>{completionScore}%</h2>
            <span className="badge badge-success">SIP Ready</span>
          </div>
          <div className="stat-progress-bar">
            <div
              className="progress-fill fill-blue"
              style={{ width: `${completionScore}%` }}
            ></div>
          </div>
          <p className="strength-note">
            All primary SIP submission requirements are satisfied for faculty review.
          </p>
        </div>
      </div>

      {/* Main Grid: Details & Skills */}
      <div className="profile-grid">
        {/* Left: Academic & Contact Details */}
        <div className="it-card">
          <div className="card-header-row">
            <h3 className="card-title">Academic & Contact Information</h3>
            <span className="badge badge-neutral">Official Record</span>
          </div>

          <div className="info-fields-list">
            <div className="info-field-row">
              <span className="field-label">
                <Mail size={14} /> Email Address
              </span>
              <span className="field-value font-mono">{profile.email}</span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <Phone size={14} /> Contact Phone
              </span>
              <span className="field-value">{profile.phone}</span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <Building size={14} /> University Affiliation
              </span>
              <span className="field-value">{profile.universityName}</span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <GraduationCap size={14} /> Degree & Branch
              </span>
              <span className="field-value">
                {profile.degree} - {profile.branch}
              </span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <Calendar size={14} /> Graduation Year
              </span>
              <span className="field-value">
                Class of {profile.graduationYear} ({profile.academicYear})
              </span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <Award size={14} /> Cumulative CGPA
              </span>
              <span className="field-value text-success font-bold">
                {profile.cgpa}
              </span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <User size={14} /> Faculty Guide / Mentor
              </span>
              <span className="field-value">{profile.mentorName}</span>
            </div>

            <div className="info-field-row">
              <span className="field-label">
                <Award size={14} /> Industry Supervisor
              </span>
              <span className="field-value">{profile.industryMentor}</span>
            </div>
          </div>
        </div>

        {/* Right: Skills, Interests & Bio */}
        <div className="profile-right-stack">
          {/* Bio statement */}
          <div className="it-card">
            <h3 className="card-title">Student Statement / Bio</h3>
            <p className="bio-paragraph">{profile.bio}</p>
          </div>

          {/* Technical Skills */}
          <div className="it-card">
            <div className="card-header-row">
              <h3 className="card-title">Technical Competencies</h3>
              <span className="badge badge-info">{formData.skills?.length || 0} skills</span>
            </div>

            <div className="tags-container">
              {(formData.skills || []).map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                  <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <form className="add-tag-form" onSubmit={handleAddSkill}>
              <input
                type="text"
                placeholder="Add skill (e.g. Next.js, Redux, Docker)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                <Plus size={14} /> Add
              </button>
            </form>
          </div>

          {/* Career Interests */}
          <div className="it-card">
            <div className="card-header-row">
              <h3 className="card-title">Career Focus Areas</h3>
              <span className="badge badge-purple">{formData.careerInterests?.length || 0} tracks</span>
            </div>

            <div className="tags-container">
              {(formData.careerInterests || []).map((interest) => (
                <span key={interest} className="interest-tag">
                  {interest}
                  <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <form className="add-tag-form" onSubmit={handleAddInterest}>
              <input
                type="text"
                placeholder="Add career goal (e.g. AI Systems)..."
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                <Plus size={14} /> Add
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="it-card">
            <h3 className="card-title">Professional Links</h3>
            <div className="social-links-grid">
              <a
                href={profile.socialLinks?.github || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <Github size={16} /> GitHub Profile
              </a>
              <a
                href={profile.socialLinks?.linkedin || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={profile.socialLinks?.portfolio || '#'}
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <Globe size={16} /> Portfolio Website
              </a>
            </div>
          </div>

          {/* Workspace Data Management */}
          <div className="it-card reset-evaluator-card">
            <div className="eval-reset-header">
              <RotateCcw size={16} className="eval-icon" />
              <h4>Personal Workspace Management</h4>
            </div>
            <p>
              Reset your personal applications, tasks, attendance, and diary entries to a clean empty state whenever needed.
            </p>
            <div className="reset-buttons-grid">
              <button
                type="button"
                className="btn btn-outline btn-sm reset-demo-btn text-danger"
                onClick={() => {
                  if (window.confirm('Reset your tasks, attendance, and applications to clean empty state?')) {
                    clearAllDataToFresh();
                  }
                }}
              >
                <Trash2 size={13} /> Reset My Workspace (Start Fresh)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content profile-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Student Profile Details</h3>
              <button className="modal-close-btn" onClick={() => setIsEditing(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Name <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Contact Phone <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Enrollment / Roll No <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.enrollmentNo}
                      onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>College / Institute Name <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>University</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.universityName}
                      onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Branch / Specialization</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Semester</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Graduation Year</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.graduationYear || ''}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      placeholder="e.g. 2026"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>CGPA</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.cgpa}
                      onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Active Internship Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.currentInternship}
                      onChange={(e) => setFormData({ ...formData, currentInternship: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Faculty Guide / Mentor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.mentorName}
                      onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Industry Lead</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.industryMentor}
                      onChange={(e) => setFormData({ ...formData, industryMentor: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Profile Avatar / Photo URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://images.unsplash.com/... or DiceBear URL"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Professional Bio / Statement</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} /> Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

