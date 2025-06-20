import { buffer } from 'micro';
import Stripe from 'stripe';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const UserSchema = new mongoose.Schema({
  email: String,
  plan: String,
  // other fields...
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const plan = session.metadata?.plan;

    if (email && plan) {
      await dbConnect();
      const user = await User.findOne({ email });
      if (user) {
        user.plan = plan;
        await user.save();
        console.log(`Updated plan to ${plan} for ${email}`);
      } else {
        console.warn(`User not found: ${email}`);
      }
    }
  }

  res.status(200).json({ received: true });
}
