import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { cookies } from 'next/headers';

export default function RequireLogin({ children }: PropsWithChildren) {
  const accessToken = cookies().get('access_token');

  if (!accessToken?.value) {
    // console.log('Vui lòng đăng nhập');
    redirect('/auth/login');
  }

  return <>{children}</>;
}
