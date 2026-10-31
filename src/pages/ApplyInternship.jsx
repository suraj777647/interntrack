import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInternTrack } from '../context/AppContext';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './ApplyInternship.css';

export const ApplyInternship = () => {
  const { profile, internships, addApplication } = useInternTrack();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedParamId = searchParams.get('internshipId') || '';

  // Form State
  const [formData, setFormData] = useState({
    internshipId: selectedParamId,
    candidateName: profile.fullName || '',
    candidateEmail: profile.email || '',
    candidatePhone: profile.phone || '',
    college: profile.collegeName || '',
    course: `${profile.degree} - ${profile.branch} (${profile.semester})`,
    skills: profile.skills ? profile.skills.join(', ') : '',
    resumeFileName: 'Resume_Aarav_Sharma_v3.pdf',
    resumeSize: '1.2 MB',
    coverLetter: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  // Sync param if changed
  useEffect(() => {
    if (selectedParamId) {
      setFormData((prev) => ({ ...prev, internshipId: selectedParamId }));
    }
  }, [selectedParamId]);

  // Selected internship details
  const selectedInternship = internships.find((i) => i.id === formData.internshipId);

  const validateField = (name, value) => {
    let err = '';
    switch (name) {
      case 'internshipId':
        if (!value) err = 'Please select an internship opportunity.';
        break;
      case 'candidateName':
        if (!value.trim()) err = 'Candidate full name is required.';
        else if (value.trim().length < 3) err = 'Name must be at least 3 characters.';
        break;
      case 'candidateEmail':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) err = 'Email address is required.';
        else if (!emailRegex.test(value.trim())) err = 'Please enter a valid email address.';
        break;
      case 'candidatePhone':
        const cleanPhone = value.replace(/[^0-9]/g, '');
        if (!value.trim()) err = 'Contact phone number is required.';
        else if (cleanPhone.length < 10) err = 'Phone number must contain at least 10 digits.';
        break;
      case 'college':
        if (!value.trim()) err = 'College / Institution name is required.';
        break;
      case 'course':
        if (!value.trim()) err = 'Degree course and branch are required.';
        break;
      case 'skills':
        if (!value.trim()) err = 'Key technical skills are required.';
        break;
      case 'coverLetter':
        if (!value.trim()) err = 'Please provide a brief cover letter or statement of purpose.';
        else if (value.trim().length < 20) err = 'Cover letter should be at least 20 characters.';
        break;
      default:
        break;
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Instant clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleResumeFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeSize: `${sizeMb} MB`
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const targetInt = selectedInternship || {
        title: 'Software Developer Intern',
        company: 'Demo Tech Partner',
        stipend: '₹20,000 / month',
        workMode: 'Remote',
        location: 'India'
      };

      const newApp = addApplication({
        internshipId: formData.internshipId,
        title: targetInt.title,
        company: targetInt.company,
        stipend: targetInt.stipend,
        workMode: targetInt.workMode,
        location: targetInt.location,
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone,
        college: formData.college,
        course: formData.course,
        skills: formData.skills,
        resumeFileName: formData.resumeFileName,
        coverLetter: formData.coverLetter
      });

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // silent fallback
      }

      setSubmittedApp(newApp);
    }, 600);
  };

  return (
    <div className="apply-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <FileSpreadsheet size={14} />
            <span>SIP Application Portal</span>
          </div>
          <h1 className="page-title">Submit Internship Application</h1>
          <p className="page-subtitle">
            Complete the form below to apply for your preferred summer internship role.
          </p>
        </div>
      </div>

      <div className="apply-layout-grid">
        {/* Left: Application Form */}
        <div className="it-card form-card">
          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: Target Internship Selection */}
            <div className="form-section-title">
              <span className="step-num">1</span>
              <div>
                <h3>Target Internship Position</h3>
                <p>Select which verified internship you wish to apply for</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="internshipId">
                Select Opportunity <span className="required">*</span>
              </label>
              <select
                id="internshipId"
                name="internshipId"
                className={`form-control ${errors.internshipId ? 'error' : ''}`}
                value={formData.internshipId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">-- Choose an Internship Position --</option>
                {internships.map((int) => (
                  <option key={int.id} value={int.id}>
                    {int.title} @ {int.company} ({int.workMode} &bull; {int.stipend})
                  </option>
                ))}
              </select>
              {errors.internshipId && (
                <span className="form-error-msg">{errors.internshipId}</span>
              )}
            </div>

            {/* Selected Internship Live Preview Pill */}
            {selectedInternship && (
              <div className="selected-preview-box">
                <div
                  className="preview-logo"
                  style={{ backgroundColor: selectedInternship.logoColor || '#2563eb' }}
                >
                  {selectedInternship.logoText}
                </div>
                <div className="preview-info">
                  <h4>{selectedInternship.title}</h4>
                  <p>
                    {selectedInternship.company} &bull; {selectedInternship.location} &bull;{' '}
                    <strong>{selectedInternship.stipend}</strong>
                  </p>
                </div>
                <span className="badge badge-success">{selectedInternship.workMode}</span>
              </div>
            )}

            {/* Step 2: Student Academic Information */}
            <div className="form-section-title">
              <span className="step-num">2</span>
              <div>
                <h3>Student & Academic Credentials</h3>
                <p>Pre-populated from your student profile record</p>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="candidateName">
                  <User size={14} /> Full Student Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="candidateName"
                  name="candidateName"
                  className={`form-control ${errors.candidateName ? 'error' : ''}`}
                  value={formData.candidateName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Aarav Sharma"
                />
                {errors.candidateName && (
                  <span className="form-error-msg">{errors.candidateName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="candidateEmail">
                  <Mail size={14} /> Student Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="candidateEmail"
                  name="candidateEmail"
                  className={`form-control ${errors.candidateEmail ? 'error' : ''}`}
                  value={formData.candidateEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="student@college.edu.in"
                />
                {errors.candidateEmail && (
                  <span className="form-error-msg">{errors.candidateEmail}</span>
                )}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="candidatePhone">
                  <Phone size={14} /> Contact Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="candidatePhone"
                  name="candidatePhone"
                  className={`form-control ${errors.candidatePhone ? 'error' : ''}`}
                  value={formData.candidatePhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                />
                {errors.candidatePhone && (
                  <span className="form-error-msg">{errors.candidatePhone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="college">
                  <GraduationCap size={14} /> College / Institution Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  className={`form-control ${errors.college ? 'error' : ''}`}
                  value={formData.college}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="College Name"
                />
                {errors.college && (
                  <span className="form-error-msg">{errors.college}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="course">
                Course, Degree & Semester <span className="required">*</span>
              </label>
              <input
                type="text"
                id="course"
                name="course"
                className={`form-control ${errors.course ? 'error' : ''}`}
                value={formData.course}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="B.Tech Computer Science & Engineering (7th Semester)"
              />
              {errors.course && (
                <span className="form-error-msg">{errors.course}</span>
              )}
            </div>

            {/* Step 3: Skills & Resume */}
            <div className="form-section-title">
              <span className="step-num">3</span>
              <div>
                <h3>Skills, Resume & Cover Letter</h3>
                <p>Demonstrate your suitability for this SIP internship position</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">
                Key Technical Skills <span className="required">*</span>
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                className={`form-control ${errors.skills ? 'error' : ''}`}
                value={formData.skills}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. React.js, JavaScript, HTML5, CSS3, REST APIs, Git"
              />
              {errors.skills && (
                <span className="form-error-msg">{errors.skills}</span>
              )}
            </div>

            {/* Simulated Resume Upload */}
            <div className="form-group">
              <label>
                Curriculum Vitae / Resume (PDF) <span className="required">*</span>
              </label>
              <div className="resume-dropzone">
                <div className="file-active-preview">
                  <FileText size={28} className="file-icon" />
                  <div className="file-info">
                    <span className="filename">{formData.resumeFileName}</span>
                    <span className="filesize">{formData.resumeSize} &bull; Ready for submission</span>
                  </div>
                </div>

                <div className="upload-btn-wrap">
                  <label htmlFor="resume-upload" className="btn btn-outline btn-sm">
                    <UploadCloud size={14} /> Upload Different File
                  </label>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={handleResumeFileSelect}
                  />
                </div>
              </div>
              <span className="form-hint-text">
                Attached from your verified student document vault.
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">
                Cover Letter / Statement of Purpose <span className="required">*</span>
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={4}
                className={`form-control ${errors.coverLetter ? 'error' : ''}`}
                value={formData.coverLetter}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Explain why you are interested in this internship, relevant projects you've built, and what you aim to achieve during your 7th Semester SIP..."
              />
              {errors.coverLetter && (
                <span className="form-error-msg">{errors.coverLetter}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-submit-row">
              <button
                type="submit"
                className="btn btn-primary submit-app-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Academic Guidelines Sidepanel */}
        <div className="apply-sidebar-guidelines">
          <div className="it-card guideline-card">
            <div className="g-header">
              <ShieldCheck size={20} className="g-icon" />
              <h4>SIP Evaluation Checklist</h4>
            </div>
            <ul className="guideline-list">
              <li>
                <CheckCircle2 size={15} className="g-check" />
                <span>Internship duration must span at least 8 to 12 weeks.</span>
              </li>
              <li>
                <CheckCircle2 size={15} className="g-check" />
                <span>Company must provide formal offer and joining letters.</span>
              </li>
              <li>
                <CheckCircle2 size={15} className="g-check" />
                <span>Faculty guide approval is required prior to joining.</span>
              </li>
              <li>
                <CheckCircle2 size={15} className="g-check" />
                <span>Maintain daily diary entries for 7th Sem SIP Viva evaluation.</span>
              </li>
            </ul>
          </div>

          <div className="it-card demo-notice-card">
            <h4>📋 Department Guidelines</h4>
            <p>
              Applications submitted through the portal are logged for your <strong>SIP Faculty Mentor</strong> and Training & Placement Cell records. Status updates can be tracked in the <em>My Applications</em> module.
            </p>
          </div>
        </div>
      </div>

      {/* Application Success Modal */}
      {submittedApp && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="success-modal-body">
              <div className="success-icon-burst">
                <CheckCircle2 size={48} color="#16a34a" />
              </div>
              <h2>Application Submitted Successfully!</h2>
              <p className="success-modal-sub">
                Your application for <strong>{submittedApp.title}</strong> at{' '}
                <strong>{submittedApp.company}</strong> has been logged into the student portal.
              </p>

              <div className="app-summary-card">
                <div className="app-summary-row">
                  <span>Application Reference ID:</span>
                  <strong className="font-mono">{submittedApp.id}</strong>
                </div>
                <div className="app-summary-row">
                  <span>Submission Date:</span>
                  <span>{submittedApp.appliedDate}</span>
                </div>
                <div className="app-summary-row">
                  <span>Initial Status:</span>
                  <span className="badge badge-warning">Pending Review</span>
                </div>
              </div>

              <div className="success-modal-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/my-applications')}
                >
                  Track in My Applications &rarr;
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmittedApp(null);
                    setFormData((prev) => ({ ...prev, coverLetter: '' }));
                  }}
                >
                  Apply Another Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyInternship;

