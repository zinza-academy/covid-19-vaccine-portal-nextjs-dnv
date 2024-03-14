import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
