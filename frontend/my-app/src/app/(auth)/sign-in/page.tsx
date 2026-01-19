'use client';

import { Apiresponse } from "@/types/ApiResponse";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInSchema } from "@/schema/singinSchema";
// 1. Auth Context ko import karein
import { useAuth } from "@/context/AuthProvider";

const LoginPage = () => {
  const router = useRouter();
  
  // 2. Auth Context se login function nikaalein
  const { login } = useAuth();

  const [userMessages, setUserMessages] = useState("");
  const [isSumbitbutton, setIsSumbitbutton] = useState(false);

  // Zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const isSumbit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSumbitbutton(true);
      setUserMessages(""); // Error clear karein pehle

      // Aapka backend route
      const res = await axios.post<Apiresponse>("/api/sing-in", data);

      if (res.data.success) {
        // 3. Navbar ko batayein ki login ho chuka hai
        login(); 

        // 4. User ko home par bhejein
        router.push("/");
        router.refresh(); 
      }

    } catch (error: any) {
      console.log(error.message);
      // Agar error hai toh message show karein
      setUserMessages(error.response?.data?.message || "Invalid email or password.");
      setIsSumbitbutton(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-900">
            Join True Feedback
          </h1>
          <p className="mb-4 text-gray-600">Sign in to start your anonymous adventure</p>
          
          {userMessages && (
            <div className={`p-3 rounded-md mb-4 text-sm font-medium ${
              userMessages.includes("successful") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
            }`}>
              {userMessages}
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(isSumbit)} className="space-y-6 text-gray-900">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    className="text-black"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <Input 
                    type="password" 
                    placeholder="Enter your password"
                    className="text-black"
                    {...field} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className='w-full' disabled={isSumbitbutton}>
              {isSumbitbutton ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4 text-gray-600">
          <p>
            Not a member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;