import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import { signToken } from '../../../lib/auth';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  verified: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = signToken({ id: user._id, role: user.role, email: user.email });
  // Simulate email sending: in real app you'd use nodemailer
  const resetUrl = `https://yourdomain.com/reset-password?token=${token}`;
  res.status(200).json({ message: 'Reset link generated', resetUrl });
}