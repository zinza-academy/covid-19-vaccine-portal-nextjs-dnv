import RequireLogin from '@/components/common/authRequire/RequireLogin';
import React, { FC, PropsWithChildren } from 'react';

const PortalLayout: FC<PropsWithChildren> = ({
  children
}: PropsWithChildren) => {
  return <RequireLogin>{children}</RequireLogin>;
};

export default PortalLayout;
