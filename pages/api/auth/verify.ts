import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import { verifyToken } from '../../../lib/auth';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  verified: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  if (!token || typeof token !== 'string') return res.status(400).json({ message: 'Token required' });

  await dbConnect();
  try {
    const decoded: any = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.verified = true;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}