import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'nextjs-cors';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String,
  role: { type: String, default: 'user' },
  plan: { type: String, default: 'Free' }
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

  try {
    const { email, password } = req.body;

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    return res.status(200).json({ token });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
