import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="ml-44 text-black grid items-center">
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl mb-6">Đăng nhập vào tài khoản</h1>
        <LoginForm />
        <Link href={'/auth/register'} className="block mt-10">
          <Button
            variant="outlined"
            size="large"
            color="success"
            sx={{ width: '100%' }}>
            Đăng ký
          </Button>
        </Link>
      </div>
    </div>
  );
}
