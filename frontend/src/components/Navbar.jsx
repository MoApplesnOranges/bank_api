import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/customers', label: 'Customers' },
    { to: '/accounts', label: 'Accounts' },
  ];

  return (
    <nav className="bg-blue-700 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-wide">
          Bank API
        </span>
        <div className="flex gap-2">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-white text-blue-700'
                  : 'text-white hover:bg-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
