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

// Default registered user for initial start
const defaultUser = {
  id: 'usr-default',
  fullName: initialStudentProfile.fullName,
  email: initialStudentProfile.email,
  phone: initialStudentProfile.phone,
  enrollmentNo: initialStudentProfile.enrollmentNo,
  collegeName: initialStudentProfile.collegeName,
  universityName: initialStudentProfile.universityName,
  degree: initialStudentProfile.degree,
  branch: initialStudentProfile.branch,
  semester: initialStudentProfile.semester,
  password: 'password123',
  avatar: initialStudentProfile.avatar,
  currentInternship: initialStudentProfile.currentInternship,
  mentorName: initialStudentProfile.mentorName,
  industryMentor: initialStudentProfile.industryMentor,
  skills: initialStudentProfile.skills,
  careerInterests: initialStudentProfile.careerInterests,
  bio: initialStudentProfile.bio,
  cgpa: initialStudentProfile.cgpa
};

export const AppProvider = ({ children }) => {
  // Safe LocalStorage loader helper
  const loadStored = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (err) {
      console.warn(`Error reading ${key} from LocalStorage:`, err);
      return fallback;
    }
  };

  // --- Users & Authentication State ---
  const [users, setUsers] = useState(() => loadStored('interntrack_users', [defaultUser]));
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = loadStored('interntrack_current_user', defaultUser);
    return savedUser;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return loadStored('interntrack_is_logged_in', true);
  });

  // --- Core Application Data States ---
  const [profile, setProfile] = useState(() => loadStored('interntrack_profile', currentUser));
  const [internships, setInternships] = useState(() => loadStored('interntrack_internships', initialInternships));
  const [applications, setApplications] = useState(() => loadStored('interntrack_applications', initialApplications));
  const [tasks, setTasks] = useState(() => loadStored('interntrack_tasks', initialTasks));
  const [attendance, setAttendance] = useState(() => loadStored('interntrack_attendance', initialAttendanceRecords));
  const [diary, setDiary] = useState(() => loadStored('interntrack_diary', initialDiaryEntries));
  const [documents, setDocuments] = useState(() => loadStored('interntrack_documents', initialDocuments));
  const [notifications, setNotifications] = useState(() => loadStored('interntrack_notifications', initialNotifications));

  // --- Global UI States ---
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync to LocalStorage whenever state updates
  useEffect(() => {
    localStorage.setItem('interntrack_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('interntrack_current_user', JSON.stringify(currentUser));
    localStorage.setItem('interntrack_is_logged_in', JSON.stringify(isLoggedIn));
  }, [currentUser, isLoggedIn]);

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

  // --- Toast Dispatcher ---
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

  // --- Authentication Operations ---
  const registerUser = (userData) => {
    // Generate clean student record
    const existing = users.find(
      (u) =>
        u.enrollmentNo.toLowerCase() === userData.enrollmentNo.toLowerCase() ||
        u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existing) {
      showToast('Account Exists', 'A student with this Roll No. or Email is already registered.', 'error');
      return { success: false, message: 'Student ID or email already registered' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: userData.fullName.trim(),
      email: userData.email.trim(),
      phone: userData.phone || '+91 98765 00000',
      enrollmentNo: userData.enrollmentNo.trim().toUpperCase(),
      collegeName: userData.collegeName.trim(),
      universityName: userData.universityName || 'State Technological University',
      degree: userData.degree || 'Bachelor of Technology (B.Tech)',
      branch: userData.branch || 'Computer Science & Engineering',
      semester: userData.semester || '7th Semester',
      password: userData.password || 'password123',
      avatar:
        userData.avatar ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.fullName)}&backgroundColor=2563eb`,
      currentInternship: userData.currentInternship || 'Software Engineering Intern',
      mentorName: userData.mentorName || 'Dr. HOD / Faculty Coordinator',
      industryMentor: userData.industryMentor || 'Lead Engineer',
      skills: ['React.js', 'JavaScript', 'HTML5/CSS3', 'Git'],
      careerInterests: ['Web Development', 'Software Engineering'],
      bio: `7th-semester engineering student at ${userData.collegeName}. Maintaining internship records for university SIP evaluation.`,
      cgpa: userData.cgpa || '8.5 / 10.0'
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setProfile(newUser);
    setIsLoggedIn(true);

    showToast('Registration Successful', `Welcome ${newUser.fullName}! Your student ID has been created.`, 'success');
    return { success: true, user: newUser };
  };

  const loginUser = (studentIdOrEmail, password) => {
    const query = studentIdOrEmail.trim().toLowerCase();
    const foundUser = users.find(
      (u) =>
        (u.enrollmentNo.toLowerCase() === query || u.email.toLowerCase() === query) &&
        u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setProfile(foundUser);
      setIsLoggedIn(true);
      showToast('Welcome Back', `Logged in as ${foundUser.fullName}`, 'success');
      return { success: true, user: foundUser };
    } else {
      showToast('Authentication Failed', 'Invalid Student Roll No / Email or Password.', 'error');
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed Out', 'You have been signed out of your student session.', 'info');
  };

  // --- Profile Operations ---
  const updateProfile = (updatedFields) => {
    const updated = { ...profile, ...updatedFields };
    setProfile(updated);
    setCurrentUser(updated);

    // Update in users registry
    setUsers((prev) =>
      prev.map((u) => (u.enrollmentNo === updated.enrollmentNo || u.id === updated.id ? updated : u))
    );

    showToast('Profile Updated', 'Student profile details updated successfully.', 'success');
  };

  // --- Internships Operations (Add Custom Opportunity) ---
  const addInternship = (intData) => {
    const newInt = {
      ...intData,
      id: `int-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      logoText: (intData.company || 'CO').substring(0, 2).toUpperCase(),
      logoColor: '#2563eb',
      responsibilities: Array.isArray(intData.responsibilities)
        ? intData.responsibilities
        : (intData.responsibilities || 'Contribute to feature development and bug fixes.')
            .split('\n')
            .filter(Boolean),
      requirements: Array.isArray(intData.requirements)
        ? intData.requirements
        : (intData.requirements || 'Knowledge of React and JavaScript fundamentals.')
            .split('\n')
            .filter(Boolean),
      perks: Array.isArray(intData.perks)
        ? intData.perks
        : ['Internship Completion Certificate', 'Flexible Hours', 'Mentorship']
    };

    setInternships((prev) => [newInt, ...prev]);
    showToast('Opportunity Added', `"${newInt.title}" at ${newInt.company} listed successfully.`, 'success');
    return newInt;
  };

  // --- Applications Operations ---
  const addApplication = (newApp) => {
    const appWithId = {
      ...newApp,
      id: `APP-${Date.now().toString().slice(-6)}`,
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
    showToast('Application Withdrawn', 'Internship application removed.', 'info');
  };

  // --- Task Operations ---
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: taskData.status || 'Pending'
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Task Created', `"${newTask.title}" added to your task list.`, 'success');
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
    );
    showToast('Task Updated', 'Task changes saved.', 'success');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task Removed', 'Task deleted.', 'info');
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

  // --- Attendance Operations (Custom Date Logging) ---
  const logAttendance = (entryData) => {
    const targetDate = entryData.date;
    const isPresent = entryData.status === 'present' || entryData.status === 'od';

    setAttendance((prev) => {
      const existingIdx = prev.findIndex((r) => r.date === targetDate);
      const updatedRecord = {
        id: `att-${targetDate}`,
        date: targetDate,
        day: entryData.day || new Date(targetDate).toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: parseInt(targetDate.split('-')[2], 10) || 1,
        status: entryData.status,
        checkIn: isPresent ? entryData.checkIn || '09:15 AM' : '-',
        checkOut: isPresent ? entryData.checkOut || '05:45 PM' : '-',
        workingHours: isPresent ? entryData.workingHours || '8.0 hrs' : '0 hrs',
        note: entryData.note || 'Regular internship duty logged.'
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = updatedRecord;
        return copy;
      } else {
        return [updatedRecord, ...prev];
      }
    });

    showToast('Attendance Recorded', `Attendance for ${targetDate} logged as ${entryData.status.toUpperCase()}.`, 'success');
  };

  const markTodayAttendance = (status = 'present', note = 'Daily internship check-in') => {
    const today = new Date().toISOString().split('T')[0];
    logAttendance({
      date: today,
      status,
      checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOut: '05:30 PM',
      workingHours: '8.0 hrs',
      note
    });
  };

  const updateAttendanceRecord = (recordId, updatedFields) => {
    setAttendance((prev) =>
      prev.map((rec) => (rec.id === recordId ? { ...rec, ...updatedFields } : rec))
    );
    showToast('Record Updated', 'Attendance record modified.', 'info');
  };

  // Dynamic Attendance Stats
  const attendanceStats = (() => {
    const workingDays = attendance.filter((r) => r.status !== 'weekend');
    const presentDays = workingDays.filter((r) => r.status === 'present' || r.status === 'od').length;
    const absentDays = workingDays.filter((r) => r.status === 'absent').length;
    const leaveDays = workingDays.filter((r) => r.status === 'leave').length;
    const totalWorkingDays = workingDays.length;
    const percentage = totalWorkingDays > 0 ? ((presentDays / totalWorkingDays) * 100).toFixed(1) : '0.0';

    return {
      totalWorkingDays,
      presentDays,
      absentDays,
      leaveDays,
      percentage: Number(percentage)
    };
  })();

  // --- Internship Diary Operations ---
  const addDiaryEntry = (entryData) => {
    const newEntry = {
      ...entryData,
      id: `diary-${Date.now()}`,
      tasksCompleted: Array.isArray(entryData.tasksCompleted)
        ? entryData.tasksCompleted
        : (entryData.tasksCompleted || '').split('\n').filter(Boolean)
    };
    setDiary((prev) => [newEntry, ...prev]);
    showToast('Diary Saved', 'Daily work log added to your internship diary.', 'success');
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
    showToast('Diary Updated', 'Diary record updated.', 'success');
  };

  const deleteDiaryEntry = (entryId) => {
    setDiary((prev) => prev.filter((e) => e.id !== entryId));
    showToast('Diary Removed', 'Diary record deleted.', 'info');
  };

  // --- Documents Operations ---
  const addDocument = (docData) => {
    const newDoc = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      status: docData.status || 'Verified',
      previewContent: docData.previewContent || {
        title: docData.name.toUpperCase(),
        subtitle: `Internship Document - Category: ${docData.category}`,
        sections: [
          `File: ${docData.name}`,
          `Category: ${docData.category}`,
          `Uploaded: ${new Date().toLocaleDateString()}`,
          `Student: ${profile.fullName} (${profile.enrollmentNo})`,
          `College: ${profile.collegeName}`
        ],
        watermark: 'OFFICIAL RECORD'
      }
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast('Document Uploaded', `"${docData.name}" saved to repository.`, 'success');
  };

  const deleteDocument = (docId) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    showToast('Document Removed', 'Document deleted from repository.', 'info');
  };

  // --- Notification Operations ---
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  // --- Reset & Fresh Start Functions ---
  // Option 1: Clear all dummy data so the user can start with a 100% clean, fresh slate with their own data
  const clearAllDataToFresh = () => {
    setApplications([]);
    setTasks([]);
    setAttendance([]);
    setDiary([]);
    setDocuments([]);
    setNotifications([
      {
        id: 'notif-fresh-1',
        title: 'Fresh Student Workspace Created',
        message: 'All dummy records cleared. Start by adding your tasks, attendance, and diary entries.',
        time: 'Just now',
        read: false,
        type: 'info'
      }
    ]);
    showToast('Workspace Cleared', 'All sample data cleared. Ready for your own entries!', 'info');
  };

  // Option 2: Restore realistic sample data for viva demonstration
  const resetDemoData = () => {
    setProfile(defaultUser);
    setCurrentUser(defaultUser);
    setInternships(initialInternships);
    setApplications(initialApplications);
    setTasks(initialTasks);
    setAttendance(initialAttendanceRecords);
    setDiary(initialDiaryEntries);
    setDocuments(initialDocuments);
    setNotifications(initialNotifications);
    showToast('Sample Data Loaded', 'Standard academic demonstration records restored.', 'info');
  };

  // Computed summary metrics
  const metrics = {
    totalApplications: applications.length,
    activeInternships: applications.filter((a) => a.status === 'Selected').length,
    shortlistedApplications: applications.filter((a) => a.status === 'Shortlisted').length,
    underReviewApplications: applications.filter((a) => a.status === 'Under Review').length,
    completedTasks: tasks.filter((t) => t.status === 'Completed').length,
    pendingTasks: tasks.filter((t) => t.status !== 'Completed').length,
    totalTasks: tasks.length,
    taskCompletionRate:
      tasks.length > 0
        ? Math.round((tasks.filter((t) => t.status === 'Completed').length / tasks.length) * 100)
        : 0,
    attendanceRate: attendanceStats.percentage,
    totalDiaryEntries: diary.length,
    totalDocuments: documents.length
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
        registerUser,
        loginUser,
        logoutUser,
        profile,
        updateProfile,
        internships,
        addInternship,
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
        logAttendance,
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
        clearAllDataToFresh,
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
