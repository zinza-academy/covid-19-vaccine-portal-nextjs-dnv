import RequireAdmin from '@/components/common/authRequire/RequireAdmin';
import RequireLogin from '@/components/common/authRequire/RequireLogin';
import { PropsWithChildren } from 'react';

export default function AdminPageLayout({ children }: PropsWithChildren) {
  return (
    <RequireLogin>
      <RequireAdmin>
        <h2>Admin Portal navigation</h2>
        {children}
      </RequireAdmin>
    </RequireLogin>
  );
}
