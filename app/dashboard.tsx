"use client";

import { useState } from "react";

type IconName =
  | "dashboard"
  | "calendar"
  | "book"
  | "users"
  | "clock"
  | "settings"
  | "search"
  | "bell"
  | "menu"
  | "close"
  | "arrow"
  | "chevron"
  | "pin"
  | "check"
  | "megaphone"
  | "file";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "dashboard":
      return <svg {...common}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" /><rect x="14" y="11" width="7" height="10" rx="2" /><rect x="3" y="14" width="8" height="7" rx="2" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
    case "book":
      return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h6" /></svg>;
    case "users":
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1L16 21h-3l-.3-2a8 8 0 0 1-1.8-.7l-1.7.7-1.5-2.5 1.4-1.2a8 8 0 0 1 0-2l-1.4-1.2 1.5-2.5 1.7.7a8 8 0 0 1 1.8-.7L13 7h3l.3 1.9a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2.2Z" /></svg>;
    case "search":
      return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M7 17 17 7M7 7h10v10" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
    case "pin":
      return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "megaphone":
      return <svg {...common}><path d="m3 11 18-5v12L3 13v-2ZM11 15l2 6h-4l-2-7M21 10v4" /></svg>;
    case "file":
      return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>;
  }
}

const navigation: { label: string; icon: IconName; href: string; soon?: boolean }[] = [
  { label: "Dashboard", icon: "dashboard", href: "#dashboard" },
  { label: "Attendance", icon: "calendar", href: "#attendance" },
  { label: "Timetable", icon: "clock", href: "#timetable" },
  { label: "Notes & Resources", icon: "book", href: "#resources", soon: true },
  { label: "Community", icon: "users", href: "#community", soon: true },
  { label: "Deadlines", icon: "file", href: "#deadlines" },
  { label: "Settings", icon: "settings", href: "#settings", soon: true },
];

const stats = [
  { label: "Overall attendance", value: "87%", detail: "+2.4% this month", tone: "blue", icon: "calendar" as const },
  { label: "Classes today", value: "4", detail: "Next class at 09:00 AM", tone: "violet", icon: "book" as const },
  { label: "Pending assignments", value: "3", detail: "1 due this week", tone: "amber", icon: "file" as const },
  { label: "Upcoming exams", value: "2", detail: "First one in 12 days", tone: "green", icon: "clock" as const },
];

const classes = [
  { time: "09:00", end: "10:00", subject: "Data Structures & Algorithms", code: "CS 201 · Lecture", room: "LBS 201", color: "blue" },
  { time: "10:15", end: "11:15", subject: "Discrete Mathematics", code: "MA 203 · Lecture", room: "ECE 101", color: "violet" },
  { time: "12:00", end: "13:00", subject: "Digital Logic Design", code: "EC 205 · Tutorial", room: "LBS 105", color: "amber" },
  { time: "14:00", end: "15:00", subject: "Engineering Economics", code: "HU 201 · Lecture", room: "Seminar Hall", color: "green" },
];

const attendance = [
  { subject: "Data Structures", percentage: 94, attended: "17/18", color: "blue" },
  { subject: "Discrete Mathematics", percentage: 88, attended: "15/17", color: "violet" },
  { subject: "Digital Logic Design", percentage: 82, attended: "14/17", color: "amber" },
  { subject: "Engineering Economics", percentage: 76, attended: "13/17", color: "rose" },
];

const announcements = [
  { category: "DEPARTMENT", title: "CSE project topic selection is now open", detail: "Choose your project group and submit a topic by Friday.", time: "2 hours ago", color: "blue" },
  { category: "CAMPUS", title: "Library extended hours this week", detail: "The central library will remain open until 11 PM during mid-sem prep.", time: "Yesterday", color: "violet" },
  { category: "ACADEMICS", title: "Data Structures tutorial moved to Room 204", detail: "The Thursday tutorial will be held in LBS 204 instead.", time: "Nov 21", color: "amber" },
];

const deadlines = [
  { day: "26", month: "NOV", title: "Algorithms problem set", course: "Data Structures · Assignment", color: "blue" },
  { day: "28", month: "NOV", title: "Logic design lab report", course: "Digital Logic · Lab report", color: "violet" },
  { day: "02", month: "DEC", title: "Economics case study", course: "Engineering Economics · Project", color: "amber" },
];

function Sidebar({ onNavigate, open }: { onNavigate?: () => void; open?: boolean }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <a className="brand" href="#dashboard" onClick={onNavigate} aria-label="ClassSync dashboard">
        <span className="brand-mark"><span /></span>
        <span className="brand-name">class<span>sync</span></span>
      </a>

      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list" aria-label="Main navigation">
        {navigation.map((item, index) => {
          const content = (
            <>
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.soon && <span className="soon-label">Soon</span>}
              {item.label === "Deadlines" && <span className="nav-count">3</span>}
            </>
          );
          return item.soon ? (
            <div className="nav-item coming-soon" aria-disabled="true" key={item.label}>{content}</div>
          ) : (
            <a
              href={item.href}
              className={`nav-item ${index === 0 ? "active" : ""}`}
              aria-current={index === 0 ? "page" : undefined}
              key={item.label}
              onClick={onNavigate}
            >
              {content}
            </a>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="term-card">
          <div className="term-icon"><Icon name="calendar" size={16} /></div>
          <div><span className="term-caption">CURRENT TERM</span><strong>Autumn semester</strong><small>2026 – 2027</small></div>
        </div>
        <button className="profile-button" type="button">
          <span className="avatar">RH</span>
          <span className="profile-copy"><strong>Rohit</strong><small>B.Tech · Computer Science</small></span>
          <span className="profile-menu">···</span>
        </button>
      </div>
    </aside>
  );
}

function PanelTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return (
    <div className="panel-title">
      <div>
        {eyebrow && <span className="panel-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action && <a className="text-link" href="#dashboard">{action}<Icon name="chevron" size={15} /></a>}
    </div>
  );
}

function StatCard({ label, value, detail, tone, icon }: (typeof stats)[number]) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon name={icon} size={18} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-detail ${tone === "blue" ? "positive" : ""}`}>
        {tone === "blue" && <span className="trend-arrow">↗</span>}
        {detail}
      </div>
    </article>
  );
}

function TimetableCard() {
  return (
    <section className="panel timetable-panel" id="timetable">
      <PanelTitle eyebrow="MONDAY, NOVEMBER 23" title="Today's schedule" action="Full timetable" />
      <div className="schedule-list">
        {classes.map((item, index) => (
          <article className={`schedule-row ${index === 0 ? "current-class" : ""}`} key={item.subject}>
            <div className="schedule-time"><strong>{item.time}</strong><span>{item.end}</span></div>
            <div className={`schedule-marker ${item.color}`} />
            <div className="schedule-info">
              <strong>{item.subject}</strong>
              <span>{item.code}</span>
            </div>
            <div className="schedule-room"><Icon name="pin" size={14} />{item.room}</div>
            {index === 0 && <span className="now-tag">UP NEXT</span>}
          </article>
        ))}
      </div>
      <div className="schedule-footer"><span className="footer-dot" />Your day is looking good — 4 classes scheduled</div>
    </section>
  );
}

function AttendanceCard() {
  return (
    <section className="panel attendance-panel" id="attendance">
      <PanelTitle eyebrow="KEEP UP THE GOOD WORK" title="Attendance overview" action="View details" />
      <div className="attendance-summary">
        <div className="attendance-ring"><div><strong>87<span>%</span></strong><small>OVERALL</small></div></div>
        <div className="attendance-note"><span className="status-indicator" />You’re above the 75%<br />minimum in all subjects.</div>
      </div>
      <div className="subject-list">
        {attendance.map((item) => (
          <div className="subject-row" key={item.subject}>
            <div className="subject-topline"><span>{item.subject}</span><strong>{item.percentage}% <small>{item.attended}</small></strong></div>
            <div className="progress-track"><span className={item.color} style={{ width: `${item.percentage}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="attendance-footnote"><span>ⓘ</span> Attendance is based on classes held this semester.</div>
    </section>
  );
}

function AnnouncementsCard() {
  return (
    <section className="panel announcement-panel" id="announcements">
      <PanelTitle eyebrow="STAY IN THE LOOP" title="Recent announcements" action="All announcements" />
      <div className="announcement-list">
        {announcements.map((item) => (
          <article className="announcement-row" key={item.title}>
            <div className={`announcement-icon ${item.color}`}><Icon name="megaphone" size={17} /></div>
            <div className="announcement-copy">
              <div className="announcement-meta"><span className={`category ${item.color}`}>{item.category}</span><span>{item.time}</span></div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <a href="#announcements" className="announcement-open" aria-label={`Read ${item.title}`}><Icon name="arrow" size={16} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeadlinesCard() {
  return (
    <section className="panel deadlines-panel" id="deadlines">
      <PanelTitle eyebrow="DON'T MISS A THING" title="Upcoming deadlines" action="View calendar" />
      <div className="deadline-list">
        {deadlines.map((item) => (
          <article className="deadline-row" key={item.title}>
            <div className={`deadline-date ${item.color}`}><strong>{item.day}</strong><span>{item.month}</span></div>
            <div className="deadline-copy"><h3>{item.title}</h3><span>{item.course}</span></div>
            <span className="deadline-status"><span />Due soon</span>
          </article>
        ))}
      </div>
      <a href="#deadlines" className="calendar-link"><Icon name="calendar" size={16} />See your full academic calendar<Icon name="chevron" size={15} /></a>
    </section>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-shell min-h-screen bg-background text-foreground" id="dashboard">
      <div className="mobile-bar">
        <button className="icon-button mobile-menu-button" type="button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label={sidebarOpen ? "Close menu" : "Open menu"}>
          <Icon name={sidebarOpen ? "close" : "menu"} />
        </button>
        <a className="brand mobile-brand" href="#dashboard"><span className="brand-mark"><span /></span><span className="brand-name">class<span>sync</span></span></a>
        <button className="icon-button mobile-bell" type="button" aria-label="Notifications"><Icon name="bell" /></button>
      </div>
      {sidebarOpen && <button className="sidebar-backdrop" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>Dashboard</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Icon name="search" size={17} /><input type="search" placeholder="Search anything..." aria-label="Search dashboard" /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" type="button" aria-label="Notifications"><Icon name="bell" size={18} /><span /></button>
            <span className="topbar-divider" />
            <div className="topbar-user"><span className="avatar small-avatar">RH</span><span>Rohit</span><span className="user-caret">⌄</span></div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <div className="welcome-kicker"><span className="sun-icon">☀</span> MONDAY, NOVEMBER 23, 2026</div>
              <h1>Good morning, Rohit<span>.</span></h1>
              <p>Here&apos;s what&apos;s happening with your academics.</p>
            </div>
            <div className="campus-chip"><span className="campus-pulse" />IIEST Shibpur <span className="campus-separator">·</span> Student portal</div>
          </section>

          <section className="stats-grid grid grid-cols-2 gap-2.5 min-[768px]:grid-cols-4 min-[768px]:gap-[15px]" aria-label="Academic summary">
            {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </section>

          <div className="primary-grid">
            <TimetableCard />
            <AttendanceCard />
          </div>

          <div className="secondary-grid">
            <AnnouncementsCard />
            <DeadlinesCard />
          </div>

          <footer className="dashboard-footer"><span>ClassSync</span><span>Made for your campus life <span className="footer-heart">♥</span></span><span>Demo student dashboard</span></footer>
        </div>
      </main>
    </div>
  );
}
