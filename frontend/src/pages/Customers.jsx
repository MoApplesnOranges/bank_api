import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/api";
import Modal from "../components/Modal";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getCustomers()
      .then((res) => setCustomers(res.data))
      .catch(() => setError("Failed to load customers."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSubmitting(true);
    try {
      await createCustomer({ name: newName.trim(), accounts: [] });
      setNewName("");
      setShowModal(false);
      load();
    } catch {
      setError("Failed to create customer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setSubmitting(true);
    try {
      await updateCustomer(selectedCustomer.customer_id, {
        name: editName.trim(),
        accounts: selectedCustomer.accounts || [],
      });
      setEditName("");
      setShowModal(false);
      load();
    } catch {
      setError("Failed to update customer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer and all their accounts?")) return;
    try {
      await deleteCustomer(id);
      load();
    } catch {
      setError("Failed to delete customer.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + New Customer
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : customers.length === 0 ? (
        <p className="text-gray-500">
          No customers found. Create one to get started.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c) => (
            <div
              key={c.customer_id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {c.name}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">
                    {c.customer_id}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(c.customer_id)}
                  className="text-red-400 hover:text-red-600 text-sm ml-2 mt-0.5"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {c.accounts?.length ?? 0} account
                {c.accounts?.length !== 1 ? "s" : ""}
              </p>
              <Link
                to={`/customers/${c.customer_id}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="New Customer" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !newName.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showModal && (
        <Modal title="Update Customer" onClose={() => setShowModal(false)}>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={newName}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !newName.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
