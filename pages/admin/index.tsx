import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export default function AdminDashboard() {
  const user = useAuth('admin');
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com', role: 'user', plan: 'Free' },
    { id: 2, email: 'user2@example.com', role: 'user', plan: 'Premium' },
    { id: 3, email: 'admin@example.com', role: 'admin', plan: 'Manual' },
  ]);

  const togglePlan = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, plan: user.plan === 'Premium' ? 'Free' : 'Premium' } : user
    ));
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center border-t">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.plan}</td>
              <td className="p-2">
                {user.role !== 'admin' && (
                  <button onClick={() => togglePlan(user.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Toggle Plan
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}