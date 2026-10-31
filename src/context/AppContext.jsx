import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialStudentProfile,
  initialInternships,
  initialApplications,
  initialTasks,
  initialAttendanceRecords,
  initialDiaryEntries,
  initialDocuments,
  initialNotifications
} from '../data/demoData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Safe LocalStorage loader
  const loadStored = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (err) {
      console.warn(`Error reading ${key} from LocalStorage:`, err);
      return fallback;
    }
  };

  // State definitions
  const [profile, setProfile] = useState(() => loadStored('interntrack_profile', initialStudentProfile));
  const [internships, setInternships] = useState(() => loadStored('interntrack_internships', initialInternships));
  const [applications, setApplications] = useState(() => loadStored('interntrack_applications', initialApplications));
  const [tasks, setTasks] = useState(() => loadStored('interntrack_tasks', initialTasks));
  const [attendance, setAttendance] = useState(() => loadStored('interntrack_attendance', initialAttendanceRecords));
  const [diary, setDiary] = useState(() => loadStored('interntrack_diary', initialDiaryEntries));
  const [documents, setDocuments] = useState(() => loadStored('interntrack_documents', initialDocuments));
  const [notifications, setNotifications] = useState(() => loadStored('interntrack_notifications', initialNotifications));
  
  // UI & Global Feedback States
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('interntrack_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('interntrack_internships', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('interntrack_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('interntrack_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('interntrack_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('interntrack_diary', JSON.stringify(diary));
  }, [diary]);

  useEffect(() => {
    localStorage.setItem('interntrack_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('interntrack_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Notification Dispatcher
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Profile Operations
  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields
    }));
    showToast('Profile Updated', 'Student profile details saved successfully.', 'success');
  };

  // Applications Operations
  const addApplication = (newApp) => {
    const appWithId = {
      ...newApp,
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
          note: 'Application submitted via student portal.'
        }
      ]
    };
    setApplications((prev) => [appWithId, ...prev]);
    showToast('Application Submitted', `Applied for ${newApp.title} at ${newApp.company}!`, 'success');
    return appWithId;
  };

  const updateApplicationStatus = (appId, newStatus, optionalNote) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedHistory = [
            ...(app.statusHistory || []),
            {
              status: newStatus,
              date: new Date().toISOString().split('T')[0],
              note: optionalNote || `Status updated to ${newStatus}.`
            }
          ];
          return {
            ...app,
            status: newStatus,
            statusHistory: updatedHistory
          };
        }
        return app;
      })
    );
    showToast('Status Updated', `Application status changed to ${newStatus}.`, 'info');
  };

  const deleteApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    showToast('Application Withdrawn', 'Internship application was removed.', 'info');
  };

  // Task Operations
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: taskData.status || 'Pending'
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Task Created', `"${newTask.title}" added to your task board.`, 'success');
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
    );
    showToast('Task Updated', 'Task changes have been saved.', 'success');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task Removed', 'The task has been deleted.', 'info');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Attendance Operations & Metrics
  const markTodayAttendance = (status = 'present', note = 'Manual student check-in') => {
    const todayStr = '2026-10-31'; // Or dynamic current date
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setAttendance((prev) => {
      const existingIndex = prev.findIndex((r) => r.date === todayStr);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          status,
          checkIn: status === 'present' ? copy[existingIndex].checkIn || nowTime : '-',
          checkOut: status === 'present' ? '05:30 PM' : '-',
          workingHours: status === 'present' ? '8.0 hrs' : '0 hrs',
          note
        };
        return copy;
      } else {
        const newRecord = {
          id: `att-${todayStr}`,
          date: todayStr,
          day: 'Sat',
          dayNumber: 31,
          status,
          checkIn: status === 'present' ? nowTime : '-',
          checkOut: status === 'present' ? '05:30 PM' : '-',
          workingHours: status === 'present' ? '8.0 hrs' : '0 hrs',
          note
        };
        return [...prev, newRecord];
      }
    });
    showToast('Attendance Recorded', `Marked attendance as ${status.toUpperCase()} for today.`, 'success');
  };

  const updateAttendanceRecord = (recordId, updatedFields) => {
    setAttendance((prev) =>
      prev.map((rec) => (rec.id === recordId ? { ...rec, ...updatedFields } : rec))
    );
    showToast('Record Updated', 'Attendance entry modified.', 'info');
  };

  // Dynamic Attendance Calculation
  const attendanceStats = (() => {
    const workingDays = attendance.filter((r) => r.status !== 'weekend');
    const presentDays = workingDays.filter((r) => r.status === 'present').length;
    const absentDays = workingDays.filter((r) => r.status === 'absent').length;
    const leaveDays = workingDays.filter((r) => r.status === 'leave').length;
    const totalWorkingDays = workingDays.length;
    const percentage = totalWorkingDays > 0 ? ((presentDays / totalWorkingDays) * 100).toFixed(1) : 0;
    
    return {
      totalWorkingDays,
      presentDays,
      absentDays,
      leaveDays,
      percentage: Number(percentage)
    };
  })();

  // Internship Diary Operations
  const addDiaryEntry = (entryData) => {
    const newEntry = {
      ...entryData,
      id: `diary-${Date.now()}`,
      tasksCompleted: Array.isArray(entryData.tasksCompleted)
        ? entryData.tasksCompleted
        : (entryData.tasksCompleted || '').split('\n').filter(Boolean)
    };
    setDiary((prev) => [newEntry, ...prev]);
    showToast('Diary Saved', 'Daily internship diary record added.', 'success');
  };

  const updateDiaryEntry = (entryId, updatedFields) => {
    setDiary((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? {
              ...e,
              ...updatedFields,
              tasksCompleted: Array.isArray(updatedFields.tasksCompleted)
                ? updatedFields.tasksCompleted
                : (updatedFields.tasksCompleted || '').split('\n').filter(Boolean)
            }
          : e
      )
    );
    showToast('Diary Updated', 'Diary entry updated successfully.', 'success');
  };

  const deleteDiaryEntry = (entryId) => {
    setDiary((prev) => prev.filter((e) => e.id !== entryId));
    showToast('Diary Entry Removed', 'Diary record was deleted.', 'info');
  };

  // Documents Operations
  const addDocument = (docData) => {
    const newDoc = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      status: 'Uploaded',
      previewContent: docData.previewContent || {
        title: docData.name.toUpperCase(),
        subtitle: `Internship Document - Category: ${docData.category}`,
        sections: [
          `File: ${docData.name}`,
          `Category: ${docData.category}`,
          `Upload Timestamp: ${new Date().toLocaleString()}`,
          `Student: ${profile.fullName} (${profile.enrollmentNo})`
        ],
        watermark: "STUDENT SUBMISSION"
      }
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast('Document Uploaded', `${docData.name} saved to your documents vault.`, 'success');
  };

  const deleteDocument = (docId) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    showToast('Document Deleted', 'Document removed from storage.', 'info');
  };

  // Notification Operations
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  // Reset to initial demo data (perfect for testing & viva presentation demo)
  const resetDemoData = () => {
    setProfile(initialStudentProfile);
    setInternships(initialInternships);
    setApplications(initialApplications);
    setTasks(initialTasks);
    setAttendance(initialAttendanceRecords);
    setDiary(initialDiaryEntries);
    setDocuments(initialDocuments);
    setNotifications(initialNotifications);
    localStorage.clear();
    showToast('System Reset', 'All demo data has been restored to factory default.', 'info');
  };

  // Computed summary metrics for Dashboard
  const metrics = {
    totalApplications: applications.length,
    activeInternships: applications.filter((a) => a.status === 'Selected').length,
    shortlistedApplications: applications.filter((a) => a.status === 'Shortlisted').length,
    underReviewApplications: applications.filter((a) => a.status === 'Under Review').length,
    completedTasks: tasks.filter((t) => t.status === 'Completed').length,
    pendingTasks: tasks.filter((t) => t.status !== 'Completed').length,
    totalTasks: tasks.length,
    taskCompletionRate: tasks.length > 0 ? Math.round((tasks.filter((t) => t.status === 'Completed').length / tasks.length) * 100) : 0,
    attendanceRate: attendanceStats.percentage,
    totalDiaryEntries: diary.length,
    totalDocuments: documents.length
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        internships,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        attendance,
        attendanceStats,
        markTodayAttendance,
        updateAttendanceRecord,
        diary,
        addDiaryEntry,
        updateDiaryEntry,
        deleteDiaryEntry,
        documents,
        addDocument,
        deleteDocument,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        isLoggedIn,
        setIsLoggedIn,
        resetDemoData,
        metrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useInternTrack = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useInternTrack must be used within an AppProvider');
  }
  return context;
};
