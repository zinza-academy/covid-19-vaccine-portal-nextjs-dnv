import Image from 'next/image';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-stretch">
      <div className="basis-1/2 relative">
        <Image
          src={'/images/auth-bg.png'}
          alt="auth background"
          className="max-h-screen max-w-full"
          fill
        />
      </div>
      {children}
    </div>
  );
}
