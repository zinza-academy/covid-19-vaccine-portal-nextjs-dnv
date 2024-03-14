import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="md:mx-40 mx-20 text-black grid items-center flex-1 pt-16">
      <div className="flex flex-col w-full pb-16">
        <h1 className="font-bold text-3xl mb-6 text-center">
          Đăng ký tài khoản
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
