'use client'
// src/components/RegisterForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {registerUser,registerWithGoogle} from "@/services/auth/api.js"
import { GoogleSignUpResponse } from '@/types';

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type FormSchemaType = z.infer<typeof formSchema>;

function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword,setShowPassword]=useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      router.push('/auth/login'); // Redirect to login after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleRegister = async (credential: string) => {
    try {
      const response = await registerWithGoogle(credential);
      const responseData = response.data as GoogleSignUpResponse;
      localStorage.setItem('token', responseData.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google Registration failed');
    }
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-88 place-self-center">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <Label htmlFor="username" className="mb-2">Username</Label>
        <Input
          type="text"
          id="username"
          {...register('username')}
          className={errors.username ? 'border-red-500' : ''}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password" className="mb-2">Password</Label>
        <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          {...register('password')}
          className={errors.password ? 'border-red-500 pr-8' : 'pr-8'} // Adjust padding
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500" // Position inside input
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#383838"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-closed-icon lucide-eye-closed"
            >
              <path d="m15 18-.722-3.25" />
              <path d="M2 8a10.645 10.645 0 0 0 20 0" />
              <path d="m20 15-1.726-2.05" />
              <path d="m4 15 1.726-2.05" />
              <path d="m9 18 .722-3.25" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#383838"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-icon lucide-eye"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword" className="mb-2">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'border-red-500' : ''}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="space-x-2 space-y-2 md:space-y-0">
      <Button type="submit" className="w-full md:w-fit">Register</Button>
      <Link href="/">
      <Button variant={'outline'} className="w-full md:w-fit">Cancel</Button>
      </Link>
      </div>
      <div className="flex items-center my-6">
  <div className="flex-grow border-t border-gray-300"></div>
  <span className="mx-4 text-gray-500">OR</span>
  <div className="flex-grow border-t border-gray-300"></div>
</div>
      <div>
        <Button onClick={()=>handleGoogleRegister("googleCredential")} variant={'outline'} className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
          SignUp with Google</Button>
      </div>
    </form>
  );
}

export default SignUpForm;