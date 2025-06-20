import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res, {
    origin: [
      'https://my-globe.online',
      'https://myglobe.vercel.app',
      'https://myglobe-git-main-xxenoss47-5347s-projects.vercel.app',
      'https://myglobe-nnjvn9knr-xxenoss47-5347s-projects.vercel.app',
    ],
    methods: ['GET', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });

  res.status(200).json({ message: 'Hello from backend!' });
}
