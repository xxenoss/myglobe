import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  plan: { type: String, default: 'Free' },
  stripeCustomerId: { type: String, default: '' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, plan } = req.body;
  if (!email || !plan) return res.status(400).json({ error: 'Missing email or plan' });

  await dbConnect();

  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Create Stripe customer if not exists
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: customerId,  // Use existing or new customer ID
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: plan === 'Premium' ? 1000 : 2000,
            product_data: {
              name: `${plan} Plan`,
            },
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/account?success=true',
      cancel_url: 'http://localhost:3000/plans?cancel=true',
      metadata: { plan },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
