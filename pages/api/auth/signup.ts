import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'nextjs-cors';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  plan: { type: String, default: 'Free' },
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

    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = signToken({ id: user._id, role: user.role, email: user.email });

    res.status(201).json({ token });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
