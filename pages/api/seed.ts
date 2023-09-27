import type { NextApiRequest, NextApiResponse } from 'next';
// import { setup } from 'scripts/setup.mjs';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.send('Disabled');
  // const message = await setup();

  // if (message) {
  //   res.status(200).json({
  //     length: { message }
  //   });
  // } else {
  //   try {
  //     await res.revalidate(`/`);

  //     res.status(200).send('ok.');
  //   } catch (error) {
  //     res.status(200).send('catch ok.');
  //   }
  // }
}

export default handler;
