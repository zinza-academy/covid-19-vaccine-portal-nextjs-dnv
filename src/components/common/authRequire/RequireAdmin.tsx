import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function RequireAdmin({ children }: PropsWithChildren) {
  // demo data
  const user = {
    email: 'nguyen@gmail.com',
    isAdmin: true
  };

  if (!user.isAdmin) {
    console.log('Chỉ admin mới có quyền truy cập vào trang này!');
    redirect('/');
  }

  return <>{children}</>;
}
