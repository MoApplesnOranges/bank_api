import { useEffect, useState } from 'react';
import { getAccounts, getPremiumAccounts, getLowBalanceAccounts, deleteAccount } from '../services/api';
import AccountBadge from '../components/AccountBadge';

const TABS = [
  { key: 'all', label: 'All Accounts' },
  { key: 'premium', label: 'Premium (≥$10k)' },
  { key: 'low', label: 'Low Balance (<$1k)' },
];

export default function Accounts() {
  const [tab, setTab] = useState('all');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = (activeTab = tab) => {
    setLoading(true);
    const fetcher =
      activeTab === 'premium' ? getPremiumAccounts :
      activeTab === 'low' ? getLowBalanceAccounts :
      getAccounts;

    fetcher()
      .then((res) => setAccounts(res.data))
      .catch(() => setError('Failed to load accounts.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(tab); }, [tab]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this account?')) return;
    try {
      await deleteAccount(id);
      load(tab);
    } catch {
      setError('Failed to delete account.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accounts</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : accounts.length === 0 ? (
        <p className="text-gray-500 text-sm">No accounts in this category.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Account ID</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Customer ID</th>
                <th className="text-right px-5 py-3 font-medium text-gray-600">Balance</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((a) => {
                const aid = a.account_id || a.id;
                return (
                  <tr key={aid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-gray-400">{aid}</td>
                    <td className="px-5 py-3">
                      <AccountBadge type={a.account_type} />
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-400">{a.customer_id}</td>
                    <td className={`px-5 py-3 text-right font-semibold ${
                      a.balance < 1000 ? 'text-red-500' : a.balance >= 10000 ? 'text-green-600' : 'text-gray-800'
                    }`}>
                      ${a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => handleDelete(aid)}
                        className="text-red-400 hover:text-red-600 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            {accounts.length} account{accounts.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
