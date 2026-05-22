import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomer, createAccount, deleteAccount } from '../services/api';
import Modal from '../components/Modal';
import AccountBadge from '../components/AccountBadge';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ account_type: 'Checking', balance: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    getCustomer(id)
      .then((res) => setCustomer(res.data))
      .catch(() => setError('Customer not found.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!form.balance) return;
    setSubmitting(true);
    try {
      await createAccount({
        account_type: form.account_type,
        balance: parseFloat(form.balance),
        customer_id: id,
      });
      setForm({ account_type: 'Checking', balance: '' });
      setShowModal(false);
      load();
    } catch {
      setError('Failed to create account.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (!confirm('Delete this account?')) return;
    try {
      await deleteAccount(accountId);
      load();
    } catch {
      setError('Failed to delete account.');
    }
  };

  if (loading) return <p className="p-8 text-gray-400">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  const totalBalance = customer.accounts?.reduce((sum, a) => sum + (a.balance || 0), 0) || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/customers" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Customers
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{customer.name}</h1>
        <p className="text-xs text-gray-400 font-mono mt-1">{customer.customer_id}</p>
        <div className="mt-4 flex gap-6 text-sm text-gray-600">
          <span><strong>{customer.accounts?.length ?? 0}</strong> accounts</span>
          <span>Total balance: <strong className="text-green-600">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Accounts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + New Account
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {!customer.accounts?.length ? (
        <p className="text-gray-500 text-sm">No accounts yet. Add one above.</p>
      ) : (
        <div className="space-y-3">
          {customer.accounts.map((a) => (
            <div key={a.account_id || a.id} className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <AccountBadge type={a.account_type} />
                <span className="text-gray-500 text-xs font-mono">{a.account_id || a.id}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${a.balance < 1000 ? 'text-red-500' : a.balance >= 10000 ? 'text-green-600' : 'text-gray-800'}`}>
                  ${a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <button
                  onClick={() => handleDeleteAccount(a.account_id || a.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="New Account" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <select
                value={form.account_type}
                onChange={(e) => setForm({ ...form, account_type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.balance}
                onChange={(e) => setForm({ ...form, balance: e.target.value })}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !form.balance}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                {submitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
