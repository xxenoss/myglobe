import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res, {
    origin: 'https://myglobe-6g3hcv0xz-xxenoss47-5347s-projects.vercel.app', // your frontend domain here
    methods: ['GET', 'POST', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });

  res.status(200).json({ message: 'Hello from backend!' });
}
