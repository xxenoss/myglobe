import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res, {
    origin: '*',
    methods: ['GET', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });

  res.status(200).json({ message: 'Hello from backend!' });
}

