import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

type User = {
  email: string;
  role: string;
  plan: string;
  stripeCustomerId?: string;
};

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const planBenefits: Record<string, string[]> = {
    Free: ['Access to basic travel features', 'Community support'],
    Premium: ['Everything in Free', 'Real-time sync', 'Priority support', 'Exclusive deals'],
    Pro: ['Everything in Premium', 'Personal travel assistant', 'Early access to features', 'Premium support'],
  };

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your account.');
          setUser(null);
          setLoading(false);
          return;
        }
        const data = await apiFetch('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setNewEmail(data.email);
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSaveEmail = async () => {
    if (!newEmail) return alert('Email cannot be empty');
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Not authenticated');
      const res = await apiFetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: newEmail }),
      });
      setUser((prev) => (prev ? { ...prev, email: res.email } : prev));
      setEditingEmail(false);
      alert('Email updated successfully');
    } catch (err: any) {
      alert(err.message || 'Error updating email');
    }
  };

  const handleOpenCustomerPortal = async () => {
    if (!user?.stripeCustomerId) {
      alert('No Stripe customer ID found.');
      return;
    }
    setPortalLoading(true);
    try {
      const res = await apiFetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: user.stripeCustomerId }),
      });
      if (res.url) window.location.href = res.url;
      else throw new Error('Failed to get portal URL');
    } catch (err: any) {
      alert(err.message || 'Failed to open customer portal');
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading your account...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!user) return null;

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8 bg-white rounded shadow mt-10">
      {/* Profile Section */}
      <section className="flex items-center space-x-6 mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white uppercase">
          {user.email.charAt(0)}
        </div>
        <div className="flex-1">
          {!editingEmail ? (
            <>
              <h1 className="text-3xl font-bold">{user.email}</h1>
              <button
                className="text-blue-600 hover:underline mt-1"
                onClick={() => setEditingEmail(true)}
              >
                Edit Email
              </button>
            </>
          ) : (
            <div className="flex space-x-2 mt-1">
              <input
                type="email"
                className="border rounded px-3 py-1 flex-grow"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button
                className="bg-green-600 text-white rounded px-4 py-1"
                onClick={handleSaveEmail}
              >
                Save
              </button>
              <button
                className="text-red-600 px-2"
                onClick={() => {
                  setNewEmail(user.email);
                  setEditingEmail(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}

          <p className="text-gray-600 mt-2">Role: {user.role}</p>
          <p className="text-blue-600 font-semibold mt-1">Plan: {user.plan}</p>
        </div>
      </section>

      {/* Subscription Benefits Section */}
      <section className="mb-10">
        <button
          className="text-lg font-semibold mb-4 flex items-center gap-2"
          onClick={() => setBenefitsOpen(!benefitsOpen)}
          aria-expanded={benefitsOpen}
        >
          Your Subscription Benefits
          <span>{benefitsOpen ? '▲' : '▼'}</span>
        </button>
        {benefitsOpen && (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(planBenefits[user.plan] || []).map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Payment Management Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Payment Management</h2>
        <button
          disabled={portalLoading}
          onClick={handleOpenCustomerPortal}
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {portalLoading ? 'Loading...' : 'Manage Payment & Subscription'}
        </button>
      </section>

      {/* Logout Button */}
      <section>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
