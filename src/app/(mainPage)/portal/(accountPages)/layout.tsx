import { PropsWithChildren } from 'react';

export default function AccountPagesLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h2>PortalNavigation</h2>
      {children}
    </>
  );
}
