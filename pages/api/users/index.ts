import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import { verifyToken } from '../../../lib/auth';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  verified: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded: any = verifyToken(token || '');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    if (req.method === 'GET') {
      const users = await User.find({}, 'email role verified');
      return res.status(200).json(users);
    }

    if (req.method === 'PATCH') {
      const { id, role } = req.body;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.role = role;
      await user.save();
      return res.status(200).json({ message: 'User role updated' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: 'User deleted' });
    }

    return res.status(405).end();
  } catch (err: any) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
}