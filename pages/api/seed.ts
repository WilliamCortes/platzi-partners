import type { NextApiRequest, NextApiResponse } from 'next';
import { setup } from 'scripts/setup.mjs';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const message = await setup();

  if (message) {
    res.status(500).json({
      error: { message }
    });
  } else {
    try {
      await res.revalidate(`/`);

      res.status(200).send('ok.');
    } catch (error) {
      console.error('🚀 ~ file: seed.ts:17 ~ handler ~ error:', error);
    }
  }
}

export default handler;
