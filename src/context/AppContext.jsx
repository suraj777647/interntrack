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

// Default demo user (Aarav Sharma)
const defaultDemoUser = {
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
  skills: initialStudentProfile.skills || [],
  careerInterests: initialStudentProfile.careerInterests || [],
  bio: initialStudentProfile.bio || '',
  cgpa: initialStudentProfile.cgpa || '8.78 / 10.0'
};

export const AppProvider = ({ children }) => {
  // Safe LocalStorage helper with strict null/undefined filtering
  const loadStored = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored || stored === 'undefined' || stored === 'null') {
        return fallback;
      }
      const parsed = JSON.parse(stored);
      if (parsed === null || parsed === undefined) {
        return fallback;
      }
      return parsed;
    } catch (err) {
      console.warn(`Error reading ${key} from LocalStorage:`, err);
      return fallback;
    }
  };

  // Safe user personal key
  const getUserDataKey = (enrollmentNo) => {
    const safeId = (enrollmentNo || defaultDemoUser.enrollmentNo).toString().trim().toUpperCase();
    return `interntrack_userdata_${safeId}`;
  };

  // Helper to load personal workspace for a student
  const loadUserPersonalData = (user) => {
    const safeUser = (user && user.enrollmentNo) ? user : defaultDemoUser;
    const key = getUserDataKey(safeUser.enrollmentNo);
    const saved = loadStored(key, null);

    if (saved && typeof saved === 'object') {
      return {
        profile: { ...defaultDemoUser, ...(saved.profile || safeUser) },
        applications: Array.isArray(saved.applications) ? saved.applications : [],
        tasks: Array.isArray(saved.tasks) ? saved.tasks : [],
        attendance: Array.isArray(saved.attendance) ? saved.attendance : [],
        diary: Array.isArray(saved.diary) ? saved.diary : [],
        documents: Array.isArray(saved.documents) ? saved.documents : [],
        notifications: Array.isArray(saved.notifications) ? saved.notifications : []
      };
    }

    // Default demo user gets rich pre-seeded records
    if (safeUser.enrollmentNo.toUpperCase() === defaultDemoUser.enrollmentNo.toUpperCase()) {
      const initialData = {
        profile: { ...defaultDemoUser, ...safeUser },
        applications: initialApplications,
        tasks: initialTasks,
        attendance: initialAttendanceRecords,
        diary: initialDiaryEntries,
        documents: initialDocuments,
        notifications: initialNotifications
      };
      try {
        localStorage.setItem(key, JSON.stringify(initialData));
      } catch (e) {}
      return initialData;
    }

    // Newly registered student gets clean personal workspace
    const newStudentData = {
      profile: { ...defaultDemoUser, ...safeUser },
      applications: [],
      tasks: [
        {
          id: `task-${Date.now()}-1`,
          title: 'Review SIP University Guidelines & Evaluation Criteria',
          description: `Welcome to your personal SIP workspace, ${safeUser.fullName}. Review mandatory deliverables required for 7th Sem evaluation.`,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          priority: 'High',
          category: 'Academic',
          status: 'Pending',
          createdAt: new Date().toISOString().split('T')[0]
        }
      ],
      attendance: [],
      diary: [],
      documents: [],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `Welcome, ${safeUser.fullName}! 🎓`,
          message: 'Your personal internship workspace has been initialized. You can explore internships, log daily attendance, and track tasks.',
          time: 'Just now',
          read: false,
          type: 'info'
        }
      ]
    };
    try {
      localStorage.setItem(key, JSON.stringify(newStudentData));
    } catch (e) {}
    return newStudentData;
  };

  // --- 1. Users Registry & Current Logged-in User ---
  const [users, setUsers] = useState(() => {
    const loaded = loadStored('interntrack_users', [defaultDemoUser]);
    return Array.isArray(loaded) && loaded.length > 0 ? loaded : [defaultDemoUser];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = loadStored('interntrack_current_user', defaultDemoUser);
    if (!savedUser || typeof savedUser !== 'object' || !savedUser.enrollmentNo) {
      return defaultDemoUser;
    }
    return { ...defaultDemoUser, ...savedUser };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = loadStored('interntrack_is_logged_in', true);
    return typeof saved === 'boolean' ? saved : true;
  });

  // --- 2. Shared Global Internships Directory ---
  const [internships, setInternships] = useState(() => {
    const loaded = loadStored('interntrack_internships', initialInternships);
    return Array.isArray(loaded) && loaded.length > 0 ? loaded : initialInternships;
  });

  // --- 3. Personal Student Workspace State (Isolated per Student) ---
  const initialWorkspace = loadUserPersonalData(currentUser);

  const [profile, setProfile] = useState(() => {
    return initialWorkspace?.profile || currentUser || defaultDemoUser;
  });
  const [applications, setApplications] = useState(() => {
    return Array.isArray(initialWorkspace?.applications) ? initialWorkspace.applications : [];
  });
  const [tasks, setTasks] = useState(() => {
    return Array.isArray(initialWorkspace?.tasks) ? initialWorkspace.tasks : [];
  });
  const [attendance, setAttendance] = useState(() => {
    return Array.isArray(initialWorkspace?.attendance) ? initialWorkspace.attendance : [];
  });
  const [diary, setDiary] = useState(() => {
    return Array.isArray(initialWorkspace?.diary) ? initialWorkspace.diary : [];
  });
  const [documents, setDocuments] = useState(() => {
    return Array.isArray(initialWorkspace?.documents) ? initialWorkspace.documents : [];
  });
  const [notifications, setNotifications] = useState(() => {
    return Array.isArray(initialWorkspace?.notifications) ? initialWorkspace.notifications : [];
  });

  // --- Global UI States ---
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync users & global state
  useEffect(() => {
    try {
      localStorage.setItem('interntrack_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('interntrack_current_user', JSON.stringify(currentUser));
      localStorage.setItem('interntrack_is_logged_in', JSON.stringify(isLoggedIn));
    } catch (e) {}
  }, [currentUser, isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('interntrack_internships', JSON.stringify(internships));
    } catch (e) {}
  }, [internships]);

  // Sync personal student data to LocalStorage under user-specific key
  useEffect(() => {
    if (currentUser && currentUser.enrollmentNo) {
      const personalData = {
        profile,
        applications,
        tasks,
        attendance,
        diary,
        documents,
        notifications
      };
      try {
        localStorage.setItem(getUserDataKey(currentUser.enrollmentNo), JSON.stringify(personalData));
      } catch (e) {}
    }
  }, [currentUser, profile, applications, tasks, attendance, diary, documents, notifications]);

  // Switch student workspace when currentUser changes
  const switchUserWorkspace = (targetUser) => {
    const safeTarget = { ...defaultDemoUser, ...(targetUser || {}) };
    const data = loadUserPersonalData(safeTarget);
    setCurrentUser(safeTarget);
    setProfile(data.profile || safeTarget);
    setApplications(Array.isArray(data.applications) ? data.applications : []);
    setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    setAttendance(Array.isArray(data.attendance) ? data.attendance : []);
    setDiary(Array.isArray(data.diary) ? data.diary : []);
    setDocuments(Array.isArray(data.documents) ? data.documents : []);
    setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
  };

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
    const safeUsers = Array.isArray(users) ? users : [];
    const existing = safeUsers.find(
      (u) =>
        u.enrollmentNo?.toLowerCase() === userData.enrollmentNo?.toLowerCase() ||
        u.email?.toLowerCase() === userData.email?.toLowerCase()
    );

    if (existing) {
      showToast('Student ID Exists', 'A student with this Roll No. or Email is already registered.', 'error');
      return { success: false, message: 'Student ID or email already registered' };
    }

    const newUser = {
      ...defaultDemoUser,
      id: `usr-${Date.now()}`,
      fullName: (userData.fullName || 'Student').trim(),
      email: (userData.email || 'student@college.edu').trim(),
      phone: userData.phone || '+91 98765 00000',
      enrollmentNo: (userData.enrollmentNo || `STU-${Date.now().toString().slice(-4)}`).trim().toUpperCase(),
      collegeName: (userData.collegeName || 'Engineering College').trim(),
      universityName: userData.universityName || 'State Technological University',
      degree: userData.degree || 'Bachelor of Technology (B.Tech)',
      branch: userData.branch || 'Computer Science & Engineering',
      semester: userData.semester || '7th Semester',
      password: userData.password || 'password123',
      avatar:
        userData.avatar ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.fullName || 'User')}&backgroundColor=2563eb`,
      currentInternship: userData.currentInternship || 'Software Engineering Intern',
      mentorName: userData.mentorName || 'Faculty Guide / Department Coordinator',
      industryMentor: userData.industryMentor || 'Lead Engineer',
      skills: ['React.js', 'JavaScript', 'HTML5/CSS3', 'Git'],
      careerInterests: ['Web Development', 'Software Engineering'],
      bio: `B.Tech student at ${userData.collegeName || 'College'}. Maintaining internship records for university SIP evaluation.`,
      cgpa: userData.cgpa || '8.5 / 10.0'
    };

    const updatedUsers = [...safeUsers, newUser];
    setUsers(updatedUsers);
    try {
      localStorage.setItem('interntrack_users', JSON.stringify(updatedUsers));
    } catch (e) {}

    // Switch to this new student's personal dashboard
    switchUserWorkspace(newUser);
    setIsLoggedIn(true);

    showToast('Registration Complete', `Welcome, ${newUser.fullName}! Your personal student workspace is created.`, 'success');
    return { success: true, user: newUser };
  };

  const loginUser = (studentIdOrEmail, password) => {
    const query = (studentIdOrEmail || '').trim().toLowerCase();
    const safeUsers = Array.isArray(users) ? users : [defaultDemoUser];
    const foundUser = safeUsers.find(
      (u) =>
        (u.enrollmentNo?.toLowerCase() === query || u.email?.toLowerCase() === query) &&
        u.password === password
    );

    if (foundUser) {
      switchUserWorkspace(foundUser);
      setIsLoggedIn(true);
      showToast('Welcome Back', `Logged into ${foundUser.fullName}'s Personal Dashboard.`, 'success');
      return { success: true, user: foundUser };
    } else {
      showToast('Authentication Error', 'Invalid Student Roll No / Email or Password.', 'error');
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed Out', 'You have been signed out of your student session.', 'info');
  };

  // --- Profile Operations (Personal) ---
  const updateProfile = (updatedFields) => {
    const updated = { ...defaultDemoUser, ...profile, ...updatedFields };
    setProfile(updated);
    setCurrentUser(updated);

    // Update in users registry
    setUsers((prev) => {
      const safe = Array.isArray(prev) ? prev : [defaultDemoUser];
      return safe.map((u) => (u.enrollmentNo === updated.enrollmentNo || u.id === updated.id ? updated : u));
    });

    showToast('Profile Updated', 'Student profile details saved to your personal record.', 'success');
  };

  // --- Internships Directory (Global) ---
  const addInternship = (intData) => {
    const newInt = {
      ...intData,
      id: `int-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      logoText: (intData.company || 'CO').substring(0, 2).toUpperCase(),
      logoColor: '#2563eb',
      responsibilities: Array.isArray(intData.responsibilities)
        ? intData.responsibilities
        : (intData.responsibilities || 'Contribute to feature development and project requirements.')
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

    setInternships((prev) => [newInt, ...(Array.isArray(prev) ? prev : [])]);
    showToast('Opportunity Added', `"${newInt.title}" at ${newInt.company} listed in portal.`, 'success');
    return newInt;
  };

  // --- Applications Operations (Personal to Logged-in Student) ---
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
    setApplications((prev) => [appWithId, ...(Array.isArray(prev) ? prev : [])]);
    showToast('Application Submitted', `Applied for ${newApp.title} at ${newApp.company}!`, 'success');
    return appWithId;
  };

  const updateApplicationStatus = (appId, newStatus, optionalNote) => {
    setApplications((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((app) => {
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
      });
    });
    showToast('Status Updated', `Application status changed to ${newStatus}.`, 'info');
  };

  const deleteApplication = (appId) => {
    setApplications((prev) => (Array.isArray(prev) ? prev.filter((app) => app.id !== appId) : []));
    showToast('Application Withdrawn', 'Internship application removed.', 'info');
  };

  // --- Tasks Operations (Personal to Logged-in Student) ---
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: taskData.status || 'Pending'
    };
    setTasks((prev) => [newTask, ...(Array.isArray(prev) ? prev : [])]);
    showToast('Task Added', `"${newTask.title}" added to your task list.`, 'success');
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t));
    });
    showToast('Task Updated', 'Task changes saved.', 'success');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => (Array.isArray(prev) ? prev.filter((t) => t.id !== taskId) : []));
    showToast('Task Removed', 'Task deleted from your board.', 'info');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      });
    });
  };

  // --- Attendance Operations (Personal to Logged-in Student) ---
  const logAttendance = (entryData) => {
    const targetDate = entryData.date;
    const isPresent = entryData.status === 'present' || entryData.status === 'od';

    setAttendance((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      const existingIdx = safe.findIndex((r) => r.date === targetDate);
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
        const copy = [...safe];
        copy[existingIdx] = updatedRecord;
        return copy;
      } else {
        return [updatedRecord, ...safe];
      }
    });

    showToast('Attendance Logged', `Attendance for ${targetDate} recorded as ${entryData.status.toUpperCase()}.`, 'success');
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
    setAttendance((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((rec) => (rec.id === recordId ? { ...rec, ...updatedFields } : rec));
    });
    showToast('Record Updated', 'Attendance record modified.', 'info');
  };

  // Dynamic Attendance Stats (Specific to Logged-in Student)
  const attendanceStats = (() => {
    const safeAttendance = Array.isArray(attendance) ? attendance : [];
    const workingDays = safeAttendance.filter((r) => r.status !== 'weekend');
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

  // --- Internship Diary Operations (Personal to Logged-in Student) ---
  const addDiaryEntry = (entryData) => {
    const newEntry = {
      ...entryData,
      id: `diary-${Date.now()}`,
      tasksCompleted: Array.isArray(entryData.tasksCompleted)
        ? entryData.tasksCompleted
        : (entryData.tasksCompleted || '').split('\n').filter(Boolean)
    };
    setDiary((prev) => [newEntry, ...(Array.isArray(prev) ? prev : [])]);
    showToast('Diary Saved', 'Daily work log added to your internship diary.', 'success');
  };

  const updateDiaryEntry = (entryId, updatedFields) => {
    setDiary((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((e) =>
        e.id === entryId
          ? {
              ...e,
              ...updatedFields,
              tasksCompleted: Array.isArray(updatedFields.tasksCompleted)
                ? updatedFields.tasksCompleted
                : (updatedFields.tasksCompleted || '').split('\n').filter(Boolean)
            }
          : e
      );
    });
    showToast('Diary Updated', 'Diary record updated.', 'success');
  };

  const deleteDiaryEntry = (entryId) => {
    setDiary((prev) => (Array.isArray(prev) ? prev.filter((e) => e.id !== entryId) : []));
    showToast('Diary Removed', 'Diary record deleted.', 'info');
  };

  // --- Documents Operations (Personal to Logged-in Student) ---
  const addDocument = (docData) => {
    const safeProfile = profile || defaultDemoUser;
    const newDoc = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      status: docData.status || 'Verified',
      previewContent: docData.previewContent || {
        title: (docData.name || 'DOCUMENT').toUpperCase(),
        subtitle: `Internship Document - Category: ${docData.category}`,
        sections: [
          `File: ${docData.name}`,
          `Category: ${docData.category}`,
          `Uploaded: ${new Date().toLocaleDateString()}`,
          `Student: ${safeProfile.fullName} (${safeProfile.enrollmentNo})`,
          `College: ${safeProfile.collegeName}`
        ],
        watermark: 'OFFICIAL RECORD'
      }
    };
    setDocuments((prev) => [newDoc, ...(Array.isArray(prev) ? prev : [])]);
    showToast('Document Uploaded', `"${docData.name}" saved to your repository.`, 'success');
  };

  const deleteDocument = (docId) => {
    setDocuments((prev) => (Array.isArray(prev) ? prev.filter((d) => d.id !== docId) : []));
    showToast('Document Removed', 'Document deleted from your vault.', 'info');
  };

  // --- Notifications Operations (Personal to Logged-in Student) ---
  const markNotificationRead = (notifId) => {
    setNotifications((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((n) => (n.id === notifId ? { ...n, read: true } : n));
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => {
      const safe = Array.isArray(prev) ? prev : [];
      return safe.map((n) => ({ ...n, read: true }));
    });
    showToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  // --- Reset & Fresh Start Operations for THIS Student ---
  const clearAllDataToFresh = () => {
    setApplications([]);
    setTasks([]);
    setAttendance([]);
    setDiary([]);
    setDocuments([]);
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        title: 'Personal Workspace Cleared',
        message: 'Your personal dashboard is now completely fresh. Start adding your own tasks and attendance logs.',
        time: 'Just now',
        read: false,
        type: 'info'
      }
    ]);
    showToast('Workspace Cleared', 'All records cleared for this student account. Ready for fresh data!', 'info');
  };

  const resetDemoData = () => {
    setApplications(initialApplications);
    setTasks(initialTasks);
    setAttendance(initialAttendanceRecords);
    setDiary(initialDiaryEntries);
    setDocuments(initialDocuments);
    setNotifications(initialNotifications);
    showToast('Sample Records Loaded', 'Standard academic demonstration records loaded into your workspace.', 'info');
  };

  // Computed summary metrics for THIS logged-in student's Personal Dashboard
  const safeApps = Array.isArray(applications) ? applications : [];
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const safeDiary = Array.isArray(diary) ? diary : [];
  const safeDocs = Array.isArray(documents) ? documents : [];

  const metrics = {
    totalApplications: safeApps.length,
    activeInternships: safeApps.filter((a) => a.status === 'Selected').length,
    shortlistedApplications: safeApps.filter((a) => a.status === 'Shortlisted').length,
    underReviewApplications: safeApps.filter((a) => a.status === 'Under Review').length,
    completedTasks: safeTasks.filter((t) => t.status === 'Completed').length,
    pendingTasks: safeTasks.filter((t) => t.status !== 'Completed').length,
    totalTasks: safeTasks.length,
    taskCompletionRate:
      safeTasks.length > 0
        ? Math.round((safeTasks.filter((t) => t.status === 'Completed').length / safeTasks.length) * 100)
        : 0,
    attendanceRate: attendanceStats.percentage,
    totalDiaryEntries: safeDiary.length,
    totalDocuments: safeDocs.length
  };

  return (
    <AppContext.Provider
      value={{
        users: Array.isArray(users) ? users : [defaultDemoUser],
        currentUser: currentUser || defaultDemoUser,
        isLoggedIn: Boolean(isLoggedIn),
        setIsLoggedIn,
        registerUser,
        loginUser,
        logoutUser,
        profile: profile || defaultDemoUser,
        updateProfile,
        internships: Array.isArray(internships) ? internships : initialInternships,
        addInternship,
        applications: safeApps,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        tasks: safeTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        attendance: Array.isArray(attendance) ? attendance : [],
        attendanceStats,
        logAttendance,
        markTodayAttendance,
        updateAttendanceRecord,
        diary: safeDiary,
        addDiaryEntry,
        updateDiaryEntry,
        deleteDiaryEntry,
        documents: safeDocs,
        addDocument,
        deleteDocument,
        notifications: Array.isArray(notifications) ? notifications : [],
        markNotificationRead,
        markAllNotificationsRead,
        toasts: Array.isArray(toasts) ? toasts : [],
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
