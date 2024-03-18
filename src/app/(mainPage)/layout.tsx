import RootLayout from '@/components/layout/RootLayout';
import { PropsWithChildren } from 'react';

export default function MainPageLayout({ children }: PropsWithChildren) {
  return <RootLayout>{children}</RootLayout>;
}
