'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const phoneRegex = /^\+380\d{9}$/;

const RegisterFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string(),
  phone: z.string().regex(phoneRegex, 'Uncorrected phone number!'),
  image: z.any(),
  email: z.string().email(),
  password: z.string().min(6),
});

const RegisterUser = RegisterFormSchema.omit({ id: true, image: true });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registration(
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = RegisterUser.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    password: formData.get('password'),
    avatar: formData.get('avatar'),
  });

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to create new user.';
  }

  const userData = validatedFields.data;

  const response = await fetch(`${URL}/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...userData,
      image: userData.avatar,
      password: await bcrypt.hash(userData.password, 10),
    }),
  });

  if (!response.ok) {
    return 'Check your email or password.';
  }

  redirect('/login');
}
