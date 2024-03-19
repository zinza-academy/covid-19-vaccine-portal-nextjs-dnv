import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export function GET(req: NextApiRequest, res: NextApiResponse) {
  const fakeToken = 'fake-token';
  // Lưu token vào cookie"
  cookies().set('access_token', fakeToken);

  return Response.json({ message: 'Login success!' }, { status: 200 });
}
