import { Metadata } from 'next';
import LoginForm from '@/app/ui/auth/LoginForm';
import RegisterForm from '@/app/ui/auth/RegisterForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Account',
};

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">Register Page</div>
        </div>
        <RegisterForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Go to login
          </Link>
        </p>
      </div>
    </main>
  );
}
