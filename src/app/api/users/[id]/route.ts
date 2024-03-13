import { NextApiRequest, NextApiResponse } from 'next';

export function GET(req: NextApiRequest, res: NextApiResponse) {
  return Response.json(
    {
      message: 'Get user profile success!',
      userInfo: {
        email: 'nguyen@gmail.com'
      }
    },
    { status: 200 }
  );
}
