import React, { useState, useMemo } from 'react';
import { useInternTrack } from '../context/AppContext';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './TaskManagement.css';

export const TaskManagement = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useInternTrack();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // All | Pending | Completed
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    category: 'Development',
    status: 'Pending'
  });

  const [formErrors, setFormErrors] = useState({});

  const categories = ['All', 'Development', 'Documentation', 'Testing', 'Presentation', 'Academic', 'Bug Fix', 'Research'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  // Calculate Progress Metrics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = totalCount - completedCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const highPriorityPending = tasks.filter((t) => t.status !== 'Completed' && t.priority === 'High').length;

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Completed'
          ? task.status === 'Completed'
          : task.status !== 'Completed';

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'All' || task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      category: 'Development',
      status: 'Pending'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
      status: task.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleToggle = (taskId, currentStatus) => {
    toggleTaskStatus(taskId);
    if (currentStatus !== 'Completed') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Task title is required.';
    if (!formData.dueDate) errors.dueDate = 'Due date is required.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
    <div className="tasks-page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="header-badge">
            <CheckSquare size={14} />
            <span>Productivity Manager</span>
          </div>
          <h1 className="page-title">Internship Task Management</h1>
          <p className="page-subtitle">
            Organize daily tasks, track deliverables, and manage academic SIP milestones.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add New Task
        </button>
      </div>

      {/* Progress Summary Card */}
      <div className="it-card progress-summary-card">
        <div className="summary-left">
          <div className="progress-stat-ring">
            <span className="percent-text">{completionPercentage}%</span>
            <span className="percent-sub">Complete</span>
          </div>
          <div className="summary-text-block">
            <h3>Sprint & SIP Task Deliverables</h3>
            <p>
              You have completed <strong>{completedCount}</strong> of <strong>{totalCount}</strong> tasks.
              {highPriorityPending > 0 && (
                <span className="high-p-alert">
                  {' '}&bull; {highPriorityPending} High-Priority pending
                </span>
              )}
            </p>
            <div className="summary-progress-bar">
              <div
                className="progress-fill fill-blue"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="summary-quick-counts">
          <div className="q-count-item">
            <span className="q-num text-success">{completedCount}</span>
            <span className="q-label">Completed</span>
          </div>
          <div className="q-count-divider"></div>
          <div className="q-count-item">
            <span className="q-num text-amber">{pendingCount}</span>
            <span className="q-label">Pending</span>
          </div>
          <div className="q-count-divider"></div>
          <div className="q-count-item">
            <span className="q-num text-danger">{highPriorityPending}</span>
            <span className="q-label">Urgent</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="it-card filter-card">
        <div className="tasks-filter-row">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks by title or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm('')}>
                &times;
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="status-toggle-tabs">
            {['All', 'Pending', 'Completed'].map((s) => (
              <button
                key={s}
                className={`tab-btn ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Priority Select */}
          <div className="select-pill">
            <label>Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="select-pill">
            <label>Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="it-card empty-state-card">
          <CheckSquare size={44} className="empty-icon" />
          <h3>No tasks found</h3>
          <p>
            {searchTerm || statusFilter !== 'All' || priorityFilter !== 'All'
              ? 'Try resetting your filters or search query.'
              : 'Your task list is empty. Add a task to start tracking your work.'}
          </p>
          <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
            <Plus size={14} /> Create Your First Task
          </button>
        </div>
      ) : (
        <div className="tasks-list-grid">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === 'Completed';

            return (
              <div
                key={task.id}
                className={`it-card task-card ${isCompleted ? 'task-done' : ''}`}
              >
                <div className="task-left-section">
                  <button
                    className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}
                    onClick={() => handleToggle(task.id, task.status)}
                    aria-label={`Mark task ${task.title} as ${isCompleted ? 'pending' : 'completed'}`}
                  >
                    {isCompleted && <Check size={14} color="#ffffff" strokeWidth={3} />}
                  </button>

                  <div className="task-content-block">
                    <div className="task-title-line">
                      <h4 className={isCompleted ? 'text-strikethrough' : ''}>
                        {task.title}
                      </h4>
                    </div>

                    {task.description && (
                      <p className={`task-desc-text ${isCompleted ? 'text-strikethrough' : ''}`}>
                        {task.description}
                      </p>
                    )}

                    <div className="task-tags-row">
                      <span className="badge badge-neutral">{task.category}</span>
                      <span
                        className={`badge ${
                          task.priority === 'High'
                            ? 'badge-danger'
                            : task.priority === 'Medium'
                            ? 'badge-warning'
                            : 'badge-info'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                      <span className="task-due-indicator">
                        <Calendar size={12} /> Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="task-actions-col">
                  <button
                    className="icon-action-btn"
                    title="Edit Task"
                    onClick={() => handleOpenEditModal(task)}
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    className="icon-action-btn delete"
                    title="Delete Task"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingTask ? 'Edit Internship Task' : 'Create New Internship Task'}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="task-title">
                    Task Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="task-title"
                    className={`form-control ${formErrors.title ? 'error' : ''}`}
                    placeholder="e.g. Implement Responsive Sidebar Navigation"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  {formErrors.title && (
                    <span className="form-error-msg">{formErrors.title}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="task-desc">Task Description & Deliverables</label>
                  <textarea
                    id="task-desc"
                    rows={3}
                    className="form-control"
                    placeholder="Provide details on the task scope, requirements, or mentor feedback..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="task-cat">Task Category</label>
                    <select
                      id="task-cat"
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="task-priority">Priority Level</label>
                    <select
                      id="task-priority"
                      className="form-control"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      {priorities.filter((p) => p !== 'All').map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="task-due">
                      Due Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="task-due"
                      className={`form-control ${formErrors.dueDate ? 'error' : ''}`}
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                    {formErrors.dueDate && (
                      <span className="form-error-msg">{formErrors.dueDate}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="task-status">Status</label>
                    <select
                      id="task-status"
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
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
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;

