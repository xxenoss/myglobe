import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { apiFetch } from '../lib/api';

export default function PlansPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email) setEmail(payload.email);
      } catch (e) {
        console.error('Invalid JWT format:', e);
      }
    }
  }, []);

  async function handleSubscribe(plan: string) {
    if (!email) {
      alert('Please sign in first');
      return;
    }

    try {
      const data = await apiFetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      });

      if (data.sessionId) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err: any) {
      alert(err.message || 'Checkout failed');
    }
  }

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Subscription Plan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="p-6 bg-white rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
          <p className="mb-4">Basic access to travel features</p>
          <button className="bg-gray-300 text-black px-4 py-2 rounded" disabled>
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="p-6 bg-white rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
          <p className="mb-4">$10/month – Unlock advanced tools</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleSubscribe('Premium')}
          >
            Subscribe
          </button>
        </div>

        {/* Pro Plan */}
        <div className="p-6 bg-white rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
          <p className="mb-4">$20/month – Everything included</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleSubscribe('Pro')}
          >
            Subscribe
          </button>
        </div>
      </div>
    </main>
  );
}
