'use client';

import { Apiresponse } from "@/types/ApiResponse"
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts'
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
// import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schema/singupSchema';
import { title } from "process";

export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [usermessage, setusermessage] = useState('')
    const [ischekingUsername, setIsChekingUsername] = useState(false)
    const [isSummitbutton, setIsSummitbutton] = useState(false)
    const debounced = useDebounceCallback(setUsername, 300);

    const route = useRouter()

    // const { toast } = useToast()
    // zod implements.
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
    })

    useEffect(() => {
        const checkUsernameunique = async () => {
            if (username) {
                setIsChekingUsername(true)
                setusermessage('')
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)
    
                    setusermessage(response.data.message);
    
    
                } catch (error) {
                    const axiosError = error as AxiosError<Apiresponse>;
                    setusermessage(
                        axiosError.response?.data.message ?? 'Error checking username'
                    );
                }
                finally {
                    setIsChekingUsername(false)
                }
            };
            }
        checkUsernameunique()
    }, [
        username
    ])

    const onSummit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSummitbutton(true);
        try {
            const response = await axios.post("/api/sing-up", data)

            console.log("Signup success", response)

            // toast(
            //     {
            //         title: "success",
            //         description: response.data.message
            //     }
            // )

            route.replace(`/verifycode/${username}`)
            // route.push("/")
        } catch (error) {
            console.error('Error during sign-up:', error);

            const axiosError = error as AxiosError<Apiresponse>;
            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with your sign-up. Please try again.');

            // toast({
            //     title: 'Sign Up Failed',
            //     description: errorMessage,
            //     variant: 'destructive',
            // });

            setIsSummitbutton(false)
        }
    }

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSummit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {ischekingUsername && <Loader2 className="animate-spin" />}
                  {!ischekingUsername && usermessage && (
                    <p
                      className={`text-sm ${
                        usermessage === 'User name is unique.'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usermessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" />
                  <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSummitbutton}>
              {isSummitbutton ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

}