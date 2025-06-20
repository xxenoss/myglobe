import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'nextjs-cors';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import { verifyToken } from '../../../lib/auth';

const UserSchema = new mongoose.Schema({
  email: String,
  role: String,
  plan: String,
  stripeCustomerId: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res, {
    origin: [
      'https://my-globe.online',
      'https://myglobe.vercel.app',
      'https://myglobe-git-main-xxenoss47-5347s-projects.vercel.app',
      'https://myglobe-nnjvn9knr-xxenoss47-5347s-projects.vercel.app',
    ],
    methods: ['POST', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });

  if (req.method !== 'POST') return res.status(405).end();

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = auth.split(' ')[1];

  try {
    await dbConnect();
    const decoded: any = verifyToken(token);

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.email = email;
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', email: user.email });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
