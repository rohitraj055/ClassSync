type IconName =
  | "overview"
  | "users"
  | "roles"
  | "security"
  | "audit"
  | "settings"
  | "activity"
  | "chart"
  | "arrow";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "overview":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
          <circle cx="10" cy="8" r="3.5" />
          <path d="M17 11a3.5 3.5 0 1 0 0-7M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" />
        </svg>
      );
    case "roles":
      return (
        <svg {...common}>
          <path d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "security":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
        </svg>
      );
    case "audit":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2M8 2.8 6.5 4M16 2.8 17.5 4" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1L16 21h-3l-.3-2a8 8 0 0 1-1.8-.7l-1.7.7-1.5-2.5 1.4-1.2a8 8 0 0 1 0-2l-1.4-1.2 1.5-2.5 1.7.7a8 8 0 0 1 1.8-.7L13 7h3l.3 1.9a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2.2Z" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5M4 19h16M8 15v-4M12 15V8M16 15V5M20 15V9" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      );
  }
}

const navigation = [
  { label: "Overview", icon: "overview", active: true },
  { label: "User Management", icon: "users", active: false },
  { label: "Role Management", icon: "roles", active: false },
  { label: "Security & Restrictions", icon: "security", active: false },
  { label: "Audit Logs", icon: "audit", active: false },
  { label: "Platform Settings", icon: "settings", active: false },
] as const;

const overviewCards = [
  { label: "Registered users", icon: "users" },
  { label: "Active accounts", icon: "activity" },
  { label: "Pending requests", icon: "chart" },
  { label: "Recent sign-ins", icon: "audit" },
] as const;

const quickActions = [
  {
    label: "Manage users",
    description: "User directory is not connected yet.",
    icon: "users",
  },
  {
    label: "Review roles",
    description: "Role controls are coming soon.",
    icon: "roles",
  },
  {
    label: "Security settings",
    description: "Security controls are not connected yet.",
    icon: "security",
  },
  {
    label: "View audit logs",
    description: "Audit data is not connected yet.",
    icon: "audit",
  },
] as const;

export default function AdminDashboard({
  ownerEmail,
}: {
  ownerEmail: string;
}) {
  return (
    <div className="min-h-screen bg-[#090d16] text-[#e9edf5]">
      <aside className="border-b border-[#1d2634] bg-[#0c111b] px-4 py-4 sm:px-6 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[260px] lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
        <a
          className="flex w-fit items-center gap-3"
          href="#overview"
          aria-label="ClassSync admin overview"
        >
          <span className="brand-mark">
            <span />
          </span>
          <span className="brand-name">
            class<span>sync</span>
          </span>
        </a>

        <p className="mb-3 mt-7 hidden px-3 text-[10px] font-bold tracking-[0.14em] text-[#657187] lg:block">
          ADMINISTRATION
        </p>
        <nav
          className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-0 lg:grid-cols-1"
          aria-label="Super Admin navigation"
        >
          {navigation.map((item) =>
            item.active ? (
              <a
                key={item.label}
                href="#overview"
                aria-current="page"
                className="flex min-h-11 items-center gap-2 rounded-lg border border-[#293757] bg-gradient-to-r from-[#1d2b48] to-[#172239] px-2.5 text-[11px] font-medium text-[#a9c0ff] transition sm:gap-3 sm:px-3 sm:text-xs lg:gap-3 lg:px-3 lg:text-[13px]"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#26395d] text-[#91adff]">
                  <Icon name={item.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  {item.label}
                </span>
              </a>
            ) : (
              <div
                key={item.label}
                aria-disabled="true"
                className="flex min-h-11 items-center gap-2 rounded-lg border border-transparent px-2.5 text-[11px] text-[#8d99ad] sm:gap-3 sm:px-3 sm:text-xs lg:gap-3 lg:px-3 lg:text-[13px]"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#141c2a] text-[#77849a]">
                  <Icon name={item.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  {item.label}
                </span>
                <span className="rounded border border-[#293246] px-1.5 py-0.5 text-[9px] text-[#647087]">
                  Soon
                </span>
              </div>
            )
          )}
        </nav>

        <div className="mt-7 hidden border-t border-[#202938] pt-5 lg:mt-auto lg:block">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#46567b] bg-gradient-to-br from-[#3b527c] to-[#24334e] text-[10px] font-bold text-[#dbe5ff]">
              PO
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-[#e3e8f2]">
                Primary Owner
              </span>
              <span
                className="mt-1 block truncate text-[10px] text-[#768297]"
                title={ownerEmail}
              >
                {ownerEmail}
              </span>
            </span>
          </div>
        </div>
      </aside>

      <main id="overview" className="min-h-screen lg:ml-[260px]">
        <header className="flex min-h-[68px] items-center justify-between gap-4 border-b border-[#1b2432] bg-[#0b1019] px-4 sm:px-7 lg:px-10">
          <div className="flex items-center gap-2 text-xs text-[#78849a]">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-[#d9e0ed]">Overview</span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden max-w-[220px] truncate text-xs text-[#aab5c7] sm:block">
              {ownerEmail}
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#2b3c5a] bg-[#17243a] px-3 py-1.5 text-[10px] font-semibold text-[#a9c0ff]">
              <span className="size-1.5 rounded-full bg-[#82a2ff]" />
              Super Admin
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#263653] bg-gradient-to-br from-[#172741] via-[#121c2c] to-[#101622] p-5 sm:p-7 lg:flex-row lg:items-end lg:px-8 lg:py-7">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#31466a] bg-[#1a2a43] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9bb4f5]">
                <span className="size-1.5 rounded-full bg-[#82a2ff]" />
                Verified primary owner
              </div>
              <h1 className="text-2xl font-semibold tracking-[-0.04em] text-[#f0f3f9] sm:text-3xl">
                Welcome, Primary Owner
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#929db0]">
                Your ClassSync administration workspace. Platform data and
                activity will appear here when connected.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#2a3952] bg-[#111a29]/80 px-3.5 py-3 sm:max-w-sm">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#2b3c5a] bg-[#1b2940] text-[#8eacff]">
                <Icon name="roles" size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#75839a]">
                  Signed in as
                </span>
                <span className="mt-1 block truncate text-xs text-[#dce3f0]">
                  {ownerEmail}
                </span>
              </span>
            </div>
          </section>

          <section className="mt-8" aria-labelledby="platform-overview-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#657187]">
                  At a glance
                </p>
                <h2
                  id="platform-overview-heading"
                  className="mt-1 text-base font-semibold text-[#e7ecf5]"
                >
                  Platform overview
                </h2>
              </div>
              <span className="text-[11px] text-[#78849a]">
                Live data is not connected
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map((card) => (
                <article
                  key={card.label}
                  className="rounded-xl border border-[#212b3b] bg-gradient-to-br from-[#121a27] to-[#101621] p-4 shadow-[0_8px_22px_#0000000a] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs font-medium text-[#a2adbf]">
                      {card.label}
                    </h3>
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-[#2a3b5a] bg-[#1b2940] text-[#8eacff]">
                      <Icon name={card.icon} size={16} />
                    </span>
                  </div>
                  <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#f0f3f9]">
                    <span aria-label="Not available">—</span>
                  </p>
                  <p className="mt-2 text-[10px] text-[#77849a]">
                    Awaiting data connection
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <section
              className="rounded-xl border border-[#212b3b] bg-gradient-to-br from-[#121a27] to-[#101621] p-4 sm:p-5"
              aria-labelledby="recent-activity-heading"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#657187]">
                    Platform events
                  </p>
                  <h2
                    id="recent-activity-heading"
                    className="mt-1 text-sm font-semibold text-[#e7ecf5]"
                  >
                    Recent activity
                  </h2>
                </div>
                <span className="rounded-full border border-[#293246] px-2.5 py-1 text-[10px] text-[#78849a]">
                  Not connected
                </span>
              </div>
              <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-[#293448] bg-[#0f1622] px-5 py-8 text-center">
                <span className="grid size-11 place-items-center rounded-xl border border-[#2a3b5a] bg-[#1b2940] text-[#8eacff]">
                  <Icon name="activity" size={20} />
                </span>
                <h3 className="mt-4 text-sm font-medium text-[#dce3ef]">
                  Activity feed is not connected
                </h3>
                <p className="mt-2 max-w-sm text-xs leading-5 text-[#7d899d]">
                  Recent platform events will be shown here once an authorized
                  activity source is available.
                </p>
              </div>
            </section>

            <section
              className="rounded-xl border border-[#212b3b] bg-gradient-to-br from-[#121a27] to-[#101621] p-4 sm:p-5"
              aria-labelledby="quick-actions-heading"
            >
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#657187]">
                  Shortcuts
                </p>
                <h2
                  id="quick-actions-heading"
                  className="mt-1 text-sm font-semibold text-[#e7ecf5]"
                >
                  Quick administration actions
                </h2>
              </div>
              <div className="grid gap-2.5">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    disabled
                    className="flex w-full items-center gap-3 rounded-lg border border-[#222d3e] bg-[#101722] p-3 text-left opacity-80 disabled:cursor-not-allowed"
                    aria-label={`${action.label}, coming soon`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#293b58] bg-[#18263c] text-[#88a6ff]">
                      <Icon name={action.icon} size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-[#dce3ef]">
                        {action.label}
                      </span>
                      <span className="mt-1 block text-[10px] leading-4 text-[#7d899d]">
                        {action.description}
                      </span>
                    </span>
                    <span className="hidden shrink-0 rounded border border-[#293246] px-2 py-1 text-[9px] text-[#78849a] sm:inline-flex">
                      Soon
                    </span>
                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <footer className="mt-8 flex flex-col gap-2 border-t border-[#1c2635] pt-4 text-[10px] text-[#647087] sm:flex-row sm:items-center sm:justify-between">
            <span>ClassSync · Super Admin</span>
            <span>Dashboard metrics and activity are not connected yet.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
