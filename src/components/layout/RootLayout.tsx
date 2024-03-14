import Header from '@/components/layout/Header';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="min-h-screen">{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
