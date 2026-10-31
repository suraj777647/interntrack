// Sample Directory Data for InternTrack - Smart Internship Management System (B.Tech 7th Sem SIP)
// Note: Personal student data is created per-user upon signup and stored in isolated LocalStorage.

export const initialInternships = [
  {
    id: "int-1",
    title: "Frontend React Developer Intern",
    company: "NanoCloud Technologies",
    logoText: "NC",
    logoColor: "#2563EB",
    location: "DLF Cybercity (Remote Available)",
    workMode: "Remote",
    category: "Web Development",
    duration: "6 Months",
    stipend: "₹25,000 / month",
    stipendAmount: 25000,
    openings: 4,
    deadline: "2026-11-20",
    postedDate: "2026-10-15",
    experienceLevel: "Fresher / Student",
    isSample: true,
    description: "NanoCloud Technologies is looking for an enthusiastic Frontend Developer intern to assist in building next-generation SaaS dashboards, optimizing web vitals, and implementing responsive UI components with React.",
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
    isSample: true,
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
    isSample: true,
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
    isSample: true,
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
    isSample: true,
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
    isSample: true,
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
    isSample: true,
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
    isSample: true,
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

// Empty defaults for new accounts.
// Individual students maintain their own applications, tasks, attendance, diary, and documents.
export const initialApplications = [];
export const initialTasks = [];
export const initialAttendanceRecords = [];
export const initialDiaryEntries = [];
export const initialDocuments = [];
export const initialNotifications = [];
