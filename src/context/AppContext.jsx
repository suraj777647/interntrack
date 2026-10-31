import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialInternships } from '../data/demoData';
import { hashPassword } from '../utils/security';

const AppContext = createContext();

// Cleanup obsolete Aarav / demo data from LocalStorage
const cleanupLegacyDemoData = () => {
  try {
    const legacyKeys = [
      'interntrack_userdata_2021BTCS084',
      'interntrack_userdata_DEFAULT',
      'interntrack_userdata_USR-DEFAULT'
    ];
    legacyKeys.forEach((k) => localStorage.removeItem(k));

    // Remove legacy users if they contain Aarav or old test data
    const rawUsers = localStorage.getItem('interntrack_users');
    if (rawUsers && (rawUsers.includes('Aarav') || rawUsers.includes('2021BTCS084') || rawUsers.includes('Suraj'))) {
      localStorage.removeItem('interntrack_users');
    }

    const rawCurrent = localStorage.getItem('interntrack_current_user');
    if (rawCurrent && (rawCurrent.includes('Aarav') || rawCurrent.includes('2021BTCS084') || rawCurrent.includes('Suraj'))) {
      localStorage.removeItem('interntrack_current_user');
      localStorage.removeItem('interntrack_is_logged_in');
    }

    // Clean any legacy keys containing Aarav
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('interntrack_userdata_') || k.startsWith('interntrack_data_'))) {
        const val = localStorage.getItem(k);
        if (val && (val.includes('Aarav') || val.includes('2021BTCS084'))) {
          keysToRemove.push(k);
        }
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.warn('Legacy data cleanup error:', err);
  }
};

export const AppProvider = ({ children }) => {
  // Execute legacy cleanup once on startup
  useEffect(() => {
    cleanupLegacyDemoData();
  }, []);

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

  // Helper: Get user storage key
  const getUserStorageKey = (userId) => {
    return `interntrack_data_${userId}`;
  };

  // Helper: Build default clean data for a new student
  const createDefaultUserData = (account) => {
    const safeName = account.fullName || 'Student';
    return {
      profile: {
        id: account.id,
        fullName: safeName,
        email: account.email,
        phone: account.phone || '',
        collegeName: account.collegeName || '',
        universityName: account.universityName || 'State Technological University',
        degree: account.degree || 'Bachelor of Technology (B.Tech)',
        branch: account.branch || 'Computer Science & Engineering',
        semester: account.semester || '7th Semester',
        graduationYear: account.graduationYear || '2026',
        enrollmentNo: `SIP-${account.id.slice(-4).toUpperCase()}`,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(safeName)}&backgroundColor=2563eb`,
        currentInternship: 'Not Assigned',
        mentorName: 'Faculty Guide',
        industryMentor: 'Industry Lead',
        skills: [],
        careerInterests: [],
        bio: `Student at ${account.collegeName || 'College'}. Maintaining internship records for B.Tech Summer Internship Program (SIP).`,
        cgpa: '',
        socialLinks: { github: '', linkedin: '', portfolio: '' }
      },
      applications: [],
      tasks: [],
      attendance: [],
      diary: [],
      documents: [],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `Welcome, ${safeName}! 🎓`,
          message: 'Your personal internship management portal is ready. You can explore sample listings, submit applications, manage tasks, and log daily attendance.',
          time: 'Just now',
          read: false,
          type: 'info'
        }
      ]
    };
  };

  // --- 1. Registered Student Accounts ---
  const [accounts, setAccounts] = useState(() => {
    const stored = loadStored('interntrack_accounts', []);
    return Array.isArray(stored) ? stored : [];
  });

  // --- 2. Active Session ---
  const [session, setSession] = useState(() => {
    return loadStored('interntrack_session', null);
  });

  // Derived current account based on session
  const activeAccount = useMemo(() => {
    if (!session || !session.userId) return null;
    return accounts.find((a) => a.id === session.userId) || null;
  }, [session, accounts]);

  const isLoggedIn = Boolean(activeAccount);

  // --- 3. Current User's Personal Workspace State ---
  const [profile, setProfile] = useState(() => {
    if (!activeAccount) return null;
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return saved?.profile || createDefaultUserData(activeAccount).profile;
  });

  const [applications, setApplications] = useState(() => {
    if (!activeAccount) return [];
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return Array.isArray(saved?.applications) ? saved.applications : [];
  });

  const [tasks, setTasks] = useState(() => {
    if (!activeAccount) return [];
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return Array.isArray(saved?.tasks) ? saved.tasks : [];
  });

  const [attendance, setAttendance] = useState(() => {
    if (!activeAccount) return [];
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return Array.isArray(saved?.attendance) ? saved.attendance : [];
  });

  const [diary, setDiary] = useState(() => {
    if (!activeAccount) return [];
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return Array.isArray(saved?.diary) ? saved.diary : [];
  });

  const [documents, setDocuments] = useState(() => {
    if (!activeAccount) return [];
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return Array.isArray(saved?.documents) ? saved.documents : [];
  });

  const [notifications, setNotifications] = useState(() => {
    if (!activeAccount) return [];
    const key = getUserStorageKey(activeAccount.id);
    const saved = loadStored(key, null);
    return Array.isArray(saved?.notifications) ? saved.notifications : [];
  });

  // --- 4. Global Sample Internships Directory ---
  const [internships, setInternships] = useState(() => {
    const loaded = loadStored('interntrack_sample_internships', initialInternships);
    return Array.isArray(loaded) && loaded.length > 0 ? loaded : initialInternships;
  });

  // --- 5. Global UI States ---
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync accounts to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('interntrack_accounts', JSON.stringify(accounts));
    } catch (e) {}
  }, [accounts]);

  // Sync session to LocalStorage
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem('interntrack_session', JSON.stringify(session));
      } else {
        localStorage.removeItem('interntrack_session');
      }
    } catch (e) {}
  }, [session]);

  // Sync sample internships
  useEffect(() => {
    try {
      localStorage.setItem('interntrack_sample_internships', JSON.stringify(internships));
    } catch (e) {}
  }, [internships]);

  // Save personal student data to LocalStorage under user-specific key
  useEffect(() => {
    if (activeAccount && activeAccount.id && profile) {
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
        localStorage.setItem(getUserStorageKey(activeAccount.id), JSON.stringify(personalData));
      } catch (e) {
        console.warn('Error saving user data:', e);
      }
    }
  }, [activeAccount, profile, applications, tasks, attendance, diary, documents, notifications]);

  // Load a user's data into active React state
  const loadUserDataIntoState = (account, userData) => {
    setProfile(userData.profile || createDefaultUserData(account).profile);
    setApplications(Array.isArray(userData.applications) ? userData.applications : []);
    setTasks(Array.isArray(userData.tasks) ? userData.tasks : []);
    setAttendance(Array.isArray(userData.attendance) ? userData.attendance : []);
    setDiary(Array.isArray(userData.diary) ? userData.diary : []);
    setDocuments(Array.isArray(userData.documents) ? userData.documents : []);
    setNotifications(Array.isArray(userData.notifications) ? userData.notifications : []);
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
  const registerUser = async (signupData) => {
    const email = (signupData.email || '').trim().toLowerCase();
    const fullName = (signupData.fullName || '').trim();
    const phone = (signupData.phone || '').trim();
    const collegeName = (signupData.collegeName || '').trim();
    const password = signupData.password || '';

    if (!email || !fullName || !collegeName || !password) {
      showToast('Validation Error', 'Please fill in all mandatory fields.', 'error');
      return { success: false, message: 'Mandatory fields missing' };
    }

    const existing = accounts.find((a) => a.email.toLowerCase() === email);
    if (existing) {
      showToast('Account Exists', 'An account with this email is already registered. Please sign in.', 'error');
      return { success: false, message: 'Email already registered' };
    }

    const passwordHash = await hashPassword(password);
    const newAccount = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      fullName,
      phone,
      collegeName,
      branch: signupData.branch || 'Computer Science & Engineering',
      semester: signupData.semester || '7th Semester',
      graduationYear: signupData.graduationYear || '2026',
      passwordHash,
      createdAt: new Date().toISOString()
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    try {
      localStorage.setItem('interntrack_accounts', JSON.stringify(updatedAccounts));
    } catch (e) {}

    // Initialize user personal data
    const initialData = createDefaultUserData(newAccount);
    try {
      localStorage.setItem(getUserStorageKey(newAccount.id), JSON.stringify(initialData));
    } catch (e) {}

    // Set active session
    const newSession = {
      userId: newAccount.id,
      email: newAccount.email,
      loginTime: new Date().toISOString()
    };
    setSession(newSession);
    try {
      localStorage.setItem('interntrack_session', JSON.stringify(newSession));
    } catch (e) {}

    // Load state
    loadUserDataIntoState(newAccount, initialData);

    showToast('Registration Successful', `Welcome, ${newAccount.fullName}! Your personal workspace is ready.`, 'success');
    return { success: true, user: newAccount };
  };

  const loginUser = async (emailInput, passwordInput) => {
    const email = (emailInput || '').trim().toLowerCase();
    const password = (passwordInput || '').trim();

    if (!email || !password) {
      showToast('Validation Error', 'Please enter both email and password.', 'error');
      return { success: false, message: 'Missing credentials' };
    }

    const account = accounts.find((a) => a.email.toLowerCase() === email);
    if (!account) {
      showToast('Authentication Error', 'No student account found with this email. Please create an account.', 'error');
      return { success: false, message: 'Account not found' };
    }

    const inputHash = await hashPassword(password);
    if (account.passwordHash !== inputHash) {
      showToast('Authentication Error', 'Invalid password. Please check your password and try again.', 'error');
      return { success: false, message: 'Invalid password' };
    }

    // Load this student's isolated personal data
    const key = getUserStorageKey(account.id);
    const saved = loadStored(key, null);
    const userData = saved || createDefaultUserData(account);

    const newSession = {
      userId: account.id,
      email: account.email,
      loginTime: new Date().toISOString()
    };
    setSession(newSession);
    try {
      localStorage.setItem('interntrack_session', JSON.stringify(newSession));
    } catch (e) {}

    loadUserDataIntoState(account, userData);

    showToast('Login Successful', `Welcome back, ${account.fullName}!`, 'success');
    return { success: true, user: account };
  };

  const logoutUser = () => {
    try {
      localStorage.removeItem('interntrack_session');
    } catch (e) {}

    setSession(null);
    setProfile(null);
    setApplications([]);
    setTasks([]);
    setAttendance([]);
    setDiary([]);
    setDocuments([]);
    setNotifications([]);

    showToast('Signed Out', 'You have been signed out of your student session.', 'info');
  };

  // --- Profile Operations (Personal) ---
  const updateProfile = (updatedFields) => {
    if (!profile) return;
    const updated = { ...profile, ...updatedFields };
    setProfile(updated);

    // Update corresponding info in accounts registry if core fields changed
    if (updatedFields.fullName || updatedFields.collegeName || updatedFields.phone || updatedFields.branch || updatedFields.semester) {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === profile.id
            ? {
                ...acc,
                fullName: updated.fullName || acc.fullName,
                collegeName: updated.collegeName || acc.collegeName,
                phone: updated.phone || acc.phone,
                branch: updated.branch || acc.branch,
                semester: updated.semester || acc.semester
              }
            : acc
        )
      );
    }

    showToast('Profile Updated', 'Student profile details successfully updated.', 'success');
  };

  // --- Internships Directory (Global Sample & Custom) ---
  const addInternship = (intData) => {
    const newInt = {
      ...intData,
      id: `int-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      logoText: (intData.company || 'CO').substring(0, 2).toUpperCase(),
      logoColor: '#2563eb',
      isSample: false,
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
      status: newApp.status || 'Pending',
      statusHistory: [
        {
          status: newApp.status || 'Pending',
          date: new Date().toISOString().split('T')[0],
          note: 'Application submitted successfully through student portal.'
        }
      ]
    };

    setApplications((prev) => [appWithId, ...(Array.isArray(prev) ? prev : [])]);
    showToast('Application Submitted', `Applied for ${appWithId.title} at ${appWithId.company}.`, 'success');
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
  const attendanceStats = useMemo(() => {
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
  }, [attendance]);

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
    const safeFullName = profile?.fullName || 'Student';
    const safeEnrollment = profile?.enrollmentNo || 'SIP-2026';
    const safeCollege = profile?.collegeName || 'Engineering College';

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
          `Student: ${safeFullName} (${safeEnrollment})`,
          `College: ${safeCollege}`
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

  // Reset current student's personal workspace to clean empty state
  const clearAllDataToFresh = () => {
    setApplications([]);
    setTasks([]);
    setAttendance([]);
    setDiary([]);
    setDocuments([]);
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        title: 'Workspace Cleared',
        message: 'Your personal dashboard has been reset. Start adding your own tasks and attendance logs.',
        time: 'Just now',
        read: false,
        type: 'info'
      }
    ]);
    showToast('Workspace Cleared', 'All records cleared for your student account.', 'info');
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
        users: accounts,
        accounts,
        currentUser: activeAccount,
        isLoggedIn,
        registerUser,
        loginUser,
        logoutUser,
        profile: profile || activeAccount,
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
