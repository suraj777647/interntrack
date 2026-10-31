# InternTrack 🎓
### Smart Internship Management System for Students
**Academic Purpose:** B.Tech 7th Semester Summer Internship Program (SIP) Capstone Project  
**Tech Stack:** React.js (ES6+), Vite, React Router DOM, LocalStorage, Recharts, Lucide Icons, Modern CSS3  

---

## 📌 Project Overview

**InternTrack** is a modern, responsive, and student-focused Internship Management Single Page Application (SPA). Designed specifically for college students undertaking their mandatory **Summer Internship Program (SIP)**, InternTrack consolidates fragmented internship workflows into one centralized dashboard.

Students can explore verified internship opportunities, submit applications with resume simulations, monitor hiring pipeline stages, organize daily development tasks, compute and track attendance percentages against university thresholds, maintain daily work diaries, and archive official academic documents (Offer Letters, Joining Letters, Reports, PPTs, and Certificates).

---

## 🚀 Key Modules & Capabilities

| Module | Purpose & Core Features |
| :--- | :--- |
| **1. Dashboard** | Comprehensive overview with personalized student summary, key metric counters, Recharts weekly working hours analytics, application pipeline pie chart, priority tasks list, and live activity timeline. |
| **2. Internships** | Directory of verified industry openings with multi-criteria filtering (Category, Duration, Work Mode), keyword search, detailed job descriptions, stipend badges, and one-click apply triggers. |
| **3. Apply Internship** | Multi-step interactive application form with pre-populated student profile credentials, client-side input validation (email regex, 10-digit phone verification), simulated resume selector, and celebratory confetti upon submission. |
| **4. My Applications** | Real-time tracking of submitted applications with status badges (`Pending`, `Under Review`, `Shortlisted`, `Selected`, `Rejected`), status history timeline, and an **Evaluator Simulation Tool** to test status transitions in live vivas. |
| **5. Task Management** | Kanban-style task organizer with priority tags (`High`, `Medium`, `Low`), category tags (`Development`, `Documentation`, `Testing`, etc.), completion progress ring, filter tabs, edit/delete modals, and strike-through checkbox toggles. |
| **6. Attendance** | Dynamic percentage calculation against the university **≥ 75% minimum attendance rule**, color-coded monthly calendar view (Present, Absent, Leave, Weekend), daily sign-in button, and detailed audit log table. |
| **7. Internship Diary** | Daily technical logbook to document work descriptions, tasks completed, concepts learned, and challenges faced. Includes a **Formatted Academic SIP Dossier Export/Print View** ready for faculty submission. |
| **8. Documents Vault** | Centralized repository for Offer Letters, Joining Reports, Mid-Term Reports, Presentation PPTs, and Certificates. Features simulated file uploads with progress bars and an **Official Academic Document Previewer** with seals and watermarks. |
| **9. Student Profile** | Complete student dossier with avatar, academic affiliation, CGPA, technical competencies, career tracks, and a **Profile Completeness Indicator (95%)**. Includes a **Reset Demo Data** utility for evaluators. |

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core:** React 18 (Functional Components, React Hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useContext`)
- **Build Tool:** Vite 6 (Lightning-fast HMR and optimized production bundles)
- **Routing:** React Router DOM v6 (Declarative client-side SPA routing)
- **State Management & Persistence:** Centralized React Context (`AppContext.jsx`) synchronized with browser `LocalStorage`
- **Data Visualizations:** Recharts (Interactive bar charts and pipeline distribution pie charts)
- **UI & Icons:** Lucide React (Clean, professional SaaS iconography)
- **Styling:** Vanilla CSS3 with CSS Custom Properties (Theme variables, responsive CSS Grid, Flexbox, smooth transitions)
- **Feedback & Micro-interactions:** Custom floating Toast notification system and Canvas Confetti

---

## 📂 Project Folder Structure

```text
sip/
├── public/
├── src/
│   ├── assets/               # Brand assets & placeholders
│   ├── components/           # Reusable layout and notification components
│   │   ├── Navbar.jsx        # Top navigation with search, notification popover & profile
│   │   ├── Navbar.css
│   │   ├── Sidebar.jsx       # Left navigation drawer with active states & mobile collapse
│   │   ├── Sidebar.css
│   │   └── ToastContainer.jsx# Animated feedback notifications
│   ├── context/
│   │   └── AppContext.jsx    # Global Context & LocalStorage synchronization engine
│   ├── data/
│   │   └── demoData.js       # Pre-configured demo data for B.Tech CSE student
│   ├── pages/                # Nine core module page views
│   │   ├── Dashboard.jsx & .css
│   │   ├── Internships.jsx & .css
│   │   ├── ApplyInternship.jsx & .css
│   │   ├── MyApplications.jsx & .css
│   │   ├── TaskManagement.jsx & .css
│   │   ├── Attendance.jsx & .css
│   │   ├── InternshipDiary.jsx & .css
│   │   ├── Documents.jsx & .css
│   │   └── Profile.jsx & .css
│   ├── App.jsx               # Main SPA routing shell & authentication simulator
│   ├── App.css               # Shell layout & logout view styles
│   ├── index.css             # Global design tokens, typography, utilities & buttons
│   └── main.jsx              # Application bootstrap entry point
├── index.html                # HTML5 container with Plus Jakarta Sans & JetBrains Mono
├── package.json              # Dependency manifests and scripts
├── vite.config.js            # Vite bundler configuration
└── README.md                 # Project documentation
```

---

## 🏃 Getting Started & Running Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation Steps

1. **Clone or Navigate to the Workspace Directory:**
   ```bash
   cd d:/sip
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

4. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

## 🧑‍🏫 Guide for Academic Evaluators & Viva Demonstration

When presenting **InternTrack** during project evaluation:

1. **Dashboard Overview:** Point out the dynamic metrics, Recharts weekly working hours graph, and the student summary banner with host company details.
2. **Interactive Status Progression:** Navigate to **My Applications**, click **Details** on any application, and use the **Evaluator Tool** dropdown to change status (e.g. from *Under Review* to *Shortlisted* or *Selected*). Notice how the history timeline updates immediately and affects Dashboard counts!
3. **Attendance Rule Check:** Show the **Attendance** module. Emphasize the automatic compliance check against the 75% university rule and click **Mark Today's Check-in** to see instant status updates.
4. **SIP Diary Dossier:** Open **Internship Diary**, click **Export SIP Dossier**, and showcase the print-ready university report with student/mentor signature lines.
5. **Document Vault:** Open **Documents**, click **Preview** on the *Offer Letter* or *SIP Progress Report* to demonstrate the official formatted document viewer with watermark and seals.
6. **Data Reset:** If needed, open the user profile dropdown or the Profile page and click **Reset Demo Data** to restore the default sample state at any point.

---

## 📜 License & Academic Disclosure

Developed as an academic capstone project for **B.Tech 7th Semester Summer Internship Program (SIP)**.  
*All company logos, names, and documents are simulated for educational demonstration.*

