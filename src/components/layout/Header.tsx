'use client';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/app/lib/hooks';
import Navigation from '@/components/layout/Navigation';

export default function Header() {
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);

  return (
    <header className="py-3 px-8 bg-gradient-to-r from-red-500 to-blue-500 flex items-center text-white">
      {/* left side */}
      <div className="flex gap-4 items-center">
        <div className="relative w-10 h-10">
          <Image src={'/images/logo.png'} alt="logo" fill />
        </div>
        <h2 className="text-xl font-normal">
          CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
        </h2>
      </div>
      {/* right side */}
      <div className="ml-auto flex items-center">
        <Navigation />
        {isLoggedIn ? (
          <span className="ml-6">{userInfo.email}</span>
        ) : (
          <Button
            size="large"
            href="/auth/login"
            sx={{
              color: '#303F9F',
              fontWeight: '600',
              backgroundColor: '#fff',
              marginLeft: '24px',
              borderRadius: '8px 8px 8px 0px',
              '&:hover': {
                backgroundColor: 'gray',
                color: '#fff'
              }
            }}>
            ĐĂNG NHẬP
          </Button>
        )}
      </div>
    </header>
  );
}
