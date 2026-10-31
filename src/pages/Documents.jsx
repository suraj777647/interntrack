import React, { useState, useMemo } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  FolderLock,
  UploadCloud,
  FileText,
  FileCode,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  FileSpreadsheet,
  Award,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import './Documents.css';

export const Documents = () => {
  const { documents, addDocument, deleteDocument, profile } = useInternTrack();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload state
  const [uploadData, setUploadData] = useState({
    name: '',
    category: 'Resume',
    size: '1.4 MB'
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'All',
    'Resume',
    'Offer Letter',
    'Joining Letter',
    'Internship Report',
    'Presentation',
    'Certificate'
  ];

  const filteredDocs = useMemo(() => {
    const safeDocs = Array.isArray(documents) ? documents : [];
    return safeDocs.filter((doc) => {
      const matchesSearch =
        (doc.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.category || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [documents, searchTerm, selectedCategory]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadData((prev) => ({
        ...prev,
        name: file.name,
        size: `${sizeMb > 0 ? sizeMb : '0.8'} MB`
      }));
    }
  };

  const handleStartUpload = (e) => {
    e.preventDefault();
    if (!uploadData.name.trim()) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            addDocument({
              name: uploadData.name,
              category: uploadData.category,
              type: uploadData.name.endsWith('.pptx') ? 'PowerPoint Presentation' : 'PDF Document',
              size: uploadData.size,
              description: `Uploaded for 7th Semester SIP portfolio under ${uploadData.category}.`
            });
            setIsUploading(false);
            setUploadProgress(0);
            setIsUploadModalOpen(false);
            setUploadData({ name: '', category: 'Resume', size: '1.4 MB' });
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 180);
  };

  const handleDelete = (docId) => {
    if (window.confirm('Delete this document from your repository?')) {
      deleteDocument(docId);
      if (previewDoc && previewDoc.id === docId) {
        setPreviewDoc(null);
      }
    }
  };

  const handleSimulateDownload = (doc) => {
    // Generate text blob download
    const blob = new Blob(
      [
        `====================================================\n` +
        `${(profile?.collegeName || 'ACADEMIC INSTITUTION').toUpperCase()}\n` +
        `B.Tech 7th Semester Summer Internship Program (SIP)\n` +
        `====================================================\n\n` +
        `Document: ${doc.name}\n` +
        `Category: ${doc.category}\n` +
        `Student: ${profile.fullName} (${profile.enrollmentNo})\n` +
        `College: ${profile.collegeName}\n` +
        `Uploaded Date: ${doc.uploadedDate}\n` +
        `Status: ${doc.status}\n\n` +
        `Description: ${doc.description || 'Verified SIP Document'}\n\n` +
        `[Verified Document Generated for Academic SIP Evaluation]`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name.replace(/\.[^/.]+$/, "") + "_download.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
      case 'Approved':
        return 'badge-success';
      case 'Under Review':
        return 'badge-info';
      case 'Pending Final Viva':
      case 'Draft':
        return 'badge-warning';
      default:
        return 'badge-neutral';
    }
  };

  const getDocIconColor = (category) => {
    switch (category) {
      case 'Offer Letter':
        return 'icon-offer';
      case 'Certificate':
        return 'icon-cert';
      case 'Presentation':
        return 'icon-ppt';
      case 'Internship Report':
        return 'icon-report';
      default:
        return 'icon-default';
    }
  };

  return (
    <div className="documents-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <FolderLock size={14} />
            <span>Document Vault</span>
          </div>
          <h1 className="page-title">Internship Document Management</h1>
          <p className="page-subtitle">
            Centralized academic repository for offer letters, reports, certificates, and presentation decks.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsUploadModalOpen(true)}>
          <UploadCloud size={16} /> Upload Document
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="it-card filter-card">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search documents by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="it-card empty-state-card">
          <FolderLock size={48} className="empty-icon" />
          <h3>No documents found</h3>
          <p>
            {searchTerm || selectedCategory !== 'All'
              ? 'Try resetting your search query or category filter.'
              : 'Upload your internship documents to maintain a centralized SIP dossier.'}
          </p>
          <button className="btn btn-primary btn-sm" onClick={() => setIsUploadModalOpen(true)}>
            <UploadCloud size={14} /> Upload First Document
          </button>
        </div>
      ) : (
        <div className="docs-grid">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="it-card doc-card">
              <div className="doc-card-top">
                <div className={`doc-icon-badge ${getDocIconColor(doc.category)}`}>
                  <FileText size={22} />
                </div>
                <span className={`badge ${getStatusBadge(doc.status)}`}>
                  {doc.status}
                </span>
              </div>

              <div className="doc-info-block">
                <h4 className="doc-title" title={doc.name}>
                  {doc.name}
                </h4>
                <div className="doc-meta-row">
                  <span className="badge badge-neutral">{doc.category}</span>
                  <span className="doc-size">{doc.size}</span>
                </div>
                {doc.description && (
                  <p className="doc-desc-text">{doc.description}</p>
                )}
                <span className="doc-uploaded-date">Uploaded: {doc.uploadedDate}</span>
              </div>

              <div className="doc-actions-row">
                <button
                  className="btn btn-outline btn-sm doc-btn"
                  onClick={() => setPreviewDoc(doc)}
                >
                  <Eye size={14} /> Preview
                </button>
                <button
                  className="btn btn-secondary btn-sm doc-btn"
                  title="Download File"
                  onClick={() => handleSimulateDownload(doc)}
                >
                  <Download size={14} />
                </button>
                <button
                  className="btn-icon-danger"
                  title="Delete Document"
                  onClick={() => handleDelete(doc.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Academic Document</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsUploadModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleStartUpload}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Document Category <span className="required">*</span></label>
                  <select
                    className="form-control"
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Document Display Name <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. SIP_Mid_Term_Report_v2.pdf"
                    value={uploadData.name}
                    onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Simulated File Drop */}
                <div className="form-group">
                  <label>Select File from Computer</label>
                  <div className="file-upload-dropzone">
                    <UploadCloud size={32} className="drop-icon" />
                    <p className="drop-title">Drag & drop or browse your local file</p>
                    <p className="drop-sub">Supports PDF, DOCX, PPTX (up to 15MB)</p>
                    <input
                      type="file"
                      id="doc-file-input"
                      style={{ display: 'none' }}
                      accept=".pdf,.docx,.pptx,.doc"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="doc-file-input" className="btn btn-outline btn-sm">
                      Browse Files
                    </label>
                  </div>
                </div>

                {/* Upload Progress Bar if uploading */}
                {isUploading && (
                  <div className="upload-progress-wrapper">
                    <div className="progress-label-row">
                      <span>Uploading and indexing document...</span>
                      <strong>{uploadProgress}%</strong>
                    </div>
                    <div className="summary-progress-bar">
                      <div
                        className="progress-fill fill-blue"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsUploadModalOpen(false)}
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUploading || !uploadData.name}
                >
                  {isUploading ? 'Uploading...' : 'Upload & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Realistic Academic Document Preview Modal */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div
            className="modal-content doc-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>{previewDoc.name}</h3>
                <p className="modal-subtitle">
                  Category: <strong>{previewDoc.category}</strong> &bull; Size: {previewDoc.size} &bull; Status: {previewDoc.status}
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setPreviewDoc(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body preview-viewer-canvas">
              <div className="academic-document-page">
                {/* Watermark */}
                <div className="doc-watermark">
                  {previewDoc.previewContent?.watermark || 'ACADEMIC RECORD'}
                </div>

                {/* Official Letterhead / Header */}
                <div className="doc-letterhead">
                  <div className="doc-inst-title">{(profile?.collegeName || 'ACADEMIC INSTITUTION').toUpperCase()}</div>
                  <div className="doc-inst-sub">Affiliated to State Technological University &bull; Summer Internship Program</div>
                  <div className="doc-divider-line"></div>
                </div>

                {/* Main Content */}
                <div className="doc-body-content">
                  <h3 className="doc-center-title">
                    {previewDoc.previewContent?.title || previewDoc.name.toUpperCase()}
                  </h3>
                  <p className="doc-center-subtitle">
                    {previewDoc.previewContent?.subtitle || `Official Academic Dossier - ${previewDoc.category}`}
                  </p>

                  <div className="doc-sections-box">
                    {(previewDoc.previewContent?.sections || [
                      `Document Name: ${previewDoc.name}`,
                      `Category: ${previewDoc.category}`,
                      `Verified Student: ${profile.fullName} (${profile.enrollmentNo})`,
                      `Degree Program: ${profile.degree} - ${profile.branch}`,
                      `Host Industry: ${profile.currentInternship}`,
                      `Academic Guide: ${profile.mentorName}`
                    ]).map((sec, i) => (
                      <div key={i} className="doc-section-paragraph">
                        &bull; {sec}
                      </div>
                    ))}
                  </div>

                  <p className="doc-formal-seal-text">
                    This document is endorsed by the Departmental Summer Internship Committee for evaluation and credit awarding.
                  </p>
                </div>

                {/* Signature Block */}
                <div className="doc-seal-row">
                  <div className="seal-box">
                    <Award size={40} className="seal-icon" />
                    <span>VERIFIED OFFICIAL</span>
                  </div>
                  <div className="doc-sign-item">
                    <div className="sign-line"></div>
                    <span>Authorized Academic Signatory</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setPreviewDoc(null)}>
                Close Preview
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSimulateDownload(previewDoc)}
              >
                <Download size={14} /> Download Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;

