// Demo data for InternTrack - Smart Internship Management System (B.Tech 7th Sem SIP)

export const initialStudentProfile = {
  fullName: "Aarav Sharma",
  email: "aarav.sharma@apex.edu.in",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  collegeName: "Apex Institute of Technology & Management",
  universityName: "State Technological University (STU)",
  enrollmentNo: "2021BTCS084",
  degree: "Bachelor of Technology (B.Tech)",
  branch: "Computer Science & Engineering",
  semester: "7th Semester",
  graduationYear: "2025",
  academicYear: "2024 - 2025",
  cgpa: "8.78 / 10.0",
  currentInternship: "Frontend Web Developer Intern @ CloudScale Tech",
  mentorName: "Dr. Rajesh Verma (Faculty Guide)",
  industryMentor: "Vikram Malhotra (Senior Staff Engineer)",
  bio: "Pre-final B.Tech Computer Science student with a keen interest in modern React ecosystem, scalable UI/UX design systems, and frontend state architectures. Currently executing Summer Internship Program (SIP) project.",
  skills: [
    "React.js",
    "JavaScript (ES6+)",
    "HTML5 / CSS3",
    "Tailwind CSS",
    "REST APIs",
    "Git & GitHub",
    "Node.js Basics",
    "Vite",
    "UI/UX Design",
    "SQL"
  ],
  careerInterests: [
    "Frontend Engineering",
    "Full Stack Development",
    "Product Design",
    "Cloud Applications"
  ],
  socialLinks: {
    github: "https://github.com/aaravsharma-sip",
    linkedin: "https://linkedin.com/in/aarav-sharma-btech",
    portfolio: "https://aaravsharma.dev"
  }
};

export const initialInternships = [
  {
    id: "int-1",
    title: "Frontend React Developer Intern",
    company: "CloudScale Technologies",
    logoText: "CS",
    logoColor: "#2563EB",
    location: "Bangalore (Remote Available)",
    workMode: "Remote",
    category: "Web Development",
    duration: "6 Months",
    stipend: "₹25,000 / month",
    stipendAmount: 25000,
    openings: 4,
    deadline: "2026-11-20",
    postedDate: "2026-10-15",
    experienceLevel: "Fresher / Student",
    description: "CloudScale Technologies is looking for an enthusiastic Frontend Developer intern to assist in building next-generation SaaS dashboards, optimizing web vitals, and implementing responsive UI components with React.",
    responsibilities: [
      "Develop reusable, high-performance React components using hooks and modern patterns.",
      "Collaborate with the UX team to translate Figma designs into pixel-perfect code.",
      "Integrate client-side REST APIs and manage local cache states.",
      "Write modular, documented, and accessible CSS and JavaScript."
    ],
    requirements: [
      "Proficiency in React.js, JavaScript (ES6+), HTML5, and CSS3.",
      "Familiarity with Git, component lifecycles, and responsive design principles.",
      "Strong problem-solving ability and academic standing in 6th/7th semester B.Tech/B.E."
    ],
    perks: [
      "Pre-Placement Offer (PPO) opportunity based on evaluation",
      "Flexible working hours & remote setup",
      "Internship completion certificate & mentorship"
    ]
  },
  {
    id: "int-2",
    title: "AI & Machine Learning Intern",
    company: "NeuralMind Analytics",
    logoText: "NM",
    logoColor: "#7C3AED",
    location: "Hyderabad",
    workMode: "Hybrid",
    category: "AI / ML",
    duration: "3 Months",
    stipend: "₹22,000 / month",
    stipendAmount: 22000,
    openings: 2,
    deadline: "2026-11-25",
    postedDate: "2026-10-18",
    experienceLevel: "Fresher / Student",
    description: "Work alongside senior data scientists on predictive modeling, NLP pipelines, and interactive analytics dashboards for healthcare and enterprise clients.",
    responsibilities: [
      "Clean, preprocess, and analyze real-world datasets using Pandas and NumPy.",
      "Assist in training machine learning models using Scikit-Learn and PyTorch.",
      "Build interactive dashboard prototypes to visualize model predictions.",
      "Document experimental results for weekly research reviews."
    ],
    requirements: [
      "Solid foundation in Python programming and statistics.",
      "Hands-on exposure to Scikit-Learn, Pandas, and data visualization libraries.",
      "Enthusiasm for generative AI and exploratory data analysis."
    ],
    perks: [
      "Access to high-compute GPU clusters",
      "Direct guidance from PhD research mentors",
      "Certificate of Excellence"
    ]
  },
  {
    id: "int-3",
    title: "UI/UX & Product Design Intern",
    company: "PixelCraft Studios",
    logoText: "PC",
    logoColor: "#EC4899",
    location: "Mumbai",
    workMode: "Remote",
    category: "UI / UX Design",
    duration: "2 Months",
    stipend: "₹18,000 / month",
    stipendAmount: 18000,
    openings: 3,
    deadline: "2026-11-18",
    postedDate: "2026-10-20",
    experienceLevel: "Fresher / Student",
    description: "Join PixelCraft to design user flows, wireframes, and high-fidelity interactive prototypes for fintech and e-commerce mobile applications.",
    responsibilities: [
      "Create high-fidelity wireframes and interactive prototypes in Figma.",
      "Conduct user research surveys and competitive design benchmark studies.",
      "Maintain design systems, typography hierarchies, and iconography libraries.",
      "Coordinate with engineering teams during design handoffs."
    ],
    requirements: [
      "Proficient in Figma, auto-layout, components, and design systems.",
      "Strong visual sense for typography, color theory, and micro-interactions.",
      "Portfolio showcasing student projects or case studies."
    ],
    perks: [
      "Paid Figma enterprise license",
      "Design portfolio reviews with senior creative directors",
      "Flexible schedule"
    ]
  },
  {
    id: "int-4",
    title: "Full Stack MERN Developer Intern",
    company: "NextGen FinTech Solutions",
    logoText: "NG",
    logoColor: "#059669",
    location: "Delhi NCR",
    workMode: "Hybrid",
    category: "Web Development",
    duration: "6 Months",
    stipend: "₹30,000 / month",
    stipendAmount: 30000,
    openings: 5,
    deadline: "2026-11-30",
    postedDate: "2026-10-12",
    experienceLevel: "Fresher / Student",
    description: "NextGen FinTech is looking for proactive full stack interns to architect microservices, build real-time transaction dashboards, and assist with API integrations.",
    responsibilities: [
      "Build RESTful APIs in Node.js and Express.",
      "Design MongoDB schemas and query aggregations.",
      "Construct responsive client interfaces in React and state managers.",
      "Conduct code reviews and write unit tests."
    ],
    requirements: [
      "Understanding of React, Node.js, Express, and MongoDB.",
      "Knowledge of authentication mechanisms (JWT, session storage).",
      "Good understanding of asynchronous JavaScript and promises."
    ],
    perks: [
      "High stipend with performance bonus",
      "Fast-track full-time offer (FTE) opportunity",
      "Hybrid workspace allowance"
    ]
  },
  {
    id: "int-5",
    title: "Cloud Infrastructure & DevOps Intern",
    company: "SkyNet Systems",
    logoText: "SN",
    logoColor: "#0284C7",
    location: "Pune",
    workMode: "On-site",
    category: "Cloud & DevOps",
    duration: "6 Months",
    stipend: "₹24,000 / month",
    stipendAmount: 24000,
    openings: 2,
    deadline: "2026-12-05",
    postedDate: "2026-10-22",
    experienceLevel: "Fresher / Student",
    description: "Work on cloud containerization, CI/CD pipeline automation, and cloud infrastructure monitoring using modern DevOps tooling.",
    responsibilities: [
      "Containerize microservices using Docker and Docker Compose.",
      "Assist in configuring GitHub Actions CI/CD workflows.",
      "Monitor system health and cloud resource utilization metrics.",
      "Learn and apply Infrastructure as Code principles."
    ],
    requirements: [
      "Familiarity with Linux command line and shell scripting.",
      "Basic understanding of Docker containers and networking.",
      "Curiosity about AWS/GCP cloud environments."
    ],
    perks: [
      "Free AWS certification sponsorship",
      "On-site cafeteria and recreation facilities",
      "Formal industrial internship certificate"
    ]
  },
  {
    id: "int-6",
    title: "Mobile App Developer (React Native) Intern",
    company: "AppVibe Mobility",
    logoText: "AV",
    logoColor: "#F59E0B",
    location: "Bangalore",
    workMode: "Remote",
    category: "Mobile Development",
    duration: "3 Months",
    stipend: "₹20,000 / month",
    stipendAmount: 20000,
    openings: 3,
    deadline: "2026-11-28",
    postedDate: "2026-10-24",
    experienceLevel: "Fresher / Student",
    description: "Help build cross-platform mobile apps for iOS and Android using React Native, native module bridges, and smooth fluid animations.",
    responsibilities: [
      "Build cross-platform mobile interfaces in React Native.",
      "Integrate RESTful backend endpoints and mobile push notifications.",
      "Optimize mobile app launch time and memory footprint.",
      "Test apps on multiple screen form factors."
    ],
    requirements: [
      "Knowledge of React or React Native fundamentals.",
      "Familiarity with mobile UI guidelines (Material / iOS Human Interface).",
      "Basic understanding of Android Studio or Xcode simulator setup."
    ],
    perks: [
      "Device allowance for testing hardware",
      "Direct code reviews with mobile architect",
      "Certificate of Internship"
    ]
  },
  {
    id: "int-7",
    title: "Cyber Security & Compliance Intern",
    company: "Fortress Cyberlabs",
    logoText: "FC",
    logoColor: "#DC2626",
    location: "Gurugram",
    workMode: "On-site",
    category: "Cyber Security",
    duration: "3 Months",
    stipend: "₹22,000 / month",
    stipendAmount: 22000,
    openings: 2,
    deadline: "2026-12-08",
    postedDate: "2026-10-25",
    experienceLevel: "Fresher / Student",
    description: "Assist cybersecurity analysts in vulnerability assessments, penetration testing simulated labs, and ISO 27001 compliance documentation.",
    responsibilities: [
      "Run automated vulnerability scanning tools and report findings.",
      "Assist in auditing application security posture against OWASP Top 10.",
      "Participate in threat modeling sessions and incident response drills.",
      "Maintain security compliance checklists for audits."
    ],
    requirements: [
      "Understanding of TCP/IP, OSI model, and web protocol fundamentals.",
      "Familiarity with Wireshark, Burp Suite, or Nmap tools.",
      "Passion for defensive cybersecurity and ethical hacking."
    ],
    perks: [
      "Cybersecurity lab access and challenge badges",
      "Mentorship from certified ethical hackers (CEH)",
      "Official internship certificate"
    ]
  },
  {
    id: "int-8",
    title: "Data Analytics & Business Intelligence Intern",
    company: "QuantMetrics Labs",
    logoText: "QM",
    logoColor: "#0D9488",
    location: "Chennai",
    workMode: "Hybrid",
    category: "Data Science",
    duration: "4 Months",
    stipend: "₹26,000 / month",
    stipendAmount: 26000,
    openings: 4,
    deadline: "2026-11-22",
    postedDate: "2026-10-19",
    experienceLevel: "Fresher / Student",
    description: "Turn raw business data into actionable visual insights by creating SQL data pipelines, Power BI dashboards, and cohort retention analyses.",
    responsibilities: [
      "Write optimized SQL queries and joins across relational databases.",
      "Develop executive dashboards in Power BI and Tableau.",
      "Calculate key student and user engagement metrics.",
      "Automate recurring weekly analytics report generation."
    ],
    requirements: [
      "Strong SQL proficiency (Subqueries, Window functions, Joins).",
      "Knowledge of Power BI, Excel, or Python for analytics.",
      "Clear communication skills to articulate data findings."
    ],
    perks: [
      "Real-world enterprise data exposure",
      "Recommendation letter from Chief Data Officer",
      "Hybrid stipend support"
    ]
  }
];

export const initialApplications = [
  {
    id: "app-101",
    internshipId: "int-1",
    title: "Frontend React Developer Intern",
    company: "CloudScale Technologies",
    appliedDate: "2026-10-16",
    status: "Selected",
    stipend: "₹25,000 / month",
    workMode: "Remote",
    location: "Bangalore",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu.in",
    candidatePhone: "+91 98765 43210",
    college: "Apex Institute of Technology & Management",
    course: "B.Tech Computer Science & Engineering (7th Sem)",
    skills: "React.js, JavaScript, Tailwind CSS, HTML5, Git",
    resumeFileName: "Resume_Aarav_Sharma_v3.pdf",
    coverLetter: "I am excited to apply for the Frontend React Developer Internship. Having built several full-featured React applications with responsive UI design, I look forward to contributing effectively to CloudScale's SaaS products during my 7th semester SIP.",
    statusHistory: [
      { status: "Pending", date: "2026-10-16", note: "Application submitted successfully." },
      { status: "Under Review", date: "2026-10-18", note: "Profile screened by HR technical team." },
      { status: "Shortlisted", date: "2026-10-21", note: "Selected for Technical Round & Coding Interview." },
      { status: "Selected", date: "2026-10-25", note: "Offer letter released! Summer internship confirmed." }
    ]
  },
  {
    id: "app-102",
    internshipId: "int-4",
    title: "Full Stack MERN Developer Intern",
    company: "NextGen FinTech Solutions",
    appliedDate: "2026-10-19",
    status: "Shortlisted",
    stipend: "₹30,000 / month",
    workMode: "Hybrid",
    location: "Delhi NCR",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu.in",
    candidatePhone: "+91 98765 43210",
    college: "Apex Institute of Technology & Management",
    course: "B.Tech Computer Science & Engineering (7th Sem)",
    skills: "React.js, Node.js, Express, MongoDB, REST APIs",
    resumeFileName: "Resume_Aarav_Sharma_v3.pdf",
    coverLetter: "My experience in building REST APIs with Express alongside interactive React frontends aligns with your fintech requirements.",
    statusHistory: [
      { status: "Pending", date: "2026-10-19", note: "Application submitted." },
      { status: "Under Review", date: "2026-10-22", note: "Resume shortlisted by hiring committee." },
      { status: "Shortlisted", date: "2026-10-26", note: "Invited to virtual machine coding test." }
    ]
  },
  {
    id: "app-103",
    internshipId: "int-2",
    title: "AI & Machine Learning Intern",
    company: "NeuralMind Analytics",
    appliedDate: "2026-10-21",
    status: "Under Review",
    stipend: "₹22,000 / month",
    workMode: "Hybrid",
    location: "Hyderabad",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu.in",
    candidatePhone: "+91 98765 43210",
    college: "Apex Institute of Technology & Management",
    course: "B.Tech Computer Science & Engineering (7th Sem)",
    skills: "Python, Pandas, Scikit-Learn, React",
    resumeFileName: "Resume_Aarav_Sharma_v3.pdf",
    coverLetter: "Interested in applying machine learning models to healthcare analytics and building interactive dashboard interfaces.",
    statusHistory: [
      { status: "Pending", date: "2026-10-21", note: "Application registered." },
      { status: "Under Review", date: "2026-10-24", note: "Candidate portfolio currently under review." }
    ]
  },
  {
    id: "app-104",
    internshipId: "int-3",
    title: "UI/UX & Product Design Intern",
    company: "PixelCraft Studios",
    appliedDate: "2026-10-24",
    status: "Pending",
    stipend: "₹18,000 / month",
    workMode: "Remote",
    location: "Mumbai",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu.in",
    candidatePhone: "+91 98765 43210",
    college: "Apex Institute of Technology & Management",
    course: "B.Tech Computer Science & Engineering (7th Sem)",
    skills: "Figma, Design Systems, HTML/CSS, Wireframing",
    resumeFileName: "Resume_Aarav_Sharma_v3.pdf",
    coverLetter: "Keen to apply component design patterns and usability research to digital products.",
    statusHistory: [
      { status: "Pending", date: "2026-10-24", note: "Application received. Awaiting review queue." }
    ]
  },
  {
    id: "app-105",
    internshipId: "int-7",
    title: "Cyber Security & Compliance Intern",
    company: "Fortress Cyberlabs",
    appliedDate: "2026-10-10",
    status: "Rejected",
    stipend: "₹22,000 / month",
    workMode: "On-site",
    location: "Gurugram",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu.in",
    candidatePhone: "+91 98765 43210",
    college: "Apex Institute of Technology & Management",
    course: "B.Tech Computer Science & Engineering (7th Sem)",
    skills: "Network Security, Linux, OWASP",
    resumeFileName: "Resume_Aarav_Sharma_v3.pdf",
    coverLetter: "Seeking hands-on exposure to network auditing and vulnerability assessments.",
    statusHistory: [
      { status: "Pending", date: "2026-10-10", note: "Application submitted." },
      { status: "Under Review", date: "2026-10-12", note: "Reviewed by hiring team." },
      { status: "Rejected", date: "2026-10-14", note: "Position filled by final-year candidate with CEH certification." }
    ]
  }
];

export const initialTasks = [
  {
    id: "task-1",
    title: "Build Responsive Sidebar & Navbar Components",
    description: "Design modular sidebar with active route highlights and top navbar with student avatar, notification dropdown, and search.",
    dueDate: "2026-10-28",
    priority: "High",
    category: "Development",
    status: "Completed",
    createdAt: "2026-10-26"
  },
  {
    id: "task-2",
    title: "Integrate LocalStorage State Persistence Engine",
    description: "Create centralized React Context state hook to persist student profile, tasks, diary logs, and applications across reloads.",
    dueDate: "2026-10-29",
    priority: "High",
    category: "Development",
    status: "Completed",
    createdAt: "2026-10-27"
  },
  {
    id: "task-3",
    title: "Submit 7th Sem SIP Weekly Progress Log #4",
    description: "Summarize weekly development outcomes and gather faculty guide feedback for Week 4 SIP evaluation dossier.",
    dueDate: "2026-11-02",
    priority: "Medium",
    category: "Documentation",
    status: "Pending",
    createdAt: "2026-10-28"
  },
  {
    id: "task-4",
    title: "Implement Attendance Percentage & Calendar View",
    description: "Calculate present/absent/leave ratios dynamically and render color-coded calendar dates with working hours notes.",
    dueDate: "2026-10-30",
    priority: "Medium",
    category: "Development",
    status: "Completed",
    createdAt: "2026-10-28"
  },
  {
    id: "task-5",
    title: "Conduct Client-side Form Validation on Application Form",
    description: "Ensure mandatory fields, valid email regex, 10-digit phone number check, and resume upload simulation give instant user feedback.",
    dueDate: "2026-10-31",
    priority: "High",
    category: "Development",
    status: "Completed",
    createdAt: "2026-10-29"
  },
  {
    id: "task-6",
    title: "Draft Mid-Term SIP Presentation Slides (PPT)",
    description: "Create 12-slide presentation covering Project Scope, Architecture, Tech Stack, UI Walkthrough, and Evaluation Metrics.",
    dueDate: "2026-11-04",
    priority: "High",
    category: "Presentation",
    status: "Pending",
    createdAt: "2026-10-30"
  },
  {
    id: "task-7",
    title: "Perform Cross-Browser & Mobile Viewport Testing",
    description: "Verify responsive drawer menu, touch targets, modal dialogs, and table horizontal overflows on mobile and tablet screens.",
    dueDate: "2026-11-05",
    priority: "Medium",
    category: "Testing",
    status: "Pending",
    createdAt: "2026-10-30"
  },
  {
    id: "task-8",
    title: "Consult Faculty Mentor on Internship Certificate Submission",
    description: "Clarify university format guidelines for company seal, mentor sign-off, and final viva date schedule.",
    dueDate: "2026-11-07",
    priority: "Low",
    category: "Academic",
    status: "Pending",
    createdAt: "2026-10-31"
  }
];

// Helper to generate calendar attendance for October 2026
const generateDemoAttendanceRecords = () => {
  const records = [];
  const totalDays = 31;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let day = 1; day <= totalDays; day++) {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const dateStr = `2026-10-${dayStr}`;
    const dateObj = new Date(2026, 9, day); // Month 9 is October (0-indexed)
    const dayOfWeek = dateObj.getDay();
    const dayName = dayNames[dayOfWeek];

    let status = "present";
    let checkIn = "09:15 AM";
    let checkOut = "05:45 PM";
    let workingHours = "8.5 hrs";
    let note = "Daily sprint standup & development tasks completed.";

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = "weekend";
      checkIn = "-";
      checkOut = "-";
      workingHours = "0 hrs";
      note = "Weekend - No scheduled internship hours.";
    } else if (day === 7) {
      status = "absent";
      checkIn = "-";
      checkOut = "-";
      workingHours = "0 hrs";
      note = "Unplanned medical absence - sick leave regularized.";
    } else if (day === 16 || day === 23) {
      status = "leave";
      checkIn = "-";
      checkOut = "-";
      workingHours = "0 hrs";
      note = day === 16 ? "Approved college mid-semester exam leave." : "Festive holiday approved by mentor.";
    } else if (day === 31) {
      // Current day
      status = "present";
      checkIn = "09:05 AM";
      checkOut = "In Progress";
      workingHours = "Active";
      note = "Working on B.Tech SIP Frontend Module Integration.";
    }

    records.push({
      id: `att-2026-10-${dayStr}`,
      date: dateStr,
      day: dayName,
      dayNumber: day,
      status,
      checkIn,
      checkOut,
      workingHours,
      note
    });
  }
  return records;
};

export const initialAttendanceRecords = generateDemoAttendanceRecords();

export const initialDiaryEntries = [
  {
    id: "diary-1",
    date: "2026-10-31",
    title: "Sprint Planning & Dashboard Component Modularization",
    hoursLogged: 8,
    category: "Development",
    workDescription: "Participated in the morning sprint sync with the engineering lead. Analyzed dashboard performance bottlenecks and refactored state management to avoid unnecessary re-renders in analytics cards.",
    tasksCompleted: [
      "Modularized navigation drawer and active tab indicators.",
      "Synchronized LocalStorage state with React Context provider.",
      "Added toast notification feedback on task operations."
    ],
    skillsLearned: "Advanced React Context composition, CSS custom properties, LocalStorage serialization.",
    challengesFaced: "Preventing layout flicker during dynamic viewport resize between mobile and desktop.",
    learningOutcomes: "Learned how to design clean UI boundaries that scale smoothly without introducing external heavyweight dependencies.",
    mentorNotes: "Good progress on component modularity. Ensure cross-device testing is thorough."
  },
  {
    id: "diary-2",
    date: "2026-10-30",
    title: "Form Validation & Application Workflow Pipeline",
    hoursLogged: 7.5,
    category: "Development",
    workDescription: "Implemented client-side input validations for internship application submissions. Constructed simulated resume upload preview with file size verification and regex validation.",
    tasksCompleted: [
      "Engineered validation algorithms for 10-digit Indian phone numbers and academic emails.",
      "Created application success modal dialog with confetti effect.",
      "Connected new submissions to update dashboard application metrics."
    ],
    skillsLearned: "JavaScript Regular Expressions, form accessibility (ARIA labels), UX error recovery states.",
    challengesFaced: "Handling mock file objects in browser local storage safely without hitting storage quotas.",
    learningOutcomes: "Understood best practices for serializing simulated metadata rather than large binary payloads in client storage.",
    mentorNotes: "Clean form UX. Very intuitive error prompts."
  },
  {
    id: "diary-3",
    date: "2026-10-29",
    title: "Attendance Engine & Data Visualizations",
    hoursLogged: 8,
    category: "Analytics",
    workDescription: "Built attendance calculation logic that computes present, absent, and leave ratios. Designed a responsive calendar grid component highlighting monthly attendance records.",
    tasksCompleted: [
      "Computed dynamic attendance percentage with 75% college mandatory threshold indicator.",
      "Rendered interactive calendar days with color-coded status badges.",
      "Integrated Recharts bar graph for weekly working hours distribution."
    ],
    skillsLearned: "Date manipulation in vanilla JavaScript, Recharts responsive containers.",
    challengesFaced: "Handling first-day-of-month day-of-week offsets for calendar layout alignment.",
    learningOutcomes: "Mastered CSS Grid calendar patterns and date formatting standards.",
    mentorNotes: "The visual calendar and attendance health indicator are very well done."
  },
  {
    id: "diary-4",
    date: "2026-10-28",
    title: "Internship Explorer Search & Multi-Filter Query Engine",
    hoursLogged: 8,
    category: "Frontend",
    workDescription: "Constructed search and filtering logic for internship listings. Allowed users to filter simultaneously by job role category, work mode (Remote/Hybrid/On-site), and duration.",
    tasksCompleted: [
      "Developed debounced search input for title and company matching.",
      "Implemented filter chip pills with clear-all functionality.",
      "Built internship detail modal with responsibilities, perks, and direct Apply button."
    ],
    skillsLearned: "Array filtering pipelines in JavaScript, modal accessibility, keyboard Esc traps.",
    challengesFaced: "Combining multi-criteria filter predicates without mutating raw data collections.",
    learningOutcomes: "Learned pure function array pipelines for snappy client-side search.",
    mentorNotes: "Search feels instantaneous. Good job on the badge colors."
  },
  {
    id: "diary-5",
    date: "2026-10-27",
    title: "Document Vault & Academic Asset Organization",
    hoursLogged: 7,
    category: "Documentation",
    workDescription: "Constructed the Documents Management module to organize Offer Letters, Joining Reports, Certificates, and Mid-Term Presentations required for B.Tech SIP submission.",
    tasksCompleted: [
      "Created document categorization cards with download and delete controls.",
      "Implemented realistic academic document preview viewer modal.",
      "Added document upload simulation with simulated progress bar."
    ],
    skillsLearned: "Browser File API, Modal layout architectures, SVG file icons.",
    challengesFaced: "Designing a realistic preview interface without requiring a backend PDF rendering engine.",
    learningOutcomes: "Created formatted academic document templates that display student credentials clearly.",
    mentorNotes: "Documentation repository matches the university SIP submission format well."
  }
];

export const initialDocuments = [
  {
    id: "doc-1",
    name: "Resume_Aarav_Sharma_v3.pdf",
    category: "Resume",
    type: "PDF Document",
    size: "1.2 MB",
    uploadedDate: "2026-10-15",
    status: "Verified",
    description: "Official B.Tech 7th Sem Resume with project links and technical competencies.",
    previewContent: {
      title: "CURRICULUM VITAE - AARAV SHARMA",
      subtitle: "B.Tech Computer Science & Engineering | Apex Institute of Tech",
      sections: [
        "Education: B.Tech CSE (2021-2025) - CGPA: 8.78/10",
        "Technical Skills: React.js, JavaScript, HTML5/CSS3, Git, REST APIs, SQL",
        "Key Projects: InternTrack SIP Portal, E-Commerce Analytics Engine",
        "Internship: Frontend Developer Intern @ CloudScale Tech (2026)"
      ],
      watermark: "OFFICIAL STUDENT RECORD"
    }
  },
  {
    id: "doc-2",
    name: "Internship_Offer_Letter_CloudScale.pdf",
    category: "Offer Letter",
    type: "PDF Document",
    size: "2.4 MB",
    uploadedDate: "2026-10-18",
    status: "Verified",
    description: "Official internship appointment letter from CloudScale Technologies Pvt Ltd.",
    previewContent: {
      title: "LETTER OF INTERNSHIP APPOINTMENT",
      subtitle: "CloudScale Technologies Pvt Ltd - Bangalore Office",
      sections: [
        "Candidate Name: Aarav Sharma (Apex Institute of Technology)",
        "Designation: Frontend Web Developer Intern",
        "Stipend: ₹25,000 / month (Paid on 1st of every month)",
        "Duration: 6 Months (Commencing October 2026)",
        "Reporting Lead: Vikram Malhotra (Staff Engineering Lead)"
      ],
      watermark: "CONFIDENTIAL & APPOINTED"
    }
  },
  {
    id: "doc-3",
    name: "Joining_Report_SIP_7thSem.pdf",
    category: "Joining Letter",
    type: "PDF Document",
    size: "890 KB",
    uploadedDate: "2026-10-20",
    status: "Approved",
    description: "Formally endorsed student joining report countersigned by academic coordinator.",
    previewContent: {
      title: "B.TECH 7TH SEMESTER SIP JOINING REPORT",
      subtitle: "Apex Institute of Technology & Management - Dept of CSE",
      sections: [
        "Student Enrollment: 2021BTCS084",
        "Company Name: CloudScale Technologies",
        "Faculty Coordinator: Dr. Rajesh Verma",
        "Joining Date: 16th October 2026",
        "Verification Status: Approved by Head of Department"
      ],
      watermark: "ACADEMIC SIP ENDORSED"
    }
  },
  {
    id: "doc-4",
    name: "SIP_Mid_Term_Progress_Report.pdf",
    category: "Internship Report",
    type: "PDF Document",
    size: "4.1 MB",
    uploadedDate: "2026-10-26",
    status: "Under Review",
    description: "Comprehensive 24-page mid-term progress documentation for SIP evaluation.",
    previewContent: {
      title: "SIP MID-TERM TECHNICAL PROGRESS REPORT",
      subtitle: "InternTrack: Smart Internship Management System Architecture",
      sections: [
        "Abstract: Centralized SPA for tracking student internship lifecycles.",
        "Methodology: React.js component architecture, LocalStorage data persistence.",
        "Modules Implemented: Applications tracker, Task manager, Attendance & Diary.",
        "Status: Phase 1 & 2 Completed; Evaluation Scheduled for 7th Sem Viva."
      ],
      watermark: "DRAFT FOR FACULTY REVIEW"
    }
  },
  {
    id: "doc-5",
    name: "InternTrack_Presentation_Slides.pptx",
    category: "Presentation",
    type: "PowerPoint Presentation",
    size: "6.8 MB",
    uploadedDate: "2026-10-28",
    status: "Draft",
    description: "Presentation deck (14 slides) for Departmental Review Committee presentation.",
    previewContent: {
      title: "SIP PROJECT VIVA PRESENTATION",
      subtitle: "InternTrack - Smart Internship Management System for Students",
      sections: [
        "Slide 1-3: Problem Statement, Literature Review & Objectives",
        "Slide 4-7: Architecture, Tech Stack & Component Hierarchy",
        "Slide 8-11: Live Module Demos (Applications, Tasks, Attendance, Diary)",
        "Slide 12-14: Results, Code Quality Metrics & Future Enhancements"
      ],
      watermark: "VIVA PRESENTATION DECK"
    }
  },
  {
    id: "doc-6",
    name: "Internship_Completion_Certificate_Template.pdf",
    category: "Certificate",
    type: "PDF Document",
    size: "1.5 MB",
    uploadedDate: "2026-10-30",
    status: "Pending Final Viva",
    description: "Provisional internship certificate format awaiting final SIP presentation sign-off.",
    previewContent: {
      title: "CERTIFICATE OF SUMMER INTERNSHIP COMPLETION",
      subtitle: "Presented by CloudScale Technologies & Apex Institute",
      sections: [
        "This is to certify that Aarav Sharma has successfully completed the 7th Semester Summer Internship Program.",
        "Performance Grade: Exemplary (A+)",
        "Project Assigned: Frontend SaaS Interface Development",
        "Authorized Signatory: Vikram Malhotra, Engineering Director"
      ],
      watermark: "PROVISIONAL PREVIEW"
    }
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Application Selected! 🎉",
    message: "CloudScale Technologies released your Frontend Developer Internship offer.",
    time: "2 hours ago",
    read: false,
    type: "success",
    link: "/my-applications"
  },
  {
    id: "notif-2",
    title: "Shortlisted by NextGen FinTech",
    message: "Your application for Full Stack MERN Intern has been shortlisted for interview round.",
    time: "Yesterday",
    read: false,
    type: "info",
    link: "/my-applications"
  },
  {
    id: "notif-3",
    title: "SIP Weekly Diary Reminder",
    message: "Ensure your daily diary entries for Week 4 are logged prior to Monday faculty review.",
    time: "2 days ago",
    read: true,
    type: "warning",
    link: "/internship-diary"
  },
  {
    id: "notif-4",
    title: "Attendance Health: Good (86.4%)",
    message: "Your attendance satisfies the 75% university SIP eligibility threshold.",
    time: "3 days ago",
    read: true,
    type: "success",
    link: "/attendance"
  }
];

