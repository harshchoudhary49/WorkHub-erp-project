import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import NotificationBell from './NotificationBell.jsx';
import { NavIcon } from '../ui/icons.jsx';

const NAV_BY_ROLE = {
  employee: [
    { label: 'Dashboard', to: '/employee/dashboard' },
    { label: 'Attendance', to: '/attendance' },
    { label: 'Leaves', to: '/leaves' },
    { label: 'Tasks', to: '/tasks' },
    { label: 'Goals', to: '/goals' },
    { label: 'Performance', to: '/performance' },
    { label: 'Announcements', to: '/announcements' },
    { label: 'Recognition', to: '/recognition' },
    { label: 'Messages', to: '/messages' },
    { label: 'My profile', to: '/profile' },
  ],
  manager: [
    { label: 'Dashboard', to: '/manager/dashboard' },
    { label: 'Team attendance', to: '/manager/attendance' },
    { label: 'Leave requests', to: '/manager/leaves' },
    { label: 'Team tasks', to: '/manager/tasks' },
    { label: 'Team goals', to: '/manager/goals' },
    { label: 'Team performance', to: '/manager/performance' },
    { label: 'Workforce map', to: '/workforce' },
    { label: 'Reports', to: '/reports' },
    { label: 'Announcements', to: '/announcements' },
    { label: 'Recognition', to: '/recognition' },
    { label: 'Messages', to: '/messages' },
    { label: 'My profile', to: '/profile' },
  ],
  hr: [
    { label: 'Dashboard', to: '/hr/dashboard' },
    { label: 'Employees', to: '/hr/employees' },
    { label: 'Departments', to: '/hr/departments' },
    { label: 'Teams', to: '/hr/teams' },
    { label: 'Offices', to: '/hr/offices' },
    { label: 'Attendance', to: '/hr/attendance' },
    { label: 'Holidays', to: '/hr/holidays' },
    { label: 'Leaves', to: '/hr/leaves' },
    { label: 'Tasks', to: '/hr/tasks' },
    { label: 'Goals', to: '/hr/goals' },
    { label: 'Performance', to: '/hr/performance' },
    { label: 'Workforce map', to: '/workforce' },
    { label: 'Office setup', to: '/hr/office-setup' },
    { label: 'Reports', to: '/reports' },
    { label: 'Announcements', to: '/announcements' },
    { label: 'Recognition', to: '/recognition' },
    { label: 'Messages', to: '/messages' },
    { label: 'My profile', to: '/profile' },
  ],
  admin: [
    { label: 'Dashboard', to: '/hr/dashboard' },
    { label: 'Employees', to: '/hr/employees' },
    { label: 'Departments', to: '/hr/departments' },
    { label: 'Teams', to: '/hr/teams' },
    { label: 'Offices', to: '/hr/offices' },
    { label: 'Attendance', to: '/hr/attendance' },
    { label: 'Holidays', to: '/hr/holidays' },
    { label: 'Leaves', to: '/hr/leaves' },
    { label: 'Tasks', to: '/hr/tasks' },
    { label: 'Goals', to: '/hr/goals' },
    { label: 'Performance', to: '/hr/performance' },
    { label: 'Workforce map', to: '/workforce' },
    { label: 'Office setup', to: '/hr/office-setup' },
    { label: 'Reports', to: '/reports' },
    { label: 'Announcements', to: '/announcements' },
    { label: 'Recognition', to: '/recognition' },
    { label: 'Messages', to: '/messages' },
    { label: 'My profile', to: '/profile' },
  ],
};

// Role badges borrow the logic of a hi-vis vest color on a site: the
// color itself tells you someone's function before you read a word.
const ROLE_STYLE = {
  employee: { label: 'Employee', dot: 'bg-primary-500', chip: 'bg-primary-50 text-primary-700' },
  manager: { label: 'Manager', dot: 'bg-amber-400', chip: 'bg-amber-50 text-amber-700' },
  hr: { label: 'HR', dot: 'bg-safety-500', chip: 'bg-safety-400/10 text-safety-600' },
  admin: { label: 'Admin', dot: 'bg-gunmetal-500', chip: 'bg-gunmetal-100 text-gunmetal-600' },
};

export default function DashboardLayout() {
  const { user, employee, logout } = useAuth();
  const nav = NAV_BY_ROLE[user?.role] || [];
  const role = ROLE_STYLE[user?.role] || ROLE_STYLE.employee;

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 flex-col bg-gunmetal-800 lg:flex no-print">
        <div className="flex items-center gap-2.5 px-5 py-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-amber-400">
            <span className="h-2.5 w-2.5 rotate-45 bg-gunmetal-800" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-white">
            Workforce
          </span>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-0.5 px-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[4px] border-l-[3px] px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-amber-400 bg-white/5 text-white'
                    : 'border-transparent text-gunmetal-200 hover:border-gunmetal-500 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <NavIcon label={item.label} className="shrink-0 text-current opacity-80" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div
          className="h-1.5 opacity-70"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, #e7a520 0 10px, #182027 10px 20px)',
          }}
        />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gunmetal-200/70 bg-white px-6 py-4 no-print">
          <div>
            <p className="font-display text-lg font-semibold leading-tight text-gunmetal-800">
              {employee?.name || user?.email}
            </p>
            <p className="text-sm text-gunmetal-400">Here's where things stand today.</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <span
              className={`flex items-center gap-1.5 rounded-[4px] px-3 py-1 text-xs font-semibold ${role.chip}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${role.dot}`} />
              {role.label}
            </span>
            <button
              onClick={logout}
              className="rounded-[4px] border border-gunmetal-200 px-3 py-1.5 text-sm font-medium text-gunmetal-500 transition-colors hover:border-safety-500 hover:text-safety-600"
            >
              Log out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
