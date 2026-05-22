import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers, getAccounts, getPremiumAccounts, getLowBalanceAccounts } from '../services/api';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({ customers: 0, accounts: 0, premium: 0, lowBalance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCustomers(),
      getAccounts(),
      getPremiumAccounts(),
      getLowBalanceAccounts(),
    ])
      .then(([c, a, p, l]) => {
        setStats({
          customers: c.data.length,
          accounts: a.data.length,
          premium: p.data.length,
          lowBalance: l.data.length,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your bank data</p>

      {loading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Customers" value={stats.customers} color="blue" />
          <StatCard label="Total Accounts" value={stats.accounts} color="green" />
          <StatCard label="Premium Accounts" value={stats.premium} color="yellow" />
          <StatCard label="Low Balance" value={stats.lowBalance} color="red" />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/customers"
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Manage Customers</h2>
          <p className="text-gray-500 text-sm">View, add, and delete bank customers.</p>
        </Link>
        <Link
          to="/accounts"
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Manage Accounts</h2>
          <p className="text-gray-500 text-sm">Browse all accounts, premium, and low balance filters.</p>
        </Link>
      </div>
    </div>
  );
}
